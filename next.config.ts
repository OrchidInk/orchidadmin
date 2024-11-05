import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/superadmin/:path*',
        destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/superadmin/:path*`,
      },
      {
        source: '/admin/:path*',
        destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/:path*`,
      },
      {
        source: '/user/:path*',
        destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/:path*`,
      },
    ];
  },
};

export default nextConfig;
