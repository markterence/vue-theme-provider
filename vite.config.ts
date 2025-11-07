import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  root: './playground',
  // eslint-disable-next-line node/prefer-global/process
  base: process.env.BASE_URL || '/',
  plugins: [vue()],
})
