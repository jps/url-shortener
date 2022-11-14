/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    //suppress error coming from next https://github.com/vercel/next.js/discussions/30781
    const nextMiniCssExtractPluginIdx = config.plugins.findIndex(
      (p) => p?.constructor?.name === "NextMiniCssExtractPlugin"
    );
    nextMiniCssExtractPluginIdx > -1 &&
      config.plugins.splice(nextMiniCssExtractPluginIdx, 1);
    return config;
  },
};

module.exports = nextConfig;
