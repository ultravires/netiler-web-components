import path from 'path';
import { defineConfig } from 'vite';
import UnoCSS from 'unocss/vite';

export default defineConfig({
  plugins: [
    UnoCSS()
  ],
  resolve: {
    alias: {
      '@packages': path.resolve(__dirname, 'packages')
    }
  },
  publicDir: 'public',
  build: {
    target: 'esnext',
    lib: {
      entry: [path.resolve(__dirname, 'packages/index.js'), path.resolve(__dirname, 'icons/icons.js')],
      name: 'NetilerUI',
      formats: ['es']
    },
    rollupOptions: {
      external: ['pdfjs-dist/legacy']
    }
  }
});
