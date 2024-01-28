import type { Config } from 'jest'

export default {
  collectCoverage: true,
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
} satisfies Config
