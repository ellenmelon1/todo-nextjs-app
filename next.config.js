/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    // remote patterns currently doesn't work with s3. e.g. 
    domains: [
      'cdkstack-todolist2useruploadsbucket76b21478-2uva9n483eb.s3.eu-west-2.amazonaws.com',
    ],
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
}

module.exports = nextConfig