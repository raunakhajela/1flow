/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        lg: ["18px", "24px"],
        md: ["16px", "20px"],
        base: ["14px", "20px"],
        sm: ["12px", "16px"],
        xs: ["10px", "12px"],
        h1: ["36px", "48px"],
        h2: ["32px", "40px"],
        h3: ["30px", "40px"],
        h4: ["26px", "32px"],
        h5: ["22px", "32px"],
        h6: ["18px", "24px"],
        s1: ["15px", "24px"],
        s2: ["13px", "24px"],
      },
      borderRadius: {
        app: "8px",
      },
      colors: {
        black: {
          DEFAULT: "#111111",
          darkest: "#171717",
          darker: "#262626",
          dark: "#363636",
        },
        silver: {
          DEFAULT: "#C0C0C0",
          light: "#474747",
          lighter: "#676767",
          litest: "#858585",
        },
        success: "#00C282",
        warn: "#DB9D20",
        error: "#FF3D54",
      },
      backgroundImage: {
        "blitz-central":
          "conic-gradient(from 152.7deg at 53.99% 48.89%,#00fff6 0deg,#dbe88f 75deg,#ef82ef 144.37deg,#6f98e8 213.75deg,#6fe2a4 281.25deg,#83cced 339.37deg,#00fff6 360deg)",
        "blitz-linear":
          "linear-gradient(127deg,#00fff6 -11.13%,#dbe88f 18.07%,#ef82ef 45.07%,#6f98e8 72.08%,#6fe2a4 98.35%,#83cced 120.98%)",
        "blitz-secondary": "linear-gradient(107.53deg, #ef82ef 0%, #6f98e8 99.62%)",
        "blitz-primary": "linear-gradient(106.82deg, #3cc9c4 0%, #b3c065 100%)",
      },
      boxShadow: {
        sm: "0px 1px 3px rgba(0, 0, 0, 0.15)",
        xs: "0px 1px 10px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      const themeGradients = {
        "primary-border":
          "linear-gradient(to right, #262626, #262626), linear-gradient(to bottom right, #262626, #262626)",
        "primary-border-focused":
          "linear-gradient(to right, #262626, #262626), linear-gradient(to bottom right, #3cc9c4, #b3c065)",
        "primary-card-border":
          "linear-gradient(to right, #171717, #171717), linear-gradient(to bottom right, #363636, #363636)",
        "primary-card-border-focused":
          "linear-gradient(to right, #171717, #171717), linear-gradient(to bottom right, #3cc9c4, #b3c065)",
        "radial-border":
          "linear-gradient(to right, #111111, #111111), conic-gradient( from 152.7deg at 53.99% 48.89%, #00fff6 0deg, #dbe88f 75deg, #ef82ef 144.37deg, #6f98e8 213.75deg, #6fe2a4 281.25deg, #83cced 339.37deg, #00fff6 360deg )",
        "radial-border-focused":
          "linear-gradient(to right, #111111, #111111), conic-gradient( from 152.7deg at 53.99% 48.89%, #00fff6 0deg, #dbe88f 75deg, #ef82ef 144.37deg, #6f98e8 213.75deg, #6fe2a4 281.25deg, #83cced 339.37deg, #00fff6 360deg )",
        "pinky-border":
          "linear-gradient(to right, #171717, #171717), linear-gradient(to bottom right, #EF82EF, #6F98E8)",
      };
      Object.keys(themeGradients).forEach((key) => {
        const color = {};
        color[`.blitz-${key}`] = {
          background: themeGradients[key],
          backgroundClip: "padding-box, border-box",
          backgroundOrigin: "padding-box, border-box",
        };
        addComponents(color);
      });
    }),
    require("@tailwindcss/forms"),
  ],
};
