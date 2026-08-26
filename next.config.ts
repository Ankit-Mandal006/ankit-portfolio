import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fnwcvrbmzjmjtsikvelk.supabase.co",
        pathname: "/storage/v1/object/public/**", // Optional: restricts optimization strictly to public storage buckets
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.giphy.com",
      },
    ],
  },
};

export default nextConfig;