module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: [
        "**/__tests__/**/*.ts"
    ],
    testPathIgnorePatterns: [
        "/node_modules/",
        "/dist/"
    ],
    collectCoverage: true,
    coverageDirectory: "coverage",
    collectCoverageFrom: [
        "src/**/*.ts"
    ]
};