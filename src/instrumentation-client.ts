import posthog from "posthog-js";

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  defaults: "2026-01-30",
  api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  ui_host: process.env.NEXT_PUBLIC_POSTHOG_UI_HOST,
  capture_pageview: false,
  capture_pageleave: false,
  // loaded: (ph) => {
  //   ph.opt_out_capturing(); // opts a user out of event capture
  //   ph.set_config({ disable_session_recording: true });
  // },
  person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
});

window.posthog = posthog

