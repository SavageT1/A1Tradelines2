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
      { source: '/tradelines-for-sale', destination: '/inventory', permanent: true },
      { source: '/how-long-do-tradelines-take-to-post', destination: '/tradelines', permanent: true },
      { source: '/how-it-works', destination: '/#how-it-works', permanent: true },
      { source: '/terms-of-service', destination: '/terms', permanent: true },
      { source: '/services', destination: '/tradelines', permanent: true },
      { source: '/are-tradelines-legal', destination: '/how-tradelines-work', permanent: true },
    ]
  },
}

export default nextConfig
