import { Config } from 'jest';

const config: Config = {
  collectCoverage: true,
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
};

export default config;
