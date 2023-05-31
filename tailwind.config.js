/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  daisyui: {
    themes: ["emerald"],
  },
  theme: {
    theme: {
      extend: {
        animation: {
          text: "text 2s ease infinite",
        },
        keyframes: {
          text: {
            "0%, 100%": {
              "background-size": "200% 200%",
              "background-position": "left center",
            },
            "50%": {
              "background-size": "200% 200%",
              "background-position": "right center",
            },
          },
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
