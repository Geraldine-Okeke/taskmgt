/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {

      aspectRatio: {
        '1/1': '1',
        '2/1': '2',
      },
    },
  },
  plugins: [],
}

