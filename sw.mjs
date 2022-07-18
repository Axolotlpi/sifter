// build-sw.mjs
import { generateSW } from 'workbox-build';
// import Strategy from 'workbox-strategies';

// const cacheThenNetwork = new CacheThenNetwork();

generateSW({
	globDirectory: 'dist/',
	globPatterns: ['**/*.{css,woff2,png,svg,jpg,js}'],
  maximumFileSizeToCacheInBytes: 5000000000,
	swDest: 'dist/sw.js',
  runtimeCaching: [{
    // Routing via a matchCallback function:
    urlPattern: ({ url }) => url.origin === self.location.origin && url.pathname.startsWith('/'),
    handler: 'CacheFirst',
    options: {
      cacheName: 'MainCache',
      expiration: {
        maxEntries: 100,
      },
    },
  }, ],
});

//not caching? -- trying to look at sw source.

// class CacheThenNetwork extends Strategy {  
//   _handle(request, handler) {
//     const cacheMatchDone = handler.cacheMatch(request);//should get from cache first
//     const fetchAndCachePutDone = handler.fetchAndCachePut(request);//should try to visit network no matter what

//     return new Promise((resolve, reject) => {
//       cacheMatchDone.then(response => response && resolve(response)).catch(
//         fetchAndCachePutDone.then(resolve)
//       );

//       // Reject if both network and cache error or find no response.
//       Promise.allSettled([fetchAndCachePutDone, cacheMatchDone]).then(
//         results => {
//           const [fetchAndCachePutResult, cacheMatchResult] = results;
//           if (
//             fetchAndCachePutResult.status === 'rejected' &&
//             !cacheMatchResult.value
//           ) {
//             reject(fetchAndCachePutResult.reason);
//           }
//         }
//       );
//     });
//   }
// }