import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    ppr: "incremental",
    clientSegmentCache: true,
    removeUncaughtErrorAndRejectionListeners: true,
  },
};

export default nextConfig;
