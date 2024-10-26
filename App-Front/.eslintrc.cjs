module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es2021: true,
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'simple-import-sort',
    'unused-imports',
    'react-refresh',
    '@tanstack/query',
    'eslint-plugin-prettier',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  ignorePatterns: ['.eslintrc.cjs'],
  parserOptions: {
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'mdx/code-blocks': true,
  },
  rules: {
    eqeqeq: 'error',
    'no-nested-ternary': 'error',

    // disabled rules
    '@typescript-eslint/no-explicit-any': 'off',
    'react/react-in-jsx-scope': 'off',

    // controlled by typescript
    'react/prop-types': 'off',
    // // controlled by typescript
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/consistent-type-assertions': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'error',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'no-void': 'off',
    // customized rules
    '@typescript-eslint/padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: ['block', 'block-like'],
        next: '*',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: ['block', 'block-like'],
      },
    ],
    'react/jsx-boolean-value': ['error', 'never'],
    'react/jsx-curly-brace-presence': [
      'error',
      {
        propElementValues: 'always',
      },
    ],
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // side-effect imports
          ['^\\u0000'],
          // node, scoped, no-scoped packages
          ['^node:', '^@', '^\\w'],

          // Alias imports
          ['^#/utils', '^#/configs'],
          ['^#/types'],
          ['^#/fixtures'],
          ['^#/modules'],

          // Parent, sibling imports.
          ['^\\.\\./', '^\\./'],
        ],
      },
    ],
    'react/jsx-handler-names': 'error',
    'react/jsx-no-constructed-context-values': 'error',
    'react/jsx-pascal-case': [
      'error',
      {
        allowNamespace: true,
        allowLeadingUnderscore: false,
      },
    ],
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        ignoreCase: true,
        reservedFirst: true,
        shorthandFirst: true,
      },
    ],
    'no-console': ['warn', { allow: ['error', 'info', 'warn'] }],
    '@tanstack/query/exhaustive-deps': 'error',
    '@tanstack/query/no-deprecated-options': 'off',
    '@tanstack/query/prefer-query-object-syntax': 'off',
    '@tanstack/query/no-rest-destructuring': 'warn',
    '@tanstack/query/stable-query-client': 'error',
  },
}
