import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { fileURLToPath, URL } from 'node:url' // <-- ДОДАЙТЕ ЦЕЙ ІМПОРТ

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      // Використовуйте ТІЛЬКИ цей рядок. Він правильний для Vite.
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})