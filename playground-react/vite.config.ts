import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import jsw from "vite-plugin-jsw"



// https://vite.dev/config/
export default defineConfig({
  plugins: [
    jsw(),
    react(),
    tailwindcss(),
    ],
})
