/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-dark": "#131515",
        "custom-black": "#0A0B0B",
        "custom-gray": "#272B2B",
        "custom-dark-translucent": "rgba(19, 21, 21, 0.5)",
      },
    },
  },
  plugins: [],
};
