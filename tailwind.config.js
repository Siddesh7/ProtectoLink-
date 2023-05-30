/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#8be572",

          secondary: "#e86229",

          accent: "#f230d1",

          neutral: "#2A2438",

          "base-100": "#FFFFFF",

          info: "#4FA3EE",

          success: "#3FD5BC",

          warning: "#BC7E0B",

          error: "#F10E12",
        },
      },
    ],
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
