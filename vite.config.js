import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import jsconfigPaths from 'vite-jsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),svgr(),jsconfigPaths()],
    resolve: {
    alias: {
      '@': '/src' // تأكد من تعديل المسار بناءً على بنية مشروعك
    }
  }
})

