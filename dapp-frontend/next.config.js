/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  env: {
    NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
  },
  images: {
    domains: ["blogmaker.s3.amazonaws.com", "dapps-blogs.s3.amazonaws.com"],
  },
};

module.exports = nextConfig;
