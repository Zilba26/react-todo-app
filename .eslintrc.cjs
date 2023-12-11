module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    //disabled complete eslint@typescript-eslint/no-unused-vars when variable name = props
    '@typescript-eslint/no-unused-vars': [
      'error',
      { varsIgnorePattern: 'props', argsIgnorePattern: 'props' }
    ],
    '@typescript-eslint/no-explicit-any': 'off',
  },
}
