module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "square-catalog-sandbox.s3.amazonaws.com",
        port: "",
        pathname: "/files/**",
      },
    ],
  },
  experimental: {
    swcPlugins: [
      [
        "next-superjson-plugin",
        {
          excluded: [],
        },
      ],
    ],
  },
};
