import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import sitemap from 'vite-plugin-sitemap'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    sitemap({
      hostname: 'https://manuastro.com',
      dynamicRoutes: [
        '/',
        '/horoscope',
        '/gemstones',
        '/rudraksha',
        '/yantra',
        '/shop',
        '/blog',
        '/about',
        '/contact',
        '/pricing',
        '/gallery',
        '/services/vedic-astrology',
        '/services/palm-reading',
        '/services/personal-consultation',
        '/services/vaastu',
        '/services/corporate-programs',
        '/services/face-reading',
        '/privacy-policy',
        '/terms-of-service',
        '/refund-policy'
      ]
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
})
