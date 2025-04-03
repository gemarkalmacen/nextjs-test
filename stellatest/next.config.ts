import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, // Ensure this is set
    serverActions: true, // Enables API routes in App Router
  },
  env: {
    NEXTAUTH_URL: "https://devfe.surigaocity.gov.ph",
  },
};

module.exports = nextConfig;