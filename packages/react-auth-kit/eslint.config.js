const {
  defineConfig,
  globalIgnores,
} = require("eslint/config");

const tsParser = require("@typescript-eslint/parser");
const defaultConfig = require("./../../eslint.config.js");

module.exports = defineConfig([
  {
    extends: [defaultConfig],
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      "ecmaVersion": 2021,
      "sourceType": "module",

      parserOptions: {
        "project": "./tsconfig.test.json",
        "tsconfigRootDir": __dirname,
      },
    },
  },
  globalIgnores([
    "**/types",
    "**/dist",
    "**/node_modules",
    "**/.idea",
    "**/env",
    "**/docs",
    "**/docs_overrides",
  ])]);
