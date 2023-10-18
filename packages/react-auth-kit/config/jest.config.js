/** @type {import('jest').Config} */
module.exports = {
  rootDir: './../',
  // testMatch: ["<rootDir>/../src/**/.{js,jsx,ts,tsx}"],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  preset: 'ts-jest',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testEnvironment: "jsdom",
  verbose: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["lcov", "html", "text"],
  collectCoverageFrom: ["src/**/*.(js|jsx|ts|tsx)"],
};
