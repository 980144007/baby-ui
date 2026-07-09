import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
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
          dayjs: [['default', 'dayjs']],
          lodash: [['cloneDeep', '$cloneDeep']],
        },
      ],
      dts: 'auto-imports.d.ts',
      resolvers: [VantResolver()],
    }),
    Components({
      dts: 'components.d.ts',
      resolvers: [VantResolver()],
    }),
    dts({
      outDir: 'dist',
      include: ['src'],
      cleanVueFileName: true,
      insertTypesEntry: true,
      logLevel: 'silent',
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      stores: resolve(__dirname, 'src/stores'),
      components: resolve(__dirname, 'src/components'),
      common: resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: '@import "@/styles/index.less";',
      },
    },
  },
  build: {
    cssCodeSplit: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external: (id) => /^(vue|vant|dayjs|decimal\.js|lodash)(\/.*)?$/.test(id),
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name][extname]',
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    },
  },
});
