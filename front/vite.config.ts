/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';

import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
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
