// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   async rewrites() {
//     return [
//       {
//         source: "/api/auth/:path*",
//         destination: "/api/auth/:path*", // Ensure Next.js handles auth routes
//       },
//     ];
//   },
//   env: {
//     NEXTAUTH_URL: "https://devfe.surigaocity.gov.ph",
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",  // Match all API routes under /api/auth
        destination: "https://devapi.surigaocity.gov.ph/api/auth/:path*",  // Route them to the API server (e.g., Django)
      },
    ];
  },
  env: {
    NEXTAUTH_URL: "https://devfe.surigaocity.gov.ph",  // This is for the Next.js frontend URL
  },
};

export default nextConfig;
