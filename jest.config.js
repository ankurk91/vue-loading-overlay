module.exports = {
  testEnvironment: 'jsdom',
  collectCoverage: true,
  testURL: 'http://localhost',
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue3-jest'
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
    '\\.(css|less|scss)$': '<rootDir>/__test__/__mocks__/styleMock.js'
  },
}
