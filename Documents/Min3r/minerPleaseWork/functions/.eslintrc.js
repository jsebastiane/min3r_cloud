module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  plugins: [
    "promise",
  ],
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    quotes: ["error", "double"],

  },
};
