const url = new URL(process.env.NEXT_PUBLIC_CLOUDFRONT);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: url.hostname,
      },
    ],
  },
};

export default nextConfig;