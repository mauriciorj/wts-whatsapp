/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "/api/wp/:path*",
        has: [
          {
            type: "host",
            value: "(?<wp>.+).zaprouter.pro",
          },
        ],
      },
      {
        source: "/:path*",
        destination: "/api/wp/:path*",
        has: [
          {
            type: "host",
            value: "(?<wp>.+).localhost",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
