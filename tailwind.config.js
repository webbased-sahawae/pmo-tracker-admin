/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    colors: {
      primary: "#0303fc",
      dprimary: "#000064",
      dsecondary: "#ffb300",
      secondary: "#fad01b",
      pred: "#FF0000",
      stop: "rgb(255,0,0)",
      ongoing: "rgb(249 115 22)",
      complete: "rgb(34 197 94)",
      white: "#FFF",
      disable: "rgb(128 128 128)",
      transparent: "transparent",
    },
    textColor: {
      primary: "#FFF",
      pred: "#FF0000",
      blue: "#0303fc",
      disable: "rgb(128 128 128)",
      white: "#FFF",
      secondary: "#fad01b",
      black: "#000",
      stop: "rgb(107 114 128)",
      ongoing: "rgb(249 115 22)",
      complete: "rgb(34 197 94)",
      dprimary: "#000064",
      dsecondary: "#ffb300",
    },
    extend: {
      transitionProperty: {
        height: "height",
      },
    },
  },

  plugins: [],
};
