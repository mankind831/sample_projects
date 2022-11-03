/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['i.picsum.photos','res.cloudinary.com'],
  },
}

module.exports = nextConfig
