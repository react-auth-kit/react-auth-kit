module.exports = {
  'extends': ["./../../.eslintrc.js"],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'project': './tsconfig.test.json',
    'tsconfigRootDir': __dirname,
    'ecmaVersion': 2018,
    'sourceType': 'module'
  }
};
