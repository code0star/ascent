/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        gradientBG: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "bounce-custom": {
          "0%": { transform: "translateY(0) scale(1, 0.8)" },
          "40%": { transform: "translateY(-20px) scale(0.9, 1.1)" },
          "60%": { transform: "translateY(-30px) scale(1, 1)" },
          "100%": { transform: "translateY(-50px)" },
        },
        "step-custom": {
          "0%": {
            boxShadow: "0 10px 0 rgba(0, 0, 0, 0), 0 10px 0 #f2f2f2, -35px 50px 0 #f2f2f2, -70px 90px 0 #f2f2f2",
          },
          "100%": {
            boxShadow: "0 10px 0 #f2f2f2, -35px 50px 0 #f2f2f2, -70px 90px 0 #f2f2f2, -70px 90px 0 rgba(0, 0, 0, 0)",
          },
        },
      },
      animation: {
        gradient: "gradientBG 6s ease infinite",
        "bounce-custom": "bounce-custom 0.6s ease-in-out infinite alternate",
        "step-custom": "step-custom 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
