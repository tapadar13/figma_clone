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
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil",
      canvas: "commonjs canvas",
    });
    // config.infrastructureLogging = { debug: /PackFileCache/ };
    return config;
  },
  // webpack: (config) => {
  //   // Add a new rule for handling .node files
  //   config.module.rules.push({
  //     test: /\.node$/,
  //     use: "native-addon-loader",
  //   });

  //   return config;
  // },
};

export default nextConfig;
