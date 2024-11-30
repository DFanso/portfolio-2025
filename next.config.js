/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self' data: https://assets.codepen.io https://raw.githubusercontent.com",
              "connect-src 'self' https://ipapi.co",
              "frame-src 'self'",
              "media-src 'self'",
            ].join('; ')
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
