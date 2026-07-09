import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      'baby-ui': new URL('../src/index.ts', import.meta.url).pathname,
    },
  },
});
