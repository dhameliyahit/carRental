import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: true, // allows access from network
    port: 5173, // your dev server port
    allowedHosts: [
      'ca025bb4bee9.ngrok-free.app', // add your ngrok host here
      'localhost'
    ]
  }
})

