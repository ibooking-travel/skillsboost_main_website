import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Skip static generation for pages that require database during build
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },
};

export default nextConfig;