// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const SITE = process.env.SITE_URL || 'https://1pointo.com';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  output: 'static',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'always',
    format: 'directory',
  },
  server: {
    port: 4321,
  },
});
