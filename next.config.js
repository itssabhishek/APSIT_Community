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
};

const pwaConfig = {
  dest: 'public',
  register: true,
  skipWaiting: true,
};
const withPWA = require('next-pwa')(pwaConfig);
module.exports = withTM(withPWA(nextConfig));
