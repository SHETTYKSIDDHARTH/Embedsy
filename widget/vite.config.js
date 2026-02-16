import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    cors: true
  },
  build: {
    lib: {
      entry: 'src/index.jsx',
      name: 'Embedsy',
      fileName: 'widget',
      formats: ['iife']
    }
  }
});