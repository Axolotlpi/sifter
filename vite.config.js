import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { VitePWA } from 'vite-plugin-pwa';
import { manifest } from './manifest.config.js';
import { workboxConfig } from './workbox.config.js';

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig({
	plugins: [
		svelte(),
		VitePWA({
			registerType: 'autoUpdate',
			manifest: manifest,
			strategies: 'generateSW',
			workbox: workboxConfig
		})
	]
});
