import posthog from 'posthog-js'

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? '/phg',
  ui_host: process.env.NEXT_PUBLIC_POSTHOG_UI_HOST ?? 'https://us.posthog.com',
  defaults: '2026-01-30'
});