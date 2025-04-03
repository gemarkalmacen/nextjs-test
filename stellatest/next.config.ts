/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: "/api/auth/:path*", // Ensure Next.js handles auth routes
      },
    ];
  },
  env: {
    NEXTAUTH_URL: "https://devfe.surigaocity.gov.ph",
  },
};

export default nextConfig;
