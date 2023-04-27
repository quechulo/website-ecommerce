/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'static.nike.com',
      },
      {
        protocol: 'https',
        hostname: 'sneakerstudio.pl',
      },
      {
        protocol: 'https',
        hostname: 'img01.ztat.net',
      },
      
    ],
  },
}
