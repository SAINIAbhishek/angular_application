require('jest-preset-angular/ngcc-jest-processor');

module.exports = {
  preset: 'jest-preset-angular',
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
  transformIgnorePatterns: [
    'node_modules/',
  ],
};
