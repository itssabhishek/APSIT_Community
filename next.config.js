const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/daygrid',
  '@fullcalendar/interaction',
  '@fullcalendar/list',
  '@fullcalendar/react',
  '@fullcalendar/timegrid',
  '@fullcalendar/timeline',
]);

const nextConfig = {
  swcMinify: false,
  trailingSlash: true,
  env: {
    HOST_API_KEY: 'https://apsit-community-15wd.onrender.com',
    AWS_ACCESS_KEY_ID: 'AKIASLOX5QWLI6XWQJCR',
    AWS_SECRET_ACCESS_KEY: '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',
    AWS_REGION: 'ap-south-1',
  },
};

const pwaConfig = {
  dest: 'public',
  register: true,
  skipWaiting: true,
};
const withPWA = require('next-pwa')(pwaConfig);
module.exports = withTM(withPWA(nextConfig));
