/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fnwcvrbmzjmjtsikvelk.supabase.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.giphy.com",
      },
      {
        protocol: "https",
        hostname: "*.media.giphy.com",
      },
    ],
  },
};

export default nextConfig;