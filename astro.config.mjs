import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import webmanifest from 'astro-webmanifest';
import webmanifestConfig from './webmanifest.config.js';

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  // site: 'example.com',
  experimental: {
    integrations: true
  },
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false
      }
    }), 
    webmanifest(webmanifestConfig), 
    svelte()
  ]
});