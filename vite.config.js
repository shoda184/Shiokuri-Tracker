import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/shiokuri-tracker/", // あなたのリポジトリ名に置き換えてください
})
