const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin('./src/i18n.js');
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: process.env.WP_IMAGES_URL,
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: process.env.WP_IMAGES_URL,
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'maps.googleapis.com',
        port: '',
        pathname: '/**'
      }
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  },
  experimental: {
    // Vous pouvez décommenter ces lignes si nécessaire
    // esmExternals: 'loose',
    // optimizeCss: true,
  },
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
        },
      };
    }
    config.performance = {
      ...config.performance,
      maxAssetSize: 1000000,
    };
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
   async redirects() {
    return [
      // Forcer HTTPS et www
      {
        source: '/:path*',
        has: [
          { type: 'host', value: 'revel-tes-talents.com' } // sans www
        ],
        permanent: true,
        destination: 'https://www.revel-tes-talents.com/:path*',
      },
      // Forcer HTTPS si jamais www n'est pas géré ailleurs (sécurité)
      {
        source: '/:path*',
        has: [
          { type: 'host', value: 'www.revel-tes-talents.com' },
          { type: 'protocol', value: 'http' },
        ],
        permanent: true,
        destination: 'https://www.revel-tes-talents.com/:path*',
      },
    ];
  },
};
// Appliquez withNextIntl à la configuration complète
module.exports = withNextIntl(nextConfig);