/** @type{import('jest').Config} */
module.exports = {
  collectCoverage: true,
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
}
