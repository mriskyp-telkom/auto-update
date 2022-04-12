module.exports = {
  projects: [
    {
      transform: { '^.+\\.ts?$': 'ts-jest' },
      testEnvironment: 'node',
      testRegex: '/tests/main/.*\\.(test|spec)?\\.(ts|tsx)$',
      moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
      moduleNameMapper: {
        'main/(.*)': '<rootDir>/src/main/$1',
        'global/(.*)': '<rootDir>/src/global/$1',
      },
    },
    {
      testEnvironment: 'jsdom',
      testRegex: '/tests/renderer/.*\\.(test|spec)?\\.(ts|tsx)$',
      testPathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|.next)[/\\\\]'],
      transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
      transform: {
        '^.+\\.(ts|tsx)$': 'babel-jest',
      },
      moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
      moduleNameMapper: {
        'renderer/(.*)': '<rootDir>/src/renderer/$1',
        'global/(.*)': '<rootDir>/src/global/$1',
      },
    },
  ],
}
