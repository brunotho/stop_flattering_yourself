module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/config/', '/public/'],
  testMatch: ['**/__tests__/**/*.(test|spec).js?(x)'],

  moduleDirectories: ['node_modules', 'app/javascript'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
