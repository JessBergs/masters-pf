module.exports = {
    moduleNameMapper: {
        '\\.(css|less|scss|sss|styl)$': '<rootDir>/node_modules/jest-css-modules',
    },
    testURL: 'http://localhost',
    automock: false,
    setupFiles: ['<rootDir>/test/setupJest.js'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
