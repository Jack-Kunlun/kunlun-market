module.exports = {
  parser: "@typescript-eslint/parser",
  // parserOptions: {
  //   project: "tsconfig.json",
  //   tsconfigRootDir: __dirname,
  //   sourceType: "module",
  // },
  plugins: ["@typescript-eslint/eslint-plugin"],
  extends: ["plugin:@typescript-eslint/recommended", "plugin:prettier/recommended", "prettier"],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "no-unused-vars": "off",
    // 强制所有接口名称必须以 "I" 为前缀
    "@typescript-eslint/interface-name-prefix": "off",
    // 需要函数和类方法的显式返回类型
    "@typescript-eslint/explicit-function-return-type": "off",
    // 要求在导出函数和类的公共类方法上显式返回和参数类型
    "@typescript-eslint/explicit-module-boundary-types": "off",
    // 不允许any类型
    "@typescript-eslint/no-explicit-any": "off",
  },
};
