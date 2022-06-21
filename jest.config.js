module.exports = {
  roots: ['<rootDir>/tests'],
  collectCoverageFrom: ['<rootDir>/tests/**/*.{ts,js}', '!**/*.d.ts'],
  coverageDirectory: 'coverage',
  transform: {
    '.+\\.(ts)$': 'ts-jest',
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
}
