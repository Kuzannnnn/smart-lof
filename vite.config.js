import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Change this from 'smart-lof-web' to 'smart-lof'
  base: '/smart-lof/', 
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  }
})