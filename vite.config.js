import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(),'')
  return{
    plugins: [react()],
    define: {
      // 'process.env.URL_APP' : JSON.stringify(env.URL_APP),
      // 'process.env.URL_POKE' : JSON.stringify(env.URL_POKE),
      // 'process.env.OPEN_AI_KEY' : JSON.stringify(env.OPEN_AI_KEY),
    }
  }
})
