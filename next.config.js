/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    square: {
      development: {
        url: "http://localhost:3000/",
      },
      production: {
        url: "https://square-backend.herokuapp.com/",
      },
    },
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
    ],
  },
};
module.exports = nextConfig;
