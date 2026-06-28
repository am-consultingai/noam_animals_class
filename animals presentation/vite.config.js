import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// בבנייה לפרודקשן ה-base הוא שם המאגר (לדפי GitHub Pages); בפיתוח הוא '/'.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/noam_animals_class/' : '/',
  plugins: [react()],
}))
