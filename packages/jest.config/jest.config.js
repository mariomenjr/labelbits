// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // Set the test environment to jsdom
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    // Matches patterns like '@labelbits/designer-shared'
    '^@labelbits/designer-(\\w+)$': '<rootDir>/../../designer/$1/src',

    // Matches patterns like '@labelbits/designer-core/fabric'
    '^@labelbits/designer-(\\w+)/(\\w+)$': '<rootDir>/../../designer/$1/src/$2',

    // Matches patterns like '@labelbits/designer-plugin-barcode'
    '^@labelbits/designer-(\\w+)-(\\w+)$': '<rootDir>/../../designer/$1/$2/src',
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
