// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // Set the test environment to jsdom
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
      }
    ],
  },
};
