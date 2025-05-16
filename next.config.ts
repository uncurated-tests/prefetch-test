import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
    dynamicIO: true,
    clientSegmentCache: true,
    removeUncaughtErrorAndRejectionListeners: true,
  },
};

export default nextConfig;
