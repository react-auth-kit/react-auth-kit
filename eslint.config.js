const {
  defineConfig,
} = require("eslint/config");

const globals = require("globals");
const js = require("@eslint/js");
const react = require("eslint-plugin-react");

const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const tsdoc = require("eslint-plugin-tsdoc");



module.exports = defineConfig([{
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.jest,
      ...globals.node,
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },

  extends: [
    "js/recommended",
  ],

  plugins: {
    js,
    react,
    "@typescript-eslint": typescriptEslint,
    tsdoc,
  },

  "settings": {
    "react": {
      "version": "detect",
    },
  },

  "rules": {
    "tsdoc/syntax": "warn",
    "react/prop-types": 0,
    "react/display-name": 0,
    "react/react-in-jsx-scope": "off",
    "valid-jsdoc": 0,
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "@typescript-eslint/no-explicit-any": "off",
  },
}]);
