import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/'],
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        // anything starting with /api
        target: 'http://localhost:8080', // Spring Boot
        changeOrigin: true,
      },
    },
  },
});
