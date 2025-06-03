import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000', // Points to your Laravel backend
        changeOrigin: true,              // Changes the origin header to match the target URL
        // If your Laravel routes don't include the "/api" prefix, uncomment the next line:
        // rewrite: (path) => path.replace(/^\/api/, ''),

      headers:{
        accept: 'application/json',
        'Content-Type': 'application/json',
      }
      },
    },
  },
})
