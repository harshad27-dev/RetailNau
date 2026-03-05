/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Brand palette
        primary: {
          DEFAULT: "#00473E",
          50: "#E6F0EF",
          100: "#CCE1DE",
          200: "#99C3BD",
          300: "#66A59C",
          400: "#33877B",
          500: "#00473E",
          600: "#003932",
          700: "#002B25",
          800: "#001D19",
          900: "#000F0C",
        },
        secondary: {
          DEFAULT: "#E8F5E9",
          50: "#F5FBF5",
          100: "#E8F5E9",
          200: "#C8E6C9",
          300: "#A5D6A7",
          400: "#81C784",
          500: "#66BB6A",
        },
        accent: {
          DEFAULT: "#FF8C00",
          50: "#FFF3E0",
          100: "#FFE0B2",
          200: "#FFCC80",
          300: "#FFB74D",
          400: "#FFA726",
          500: "#FF8C00",
          600: "#E67E00",
          700: "#CC7000",
          800: "#B36200",
          900: "#995400",
        },
        background: "#FFFFFF",
        obsidian: "#1A1A1A",
      },
      fontFamily: {
        poppins: ["Poppins_400Regular"],
        "poppins-medium": ["Poppins_500Medium"],
        "poppins-semibold": ["Poppins_600SemiBold"],
        "poppins-bold": ["Poppins_700Bold"],
      },
    },
  },
  plugins: [],
};