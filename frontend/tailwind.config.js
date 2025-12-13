import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  // here we set daisyui
  plugins: [daisyui],
  // Here we can use daisyui themes
  daisyui:{
	themes:["forest"],
  },
}