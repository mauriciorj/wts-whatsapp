/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // These rewrites are checked after headers/redirects
      // and before all files including _next/public files which
      // allows overriding page files
      {
        source: "/:path",
        destination: "/api/wp/:path",
        has: [{ type: "host", key: "overrideMe", value: "wp.*" }],
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
