module.exports = {
    testMatch: ['**/*.unit.[jt]s?(x)'],
    "roots": ["<rootDir>/src"],
    "testEnvironment": "node",
    "moduleNameMapper": {
        "^(\\.{1,2}/.*)\\.js$": "$1"
    },
    "transform": {
        "\\.[jt]sx?$": [
            "babel-jest"
        ]
    }
};
