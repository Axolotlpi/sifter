export const workboxConfig = {
	globDirectory: 'dist/',
	globPatterns: ['**/*.{css,woff2,png,svg,jpg,js,html,webmanifest,ico}'],
	maximumFileSizeToCacheInBytes: 5000000000,
	swDest: 'dist/sw.js',
	runtimeCaching: [
		{
			// Routing via a matchCallback function:
			urlPattern: ({ url }) => url.origin === self.location.origin,
			handler: 'NetworkFirst',
			options: {
				cacheName: 'MainCache',
				expiration: {
					maxEntries: 100
				},
				networkTimeoutSeconds: 4
			}
		}
	]
};
