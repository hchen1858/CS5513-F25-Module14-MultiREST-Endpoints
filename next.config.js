/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dev-cs-5513-fall-2025-w12.pantheonsite.io',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;

