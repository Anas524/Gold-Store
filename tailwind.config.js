/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        page: 'var(--g-page)',
        surface: 'var(--g-surface)',
        surfaceSoft: 'var(--g-surface-soft)',

        ink: 'var(--g-ink)',
        softInk: 'var(--g-soft-ink)',

        gold: {
          500: 'var(--g-gold-500)',
          700: 'var(--g-gold-700)',
        },
      },
      fontFamily: {
        sans: ['"Poppins"', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
      },
      boxShadow: {
        softCard: "0 18px 45px rgba(15, 23, 42, 0.14)",
      },
    },
  },
  plugins: [],
};
