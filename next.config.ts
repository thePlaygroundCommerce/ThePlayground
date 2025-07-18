/** @type {import('next').NextConfig} */
const nextConfig = {
  staticPageGenerationTimeout: 300,
  eslint: {
    // ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "square-catalog-sandbox.s3.amazonaws.com",
        port: "",
        pathname: "/files/**",
      },
      {
        protocol: "https",
        hostname: "items-images-production.s3.us-west-2.amazonaws.com",
        port: "",
        pathname: "/files/**",
      },
      {
        protocol: "https",
        hostname: "items-images-sandbox.s3.us-west-2.amazonaws.com",
        port: "",
        pathname: "/files/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.prismic.io",
        port: "",
        pathname: "/theplaygroundmedia/**",
      },
      {
        protocol: "https",
        hostname: "theplaygroundmedia.cdn.prismic.io",
        port: "",
        pathname: "/theplaygroundmedia/**",
      },
    ],
  },
  // redirects: () => [
  //   {
  //     source: "/",
  //     destination: "/shop",
  //     permanent: false
  //   },
  // ],
};

// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs");

// module.exports = withSentryConfig(
module.exports = nextConfig
  // {
  //   // For all available options, see:
  //   // https://github.com/getsentry/sentry-webpack-plugin#options

  //   // Suppresses source map uploading logs during build
  //   silent: true,
  //   authToken: process.env.SENTRY_AUTH_TOKEN,

  //   org: "theplayground-8110ffc7f",
  //   project: "javascript-nextjs",
  // }
  // {
  //   // For all available options, see:
  //   // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  //   // Upload a larger set of source maps for prettier stack traces (increases build time)
  //   widenClientFileUpload: true,

  //   // Transpiles SDK to be compatible with IE11 (increases bundle size)
  //   transpileClientSDK: true,

  //   // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
  //   tunnelRoute: "/monitoring",

  //   // Hides source maps from generated client bundles
  //   hideSourceMaps: true,

  //   // Automatically tree-shake Sentry logger statements to reduce bundle size
  //   disableLogger: true,
  // }

