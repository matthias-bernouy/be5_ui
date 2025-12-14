module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: [
        "**/__tests__/**/*.ts"
    ],
    testPathIgnorePatterns: [
        "/node_modules/",
        "/.dist/"
    ],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    collectCoverage: true,
    coverageDirectory: "coverage",
    collectCoverageFrom: [
        "src/**/*.ts"
    ]
};