import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server :{
    port:4002 ,
    proxy:{
      '/api':{
        target :'http://localhost:8002',
        changeOrigin :true,
      }
    }
  }
})
