/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: process.env.IMAGES_HOSTNAME,
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
