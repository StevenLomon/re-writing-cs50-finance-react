/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",    // If using the Next.js App Router
    "./pages/**/*.{js,jsx,ts,tsx}",  // For files in the pages directory
    "./components/**/*.{js,jsx,ts,tsx}", // Common components directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

