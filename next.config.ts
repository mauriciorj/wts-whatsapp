/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // These rewrites are checked after headers/redirects
      // and before all files including _next/public files which
      // allows overriding page files
      {
        source: "/sobre",
        destination: "/login",
        // has: [{ type: "host", key: "overrideMe", value: "wp.*" }],
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
