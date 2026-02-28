module.exports = {
  preset: "jest-expo",
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg|nativewind|react-native-css-interop|react-native-reanimated|react-native-gesture-handler|react-native-screens|react-native-safe-area-context|date-fns|expo-.*)"
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1"
  },
  testMatch: ["**/__tests__/**/*.test.{ts,tsx}"]
};
