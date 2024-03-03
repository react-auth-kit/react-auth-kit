module.exports = {
    'env': {
      'browser': true,
      'es2021': true,
    },
    'extends': [
      "eslint:recommended",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended",
      'plugin:react/recommended',
      "plugin:react/jsx-runtime",
      'google',
    ],
    'plugins': [
      'react',
      '@typescript-eslint',
      'eslint-plugin-tsdoc'
    ],
    'settings': {
      'react': {
        'version': 'detect',
      }
    },
  
    'rules': {
      'tsdoc/syntax': 'warn',
      'react/prop-types': 0,
      'react/display-name': 0,
      "react/react-in-jsx-scope": "off",
      'valid-jsdoc': 0,
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error"],
      "@typescript-eslint/no-explicit-any": "off"
    },
  };
  