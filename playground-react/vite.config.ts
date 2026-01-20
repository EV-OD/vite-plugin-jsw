import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import jsw from "@allwcons/vite-plugin-jsw"



// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // cast to local vite PluginOption to avoid type mismatch between multiple vite instances
    (jsw() as unknown) as import('vite').PluginOption,
    react(),
    tailwindcss(),
    ],
})
