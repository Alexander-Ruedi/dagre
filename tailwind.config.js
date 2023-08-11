/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  safelist: ["text-amber-*"],
  theme: {
    extend: {
      colors: {
        "msg-red": "#A01441",
        "msg-gray": "#6F6F6F",
        "optravis-gray": "#565656",
        "gray-200": "#e1e1e1",
        "indigo-500": "#ba456b",
        "indigo-600": "#A01441",
        "indigo-700": "#7d052c",
      },
      boxShadow: {
        custom: "rgba(0,0,0,0.4) 0px 0px 20px 0px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
