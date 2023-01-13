module.exports = {
  parserOptions: {
    // Specify the version of ECMAScript syntax want to use
    ecmaVersion: 6,
    // Support ECMAScript modules
    sourceType: 'module',
  },
  extends: [
    'plugin:prettier/recommended'
  ],
  plugins: ['prettier'],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['~', './'],
          ['@', './src']
        ],
        extensions: ['.js', '.jsx']
      }
    }
  },
  rules: {
    'prettier/prettier': 'error',
    'no-script-url': 'off',
    'import/extensions': ['error', 'always', {
      js: 'never',
      jsx: 'never'
    }],
    'import/prefer-default-export': 'off',
    'react/prop-types': ['error', {
      ignore: [
        // React
        'context', 'children',
        // antd.form
        'form', 'loading',
        // antd.modal
        'setModalProps', 'params',
        // apollo client mutation
        'mutation',
        // OffsetBasedPagination
        'field', 'queryProps', 'defaultPageNumber', 'pageNumber', 'onPageChange',
        // Apollo query search variables
        'searchVariables'
      ]
    }],
    'react/no-multi-comp': ['error', { ignoreStateless: true }],
    'react/jsx-wrap-multilines': ['error', {
      declaration: true
    }]
  }
}
