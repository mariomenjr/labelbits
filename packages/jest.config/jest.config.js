// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // Set the test environment to jsdom
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    '^@labelbits/designer-([^/]+)(?:/([^/]+))?$': '<rootDir>/../../designer/$1/src',
    '^@labelbits/designer-([^/]+)(?:/([^/]+))?$': '<rootDir>/../../designer/$1/src/$2',
  },
  setupFilesAfterEnv: ['<rootDir>/../../packages/jest.config/jest.setup.js'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
      }
    ],
  },
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/coverage/",
    "/build/",
  ],
};
