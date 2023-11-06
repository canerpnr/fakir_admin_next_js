/** @type {import('next').NextConfig} */
const nextConfig = {    reactStrictMode: true,
    output: 'export',
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      config.module.rules.push({
        test: /\.(png|svg|jpe?g|)$/i,
      });
      return config;
  }}

module.exports = nextConfig