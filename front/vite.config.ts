/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';

import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy : {
      '/api': {
        target: 'http://adonis:3333',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    exclude: [
      ...configDefaults.exclude,
      '**/**/**postcss.config.js',
      '**/**/**tailwind.config.js ',
    ],
  },
});
