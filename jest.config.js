module.exports = {
    testEnvironment: 'jsdom',
    roots: ['<rootDir>/static/js'],
    testMatch: ['**/__tests__/**/*.test.js'],
    moduleFileExtensions: ['js'],
    collectCoverageFrom: [
        'static/js/**/*.js',
        '!static/js/**/__tests__/**'
    ],
    coverageDirectory: 'coverage',
    verbose: true
};
