/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        destination: "https://zaprouter.pro/wp/:path*",
        has: [
          {
            type: "host",
            // key: "x-forwarded-host",
            value: "(?<wp>.+)",
          },
        ],
        permanent: true,
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
