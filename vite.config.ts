import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import inertia from '@adonisjs/inertia/vite'
import adonisjs from '@adonisjs/vite/client'
import ui from '@nuxt/ui/vite'

export default defineConfig({
  plugins: [
    vue(),
    inertia({ ssr: { enabled: false } }),
    adonisjs({ entrypoints: ['inertia/app.ts'], reload: ['resources/views/**/*.edge'] }),
    ui(),
  ],

  server: {
    watch: {
      ignored: ['**/storage/**', '**/tmp/**'],
    },
  },
})
