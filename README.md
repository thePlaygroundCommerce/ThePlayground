# The Playground — Next.js Storefront

## What this project is

This is a Next.js storefront built on the App Router with a Square-powered cart/checkout and Prismic CMS content.

Key integrations:
- `Square` for catalog, cart/order, checkout, and payments
- `Prismic` for content and previews
- `PostHog`, `Google Analytics`, and `Facebook Pixel` for tracking
- `Slice Machine` for Prismic custom types and slices

This repo runs on port `3005` in development.

---

## Quick start

```bash
yarn install
yarn dev
```

Open `http://localhost:3005`.

For production build:

```bash
yarn build
yarn start
```

To launch Slice Machine UI:

```bash
yarn slicemachine
```

---

## Important files and folders

### App Router
- `src/app/layout.tsx` — global layout and providers
- `src/app/(site)` — storefront pages, info pages, account/login, shop, cart
- `src/app/checkout` — checkout experience pages
- `src/app/api/import-markdown/route.ts` — markdown import route that creates Prismic documents

### API service layer
- `src/api/clients/square.ts` — Square SDK client
- `src/api/clients/prismicio.ts` — Prismic client setup
- `src/api/cartApi.ts` — cart create/update/get/calculate with Square
- `src/api/checkoutApi.ts` — checkout/payment link creation
- `src/api/paymentsApi.ts` — order/payment handling
- `src/api/catalogApi.ts` — Square catalog helpers
- `src/api/customerApi.ts` — Square customer-related helpers

### State and providers
- `src/components/Providers.tsx` — app wrapper that loads cart/inventory/checkout providers
- `src/context/cartContext.tsx` — core cart state, cart mutators, and hooks
- `src/context/checkoutContext.tsx` — checkout navigation helpers
- `src/context/TagManager.tsx` — tag tracking support

### Content definition
- `customtypes/` — Prismic custom type definitions
- `slicemachine.config.json` — Prismic repository config and routes

---

## What to read first

1. `src/app/layout.tsx` — shows global analytics, provider setup, and Prismic preview integration
2. `src/components/Providers.tsx` — explains how cart and inventory state is initialized and passed to the app
3. `src/context/cartContext.tsx` — the main cart business logic for Square orders
4. `src/api/clients/square.ts` and `src/api/cartApi.ts` — Square integration pattern
5. `src/app/api/import-markdown/route.ts` — import flow for converting markdown to Prismic documents

---

## Environment variables

This project depends on environment values for Prismic and Square. Expect variables like:
- `SQUARE_ACCESS_TOKEN`
- `SQUARE_MAIN_LOCATION_ID`
- `NEXT_PUBLIC_SQUARE_APPLICATION_ID`
- `NEXT_PUBLIC_SQUARE_LOCATION_ID`
- `PRISMIC_ACCESS_TOKEN`
- `PRISMIC_WRITE_TOKEN`
- `NEXT_PUBLIC_POSTHOG_KEY`
- `NEXT_PUBLIC_POSTHOG_HOST`
- `NEXT_PUBLIC_POSTHOG_UI_HOST`
- `CHECKOUT_REDIRECT`

---

## Notes

- The existing README was the default Next.js starter content; this file is the repo-specific onboarding guide.
- The app uses `next` v16 with App Router and static remote image patterns configured in `next.config.ts`.
- Some auth/commented integrations are present but not active, including Clerk and Sentry.
- Use the code and folder structure for orientation rather than relying on old docs.

---

## Helpful commands

- `yarn dev` — run local dev server on port 3005
- `yarn build` — production build
- `yarn start` — start production server
- `yarn lint` — auto-fix lint issues
- `yarn test` — run Jest tests
- `yarn slicemachine` — run Prismic Slice Machine UI
