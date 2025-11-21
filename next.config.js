/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [
      "@thirdweb-dev/sdk",
      "@ethersproject/providers",
      "ws",
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      encoding: false,
      bufferutil: false,
      "utf-8-validate": false,
    };
    return config;
  },
};

module.exports = nextConfig;
