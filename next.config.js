const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const generateCsp = () => {
  const production = process.env.NODE_ENV === 'production';

  let csp = ``;
  csp += `default-src 'self';`;
  csp += `base-uri 'self';`;
  csp += `object-src 'none';`;
  csp += `style-src 'self' 'unsafe-inline';`; // NextJS requires 'unsafe-inline'
  csp += `script-src 'self' ${
    production ? '' : "'unsafe-eval'"
  } 'unsafe-inline';`; // NextJS requires 'self' and 'unsafe-eval' in dev (faster source maps)
  csp += `font-src 'self';`;
  csp += `media-src *;`;
  csp += `img-src * blob: data:;`;
  csp += `frame-src www.youtube.com www.google.com/recaptcha/ www.youtube-nocookie.com;`;
  csp += `connect-src *;`;

  return csp;
};

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: 'Content-Security-Policy',
    value: generateCsp().replace(/\n/g, ''),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
];

/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/
module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  eslint: {
    dirs: [
      'pages',
      'components',
      'helpers',
      'styles',
      'hooks',
      'contexts',
      'features',
      'server',
    ],
  },

  poweredByHeader: false,

  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },

  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },

  webpack: (config, { dev, isServer }) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|ico|webm|pdf|svg|gif|mp4)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'images/[hash][ext][query]',
      },
    });

    return config;
  },
});
