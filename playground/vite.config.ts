import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      'bugbaby-ui': new URL('../src/index.ts', import.meta.url).pathname,
    },
  },
});
