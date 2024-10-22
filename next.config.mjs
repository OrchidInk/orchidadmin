/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/superadmin/login',
        destination: `${process.env.NEXT_PUBLIC_BASIC_URL}/api/v1/superadmin/login`,
      },
    ];
  },
};

export default nextConfig;
