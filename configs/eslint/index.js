module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['react-app', 'eslint:recommended', 'plugin:react/recommended', 'plugin:import/errors', 'plugin:import/warnings'],
  plugins: ['react-hooks', 'jsx-a11y', '@typescript-eslint', 'import'],
  env: {
    jest: true,
    browser: true,
    node: true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: { jsx: true }
  },
  rules: {
    'import/first': 0,
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react-hooks/rules-of-hooks': 0,
    'react-hooks/exhaustive-deps': 0,
    'no-use-before-define': 0,
    'import/no-unresolved': 0,
    'no-unused-vars': 0,
    'no-extend-native': 0,
    'no-param-reassign': 0,
    'no-debugger': 'warn',
    'react/jsx-filename-extension': 0,
    'no-console': 0,
    'react/state-in-constructor': 0,
    'react/static-property-placement': 0,
    'react/jsx-props-no-spreading': 0,
    'no-unused-expressions': 0,
    'react/display-name': 0,
    'react/prop-types': 0,
    'no-irregular-whitespace': 0,
    'react/no-children-prop': 0,
    'arrow-body-style': 0,
    'no-prototype-builtins': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'eol-last': [ 'error', 'always' ],
    'arrow-parens': 0,
    'comma-dangle': 0,
    'brace-style': [ 'error', '1tbs', { allowSingleLine: true } ],
    'no-trailing-spaces': ['off', { IgnoreComments: true }],
    'max-len': [
      'warn',
      {
        code: 120,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true
      }
    ],
    'no-useless-return': 'warn',
    'indent': ['warn', 2, { SwitchCase: 1 }],
    'array-element-newline': [
      'warn',
      {
        multiline: true,
        minItems: 10
      }
    ],
    'object-curly-spacing': [ 'warn', 'always' ],
    'object-curly-newline': [
      'warn',
      {
        ObjectExpression: {
          minProperties: 5,
          multiline: true,
          consistent: true
        },
        ObjectPattern: {
          minProperties: 5,
          multiline: true,
          consistent: true
        },
        ImportDeclaration: {
          minProperties: 5,
          multiline: true,
          consistent: true
        },
        ExportDeclaration: {
          minProperties: 5,
          multiline: true,
          consistent: true
        }
      }
    ],
    'eqeqeq': [ 'error', 'always' ]
    /*
     * "quotes": ["error", "double"],
     * "jsx-quotes": ["error", "prefer-double"]
     */
  }
};
