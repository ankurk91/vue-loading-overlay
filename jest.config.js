module.exports = {
  testEnvironment: 'jsdom',
  collectCoverage: true,
  testEnvironmentOptions: {
    testURL: 'http://localhost',
  },
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': "@vue/vue2-jest"
  },
  moduleFileExtensions: [
    'js',
    'json',
    'jsx',
    'node',
    'vue',
    'css'
  ],
  moduleNameMapper: {
    "\\.(css|less|scss)$": "<rootDir>/__test__/__mocks__/styleMock.js"
  },
  setupFiles: [
    '<rootDir>/__test__/setup.js'
  ],
}
