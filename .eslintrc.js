module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react-native/all",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react", "react-hooks", "react-native"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  env: {
    "react-native/react-native": true,
    jest: true,
  },
  rules: {
    // React Native specific
    "react-native/no-unused-styles": "error",
    "react-native/split-platform-components": "off",
    "react-native/no-inline-styles": "warn",
    "react-native/no-color-literals": "off",
    "react-native/no-raw-text": "off",

    // React
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "react/display-name": "off",

    // TypeScript
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-empty-interface": "off",

    // General
    "no-console": ["warn", { allow: ["error", "warn"] }],
    "prefer-const": "error",
    "no-var": "error",
  },
  ignorePatterns: [
    "node_modules/",
    "android/",
    "ios/",
    ".expo/",
    "dist/",
    "*.config.js",
  ],
};
