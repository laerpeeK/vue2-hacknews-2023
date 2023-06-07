module.exports = {
  moduleFileExtensions: ['js', 'vue'],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': 'vue-jest'
  },
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/vue-email-signup-form-app/(.*)'], // 该文件下单独配置单独测试
  setupFiles: ['./test-setup.js']
}
