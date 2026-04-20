import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    target: 'es2020',        // Output moderno → bundles más compactos
    sourcemap: false,        // Sin sourcemaps en producción
    cssMinify: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // En Vite 8 (rolldown), manualChunks debe ser función
        manualChunks(id) {
          if (id.includes('node_modules/firebase')) {
            return 'firebase';
          }
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
        }
      }
    }
  }
})

