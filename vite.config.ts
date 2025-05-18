import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import path from 'path' // Tambahkan import path
import { fileURLToPath } from 'url' // Tambahkan import untuk ESM __dirname

// Helper untuk mendapatkan __dirname di modul ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        // Secara eksplisit arahkan ke file konfigurasi Tailwind
        tailwindcss({ config: path.resolve(__dirname, 'tailwind.config.js') }),
        autoprefixer(),
      ],
    },
  },
})
