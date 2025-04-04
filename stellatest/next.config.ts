/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["https://devfe.surigaocity.gov.ph", "http://192.168.200.19", "http://192.168.200.19:3003", "http://localhost:3003"],
  env: {
    NEXTAUTH_URL: "https://devfe.surigaocity.gov.ph",
  },
};

export default nextConfig;