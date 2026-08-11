/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0b0f19',
          navy: '#111827',
          blue: '#2563eb',
          electric: '#3b82f6',
          gold: '#d97706',
          amber: '#f59e0b',
          emerald: '#059669',
          crimson: '#dc2626'
        }
      }
    },
  },
  plugins: [],
}
