module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
  ],
  rules: {
    "react/react-in-jsx-scope": "off", // Disable this rule
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
