/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: "loose",
  },
  images: {
    domains: ["images.unsplash.com"],
  },
};

module.exports = nextConfig;
