/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // pokud používáš <img src> místo <Image />
  },
};

module.exports = nextConfig;
