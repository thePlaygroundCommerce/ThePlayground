'use client'

import { usePathname, useSearchParams } from "next/navigation"
import { PostHog, usePostHog } from 'posthog-js/react'
import posthog, { PostHogConfig } from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { Suspense, useEffect, useRef, useState } from 'react'
import { AppProps } from "index"

type PostHogProviderProps = {
  client: PostHog;
  apiKey?: never;
  options?: never;
} | {
  apiKey: string;
  options?: Partial<PostHogConfig>;
  client?: never;
};

export function PostHogProvider({ children }: AppProps & PostHogProviderProps) {
  useEffect(() => {
    const isProduction = process.env.NODE_ENV === 'production';
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY ?? "", {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      capture_pageview: false,
      autocapture: isProduction,
      loaded: (ph) => {
        if (!isProduction) {
          ph.opt_out_capturing(); // opts a user out of event capture
          ph.set_config({ disable_session_recording: true });
        }
      },
      person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
    })
  }, [])

  return (
    <PHProvider client={posthog}>
      <PostHogPageView />
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

  // Track pageviews
  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname
      if (searchParams.toString()) {
        url = url + `?${searchParams.toString()}`
      }

      console.log('pageview captured', posthog.capture('$pageview', { '$current_url': url }))
    }

    if (pathname !== prevPath) {
      console.log('left_page captured', posthog.capture('left_page', {
        'max scroll percentage': maxPercentage.current,
        'max scroll pixels': maxPixels.current,
        'last scroll percentage': Math.min(1, Number(((window.innerHeight + window.pageYOffset) / document.body.scrollHeight).toPrecision(2))),
        'last scroll pixels': window.innerHeight + window.pageYOffset,
        'scrolled': maxPixels.current > 0,
      }))
      setPrevPath(pathname)
    }

  }, [pathname, searchParams, posthog])

  useEffect(() => {
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

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const handlePageleave = () => {
      console.log('pageleave captured', posthog.capture('$pageleave', {
        'max scroll percentage': maxPercentage.current,
        'max scroll pixels': maxPixels.current,
        'last scroll percentage': Math.min(1, Number(((window.innerHeight + window.pageYOffset) / document.body.scrollHeight).toPrecision(2))),
        'last scroll pixels': window.innerHeight + window.pageYOffset,
        'scrolled': maxPixels.current > 0,
      }))

    }

    window.addEventListener('beforeunload', handlePageleave)

    return () => {
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