/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "liveblocks.io",
        port: "",
      },
    ],
  },

  webpack: (config) => {
    // Add a new rule for handling .node files
    config.module.rules.push({
      test: /\.node$/,
      use: "native-addon-loader",
    });

    return config;
  },
};

export default nextConfig;
