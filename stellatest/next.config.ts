/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_URL: "https://devfe.surigaocity.gov.ph",
  },
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*", // Ensure NextAuth routes stay on Next.js
        destination: "/api/auth/:path*",
      },
      {
        source: "/api/:path*", // Redirect other API requests to Django
        destination: "https://devapi.surigaocity.gov.ph/api/:path*",
      },
    ];
  },
  experimental: {
    serverActions: false, // Remove incorrect boolean value
  },
};

export default nextConfig;
