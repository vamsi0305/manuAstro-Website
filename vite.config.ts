import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import sitemap from 'vite-plugin-sitemap'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const backendUrl = env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:8000'

  return {
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
          target: backendUrl,
          changeOrigin: true,
        },
      },
    },
  }
})
