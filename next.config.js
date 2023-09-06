/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d3mww1g1pfq2pt.cloudfront.net",
        port: "",
        pathname: "",
      },
    ],
  },
};

module.exports = nextConfig;
