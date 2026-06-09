'use client'

import { usePathname, useSearchParams } from "next/navigation"
import { usePostHog } from 'posthog-js/react'
import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { Suspense, useEffect, useRef, useState } from 'react'
import { AppProps } from "index"
import { track } from "@vercel/analytics"

export function PostHogProvider({ children }: AppProps) {
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return null

  return (
    <PHProvider client={posthog}>
      <SuspendedPostHogPageView />
      {children}
    </PHProvider>
  )
}

function PostHogPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [prevPath, setPrevPath] = useState(pathname + searchParams)
  const posthog = usePostHog()

  const maxPercentage = useRef(0)
  const maxPixels = useRef(0)

  const getTrackedValues = (window: Window & typeof globalThis) => {
    return {
      'max scroll percentage': maxPercentage.current,
      'max scroll pixels': maxPixels.current,
      'last scroll percentage': Math.min(1, Number(((window.innerHeight + window.pageYOffset) / document.body.scrollHeight).toPrecision(2))),
      'last scroll pixels': window.innerHeight + window.pageYOffset,
      'scrolled': maxPixels.current > 0,
    }
  }

  // Track pageviews
  useEffect(() => {
    const url = pathname + searchParams
    const trackedValues = getTrackedValues(window)
    console.log(posthog)

    if (pathname && posthog) {
      let url = window.origin + pathname
      if (searchParams.toString()) {
        url = url + `?${searchParams.toString()}`
      }

      console.log('pageview captured', posthog.capture('$pageview', { '$current_url': url }))
    }

    if (url !== prevPath) {
      track("left_page", { path: pathname, ...trackedValues });
      console.log('left_page captured', posthog.capture('left_page', trackedValues))
      setPrevPath(pathname)
    }

  }, [pathname, searchParams, posthog])

  useEffect(() => {
    const trackedValues = getTrackedValues(window)
    function handleScroll() {
      const lastPercentage = Math.min(1, Number(((window.innerHeight + window.pageYOffset) / document.body.scrollHeight).toPrecision(2)))
      const lastPixels = window.innerHeight + window.pageYOffset

      if (lastPercentage > maxPercentage.current) {
        maxPercentage.current = lastPercentage
      }

      if (lastPixels > maxPixels.current) {
        maxPixels.current = lastPixels
      }
    }

    const handlePageleave = () => {
      track("page_leave", { path: pathname, ...trackedValues });
      console.log('pageleave captured', posthog.capture('$pageleave', trackedValues))

    }

    window.addEventListener('beforeunload', handlePageleave)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('beforeunload', handlePageleave)
    }
  }, [])

  return null
}

// Wrap this in Suspense to avoid the `useSearchParams` usage above
// from de-opting the whole app into client-side rendering
// See: https://nextjs.org/docs/messages/deopted-into-client-rendering
export default function SuspendedPostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageView />
    </Suspense>
  )
}