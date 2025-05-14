import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    ppr: "incremental",
    dynamicIO: true,
    clientSegmentCache: true,
    removeUncaughtErrorAndRejectionListeners: true,
  },
};

export default nextConfig;
