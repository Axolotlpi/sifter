// build-sw.mjs
import { generateSW } from 'workbox-build';

generateSW({
	globDirectory: 'dist/',
	globPatterns: ['**/*.{css,woff2,png,svg,jpg,js}'],
  maximumFileSizeToCacheInBytes: 5000000000,
	swDest: 'dist/sw.js',
  runtimeCaching: [{
    // Routing via a matchCallback function:
    urlPattern: ({ url }) => url.origin === self.location.origin && url.pathname.startsWith('/'),
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'MainCache',
      expiration: {
        maxEntries: 100,
      },
    },
  }, ],
});
