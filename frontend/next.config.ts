import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    domains: [
      'lh3.googleusercontent.com',  // Icon domain for Google Auth
      'dgalywyr863hv.cloudfront.net'  // Icon domain for Strava
    ],
  },
};

export default nextConfig;
