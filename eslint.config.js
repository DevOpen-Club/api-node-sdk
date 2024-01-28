const antfu = require('@antfu/eslint-config').default

module.exports = antfu({
  files: [
    'examples/**/*.ts',
    'src/**/*.ts',
    'scripts/**/*.ts',
    'test/**/*.ts',
  ],
}, {
  files: ['examples/**/*.ts'],
  rules: {
    'no-console': [0],
  },
})
