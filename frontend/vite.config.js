import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': { target: 'http://localhost:5000', changeOrigin: true },
      '/me': { target: 'http://localhost:5000', changeOrigin: true },
      '/profile': { target: 'http://localhost:5000', changeOrigin: true },
      '/status': { target: 'http://localhost:5000', changeOrigin: true },
    },
  },
})
