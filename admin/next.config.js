/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cocktailclub.com", "localhost", "res.cloudinary.com"],
  },
};

module.exports = nextConfig;
