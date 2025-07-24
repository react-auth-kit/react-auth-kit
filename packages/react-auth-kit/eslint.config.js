const {defineConfig} = require("eslint/config");

const defaultConfig = require("./../../eslint.config.js");

module.exports = defineConfig([
  {
    extends: [defaultConfig],
    languageOptions: {
      parserOptions: {
        "project": "./tsconfig.test.json",
        "tsconfigRootDir": __dirname,
      },
    },
  },
]);
