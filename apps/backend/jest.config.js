/** @returns {Promise<import('jest').Config>} */
module.exports = async () => {
  return {
    verbose: true,
    moduleFileExtensions: ["js", "json", "ts"],
    rootDir: "src",
    testRegex: ".*\\.spec\\.ts$",
    transform: {
      "^.+\\.(t|j)s$": "ts-jest",
    },
    collectCoverageFrom: ["**/*.(t|j)s"],
    coverageDirectory: "../coverage",
    testEnvironment: "node",
    moduleNameMapper: {
      "^@config/(.*)$": "<rootDir>/config/$1",
      "^@utils/(.*)$": "<rootDir>/utils/$1",
      "^@entity/(.*)$": "<rootDir>/entity/$1",
      "^@decorator/(.*)$": "<rootDir>/decorator/$1",
      "^@guard/(.*)$": "<rootDir>/guard/$1",
      "^@filter/(.*)$": "<rootDir>/filter/$1",
      "^@pipe/(.*)$": "<rootDir>/pipe/$1",
      "^@interceptor/(.*)$": "<rootDir>/interceptor/$1",
      "^@middleware/(.*)$": "<rootDir>/middleware/$1",
    },
  };
};
