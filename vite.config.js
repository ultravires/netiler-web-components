import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@packages': path.resolve(__dirname, 'packages')
    }
  },
  publicDir: 'public',
  build: {
    lib: {
      entry: [path.resolve(__dirname, 'packages/index.js'), path.resolve(__dirname, 'icons/icons.js')],
      name: 'NetilerUI',
      formats: ['es']
    },
    rollupOptions: {}
  }
});
