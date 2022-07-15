import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  if (mode === 'development') {
    process.env.VITE_API_URL = 'http://localhost:8082/api'
  }
  return defineConfig({
    plugins: [react()]
  })
}
