import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        {
          lodash: [['cloneDeep', '$cloneDeep']],
        },
      ],
      resolvers: [VantResolver()],
    }),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  resolve: {
    alias: {
      'bugbaby-ui': fileURLToPath(new URL('../src/index.ts', import.meta.url)),
      '@': fileURLToPath(new URL('../src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: '@import "@/styles/index.less";',
      },
    },
  },
});
