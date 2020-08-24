module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
    node: true,
  },
  extends: ['eslint:recommended', 'airbnb', 'prettier'],
  parserOptions: {
    ecmaVersion: 11,
  },
  plugins: ['prettier'],
  rules: {
    'no-param-reassign': [
      2,
      {
        props: false,
      },
    ],
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'prettier/prettier': 'warn',
    'func-names': 'off',
    'object-shorthand': 'off',
    'class-methods-use-this': 'off',
    'no-use-before-define': 'off',
    'prefer-template': 'off',
    'no-path-concat': 'off',
    'one-var': 'off',
  },
};
