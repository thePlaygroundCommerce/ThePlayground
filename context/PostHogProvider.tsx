'use client'


import { usePathname, useSearchParams } from "next/navigation"
import { PostHog, usePostHog } from 'posthog-js/react'
import posthog, { PostHogConfig } from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { Suspense, useEffect } from 'react'
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
    if (typeof window !== 'undefined') {
      const isProduction = process.env.NODE_ENV !== 'production';
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY ?? "", {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        capture_pageview: false,
        autocapture: isProduction,
        loaded: (ph) => {
          if (isProduction) {
            ph.opt_out_capturing(); // opts a user out of event capture
            ph.set_config({ disable_session_recording: true });
          }
        },
        person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
      })
    }

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
  const posthog = usePostHog()

  // Track pageviews
  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname
      if (searchParams.toString()) {
        url = url + `?${searchParams.toString()}`
      }

      posthog.capture('$pageview', { '$current_url': url })
    }
  }, [pathname, searchParams, posthog])

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