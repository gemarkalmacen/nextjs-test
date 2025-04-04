/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/_next/(.*)", // Apply CORS to Next.js assets
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // Change this to your allowed origins if needed
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,POST,PUT,DELETE",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "X-Requested-With, Content-Type, Accept, Authorization",
          },
        ],
      },
    ];
  },
  env: {
    NEXTAUTH_URL: "https://devfe.surigaocity.gov.ph",
  },
};

module.exports = nextConfig;



// module.exports = {
//   allowedDevOrigins: 
//   [
//     "https://devfe.surigaocity.gov.ph",
//     "http://192.168.200.19",
//     "http://192.168.200.19:3003",
//     "http://localhost:3003",
//     'local-origin.dev', 
//     '*.local-origin.dev',
//     '192.168.200.19',
//     '192.168.200.19:3003'
//   ]
// }