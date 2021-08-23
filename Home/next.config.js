const { BLOG_URL, TESTS_URL } = process.env;

module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/index.html',
      },
      // Blog
      {
        source: '/blog',
        destination: `${BLOG_URL}/blog`,
      },
      {
        source: '/blog/:path*',
        destination: `${BLOG_URL}/blog/:path*`,
      },
      // Tests
      {
        source: '/tests',
        destination: `${TESTS_URL}/tests`,
      },
      {
        source: '/tests/:path*',
        destination: `${TESTS_URL}/tests/:path*`,
      },
    ]
  },
}
