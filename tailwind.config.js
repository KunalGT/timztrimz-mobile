/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        gold: { DEFAULT: "#C9A84C", light: "#D4B85E", dark: "#B8973F" },
        "warm-grey": "#6B7280",
        "off-white": "#F9FAFB",
        success: "#10B981",
        danger: "#EF4444",
      },
      fontFamily: {
        sans: ["Inter_400Regular"],
        "sans-medium": ["Inter_500Medium"],
        "sans-semibold": ["Inter_600SemiBold"],
        "sans-bold": ["Inter_700Bold"],
        display: ["PlayfairDisplay_700Bold"],
      },
    },
  },
  plugins: [],
};
