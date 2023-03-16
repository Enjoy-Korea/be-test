import type { Config } from 'jest';

export default (): Config => ({
  moduleFileExtensions: ['js'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.js$',
  collectCoverageFrom: ['**/*.js'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
});
