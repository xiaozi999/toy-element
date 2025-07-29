import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    exclude: ['@toy-element/utils', '@toy-element/components', '@toy-element/hooks', '@toy-element/theme']
  },
  resolve: {
    alias: {
      '@toy-element/utils': resolve(__dirname, '../utils'),
      '@toy-element/components': resolve(__dirname, '../components'),
      '@toy-element/hooks': resolve(__dirname, '../hooks'),
      '@toy-element/theme': resolve(__dirname, '../theme')
    }
  }
})
