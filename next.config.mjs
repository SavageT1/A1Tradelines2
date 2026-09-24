/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // Legacy URLs from the previous site — keep bookmarks and indexed links working
      { source: '/buy-tradelines', destination: '/inventory', permanent: true },
      { source: '/seasoned-tradelines', destination: '/inventory', permanent: true },
      { source: '/tradelines-for-sale', destination: '/inventory', permanent: true },
      { source: '/how-long-do-tradelines-take-to-post', destination: '/tradelines', permanent: true },
      { source: '/how-it-works', destination: '/#how-it-works', permanent: true },
      { source: '/contact', destination: '/#contact', permanent: true },
    ]
  },
}

export default nextConfig
