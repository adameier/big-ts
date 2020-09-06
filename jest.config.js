module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: false,
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: 'test',
  moduleFileExtensions: ['ts', 'js'],
  modulePathIgnorePatterns: ['property-test']
}
