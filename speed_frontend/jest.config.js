module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    testMatch: ['**/test/**/*.test.(ts|tsx)'],
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',  // Use ts-jest to handle TypeScript
      '^.+\\.(js|jsx)$': 'babel-jest'  // Use babel-jest to handle JSX
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    moduleNameMapper: {
      '\\.(css|less|sass|scss)$': 'identity-obj-proxy', // Mock CSS imports
    },
  };
  