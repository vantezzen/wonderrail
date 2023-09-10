const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: "loose",
  },
  images: {
    domains: [
      "images.unsplash.com",
      "source.unsplash.com",
      process.env.NODE_ENV === "development" ? "localhost" : "wonderrail.com",
    ],
  },
};

module.exports = withPWA(nextConfig);
