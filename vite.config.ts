import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      globals: {
        Buffer: true, // Polyfill for Buffer
        process: true, // Polyfill for process
      },
      include: ['http2', 'crypto', 'stream'], // Explicitly include required modules
    }),
  ],
  optimizeDeps: {
    exclude: ['googleapis'], // Exclude `googleapis` from optimization
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // Backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
});