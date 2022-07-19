const {pathsToModuleNameMapper} = require('ts-jest');
const {paths} = require('./tsconfig.json').compilerOptions;

globalThis.ngJest = {
  skipNgcc: false,
  tsconfig: '<rootDir>/tsconfig.spec.json',
};

module.exports = {
  preset: 'jest-preset-angular',
  globalSetup: 'jest-preset-angular/global-setup',
  setupFilesAfterEnv: [
    '<rootDir>/src/setupJest.ts'
  ], // setup env file
  rootDir: '', // start searching for files from root
  collectCoverage:  true, // code coverage
  coverageReporters:  ['html'], // generate the report in HTML
  coverageDirectory: '<rootDir>/dist/test-results/', // folder for coverage
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
      isolatedModules: true
    },
  }, // need to be available in all test environments.
  moduleNameMapper: {
    ...pathsToModuleNameMapper(paths, {prefix: '<rootDir>'}),
    '^@App/(.*)$': '<rootDir>/src/app/$1',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
  testMatch: [
    '<rootDir>/src/app/**/*.+(spec.ts)'
  ], // test file extensions
  transform: {
    '^.+\\.(ts|js|html)$': 'jest-preset-angular',
    '^.+\\.[t|j]sx?$': 'babel-jest'
  },
  // Do not change with jest-circus (jest 27.1.1)
  // a lot of tests won't success (Error: Test functions cannot both take a 'done' callback...)
  testRunner : "jest-jasmine2",
  testEnvironmentOptions: {
    url: 'http://localhost/',
  },
  transformIgnorePatterns: [
    'node_modules/(?!.*\\.mjs$|preact|@agm)',
  ],
};
