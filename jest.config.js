module.exports = {
  testEnvironment: 'jsdom',
  collectCoverage: true,
  testEnvironmentOptions: {
    testURL: 'http://localhost',
    customExportConditions: [
      'node',
      'node-addons',
    ],
  },
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': '@vue/vue3-jest'
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
