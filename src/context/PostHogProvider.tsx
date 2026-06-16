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
  const [prevPath, setPrevPath] = useState("")
  const posthog = usePostHog()
  const initScrollValues = {
    'max scroll percentage': 0,
    'max scroll pixels': 0,
    'last scroll percentage': 0,
    'last scroll pixels': 0,
    'scrolled': false,
  }

  const trackedScrollValues = useRef(initScrollValues)

  // Track pageviews
  useEffect(() => {
    const url = `${pathname}?${searchParams}`
    const trackedValues = trackedScrollValues.current
    const fullUrl = window.origin + url

    if (pathname && posthog) {
      // if (searchParams.toString()) {
      //   url = url + `?${searchParams.toString()}`
      // }

      track("$pageview", { path: pathname, ...trackedValues })
      posthog.capture('$pageview', { $current_url: fullUrl, ...trackedValues, path: pathname })

      // reset trackedValues
      trackedScrollValues.current = initScrollValues
      if (prevPath && (pathname !== prevPath)) {
        track("$pageleave", { path: pathname, ...trackedValues });
        posthog.capture('$pageleave', { $current_url: fullUrl, ...trackedValues, path: pathname })
        setPrevPath(pathname)
      }

      trackedScrollValues.current = initScrollValues
    }


  }, [pathname, searchParams, posthog])


  // track pageleaves
  useEffect(() => {
    const main = document.querySelector<HTMLElement>('main')
    const trackedValues = trackedScrollValues.current

    if (!main) {
      console.warn('PostHogPageView: <main> element not found, scroll tracking disabled')
      return
    }

    function getMainScrollInfo() {
      const scrollTop = main.scrollTop
      const scrollHeight = main.scrollHeight
      const viewHeight = main.clientHeight
      return { scrollTop, scrollHeight, viewHeight }
    }

    function handleScroll() {
      const { scrollTop, scrollHeight, viewHeight } = getMainScrollInfo()
      const lastScrollPixels = viewHeight + scrollTop
      const lastScrollPercentage = scrollHeight > 0 ? Math.min(1, Number((lastScrollPixels / scrollHeight).toPrecision(2))) : 0

      trackedValues['last scroll percentage'] = lastScrollPercentage
      trackedValues['last scroll pixels'] = lastScrollPixels

      if (lastScrollPercentage > trackedValues['max scroll percentage']) {
        trackedValues['max scroll percentage'] = lastScrollPercentage
      }

      if (lastScrollPixels > trackedValues['max scroll pixels']) {
        trackedValues['max scroll pixels'] = lastScrollPixels
      }

      if (!trackedValues.scrolled && scrollTop > 0) trackedValues.scrolled = true

    }

    const handlePageleave = (e: BeforeUnloadEvent) => {
      e.preventDefault();

      track('page_leave', { path: pathname, ...trackedValues })
      console.log('pageleave captured', posthog.capture('$pageleave', trackedValues), trackedValues)
    }

    window.addEventListener('beforeunload', handlePageleave)
    main.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      main.removeEventListener('scroll', handleScroll)
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