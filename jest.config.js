module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/tests/**/*.{ts,js}', '!**/*.d.ts'],
  coverageDirectory: 'coverage',
  transform: {
    '.+\\.(ts)$': 'ts-jest',
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
}
