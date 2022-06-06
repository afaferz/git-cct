module.exports = {
    preset: "ts-jest",
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        "^~/(.*)$": "<rootDir>/src/$1",
    },
    moduleFileExtensions: ["js", "ts", "vue", "json"],
    transform: {
        "^.+\\.vue$": "@vue/vue3-jest",
        "\\.[jt]sx?$": "ts-jest",
    },
    transformIgnorePatterns: ["<rootDir>/node_modules/"],
    collectCoverage: true,
    collectCoverageFrom: [
        "<rootDir>/src/components/**/*.vue",
        "<rootDir>/src/views/**/*.vue",
    ],
    setupFiles: ["<rootDir>/tests/setup.ts"],
};