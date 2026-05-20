import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ... existing code ...
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.cdninstagram.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.fbcdn.net",
        pathname: "/**",
      },
    ],
  },
  allowedDevOrigins: ['192.168.0.100']
};

export default nextConfig;
