// build-sw.mjs
import { generateSW } from 'workbox-build';

generateSW({
	globDirectory: 'dist/',
	globPatterns: ['**/*.{css,woff2,png,svg,jpg,js}'],
	swDest: 'dist/sw.js',
  runtimeCaching: [{
    // Routing via a matchCallback function:
    urlPattern: ({request, url}) => ...,
    handler: 'CacheFirst',
    options: {
      cacheName: '...',
      expiration: {
        maxEntries: ...,
      },
    },
  }, ],
});
