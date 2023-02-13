import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  if (mode === 'development') {
    process.env.VITE_API_URL = 'http://localhost:8082/api'
  }
  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: [
        {
          find: 'eventsource',
          replacement:
            './node_modules/sockjs-client/lib/transport/browser/eventsource.js'
        },
        {
          find: 'events',
          replacement: './node_modules/sockjs-client/lib/event/emitter.js'
        },
        {
          find: 'crypto',
          replacement: './node_modules/sockjs-client/lib/utils/browser-crypto.js'
        }
      ]
    },
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: 'globalThis'
        }
      }
    }
  })
}
