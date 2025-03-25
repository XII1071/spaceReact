import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    proxy: {
      '/uploadAjax': {
        target: 'http://52.62.172.179/apiserver/',
        changeOrigin: true,
        secure: false
      }
    }
  },
  plugins: [react(), tailwindcss()]
})
