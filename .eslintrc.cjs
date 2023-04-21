module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:@typescript-eslint/recommended",
    "plugin:storybook/recommended",
    "prettier",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "import", "unicorn"],
  rules: {
    // 强制或禁止箭头函数体使用大括号
    // "arrow-body-style": "off",
    // 要求使用箭头函数作为回调
    // "prefer-arrow-callback": "off",
    // 半风格-强制一致地使用反引号、双引号或单引号
    semi: ["error", "always"],
    // 引号-强制一致地使用反引号、双引号或单引号
    quotes: ["error", "double"],
    // 需要使用 === 和 !== (消除类型不安全的相等运算符)
    eqeqeq: ["error", "always"],
    "object-shorthand": ["error", "always"],
    "no-sequences": [
      "error",
      {
        allowInParentheses: false,
      },
    ],
    // 字符串拼接使用字符串模板而不是+
    "prefer-template": "error",
    // 确保将块语句包裹在花括号中来防止错误并提高代码清晰度
    curly: "error",
    "padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        prev: ["function", "class", "const", "let", "var", "block-like"],
        next: "*",
      },
      {
        blankLine: "always",
        prev: "*",
        next: ["return", "block-like"],
      },
      {
        blankLine: "any",
        prev: ["const", "let", "var"],
        next: ["const", "let", "var"],
      },
    ],
    "padded-blocks": ["error", "never"],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        varsIgnorePattern: "^_",
        argsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],
    "no-console": "error",
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: ["~/localization/*"],
            message: "Don't import any internals from a module, only use its public api",
          },
        ],
      },
    ],
    // 对比排序前后代码，排序后的代码看起来更整洁
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
        pathGroups: [
          {
            pattern: "~/**",
            group: "internal",
          },
        ],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        "newlines-between": "never",
      },
    ],
    // 验证所有命名导入是否是引用模块中命名导出集的一部分
    "import/named": "error",
    // 导入/无重复
    "import/no-duplicates": "error",
    // 防止在 import 和 require 语句中出现不必要的路径段
    "import/no-useless-path-segments": [
      "error",
      {
        noUselessIndex: true,
      },
    ],
    // 顶级导入语句或要求调用之后有一个或多个空行
    "import/newline-after-import": "error",
    // 不要使用for,可以用循环替换的for-of循环
    "unicorn/no-for-loop": "error",
    // 将函数定义移动到可能的最高范围
    "unicorn/consistent-function-scoping": "error",
    // 强制显式比较值的length or size属性
    "unicorn/explicit-length-check": "error",
    // 需要Array.isArray()而不是instanceof Array
    "unicorn/no-array-instanceof": "error",
    // 优先使用.find(…)或.findLast(…)而不是.filter(…)
    "unicorn/prefer-array-find": "error",
    // 优先使用.includes()而不是.indexOf()
    "unicorn/prefer-includes": "error",
    // 字符串优先使用String#slice() 而不是 String#substr() 和 String#substring()
    "unicorn/prefer-string-slice": "error",
    // 在属性上使用解构变量
    "unicorn/consistent-destructuring": "error",
    // 禁止嵌套三元表达式
    "unicorn/no-nested-ternary": "error",
    // 禁用 export default 规则
    "import/no-default-export": [
      "error",
      {
        ignore: ["**/*.stories.tsx", "*.config.ts", "*.config.js"],
      },
    ],
    "react/no-unknown-property": [
      "error",
      {
        ignore: [
          "p",
          "m",
          "w",
          "h",
          "z",
          "border",
          "grid",
          "flex",
          "bg",
          "text",
          "font",
          "opacity",
          "animate",
          "transition",
          "transform",
          "align",
          "justify",
          "items",
          "block",
          "content",
          "pos",
          "box",
          "overflow",
          "underline",
          "list",
          "gradient",
          "divide",
          "gap",
          "ring",
          "icon",
          "container",
          "space",
          "table",
          "order",
          "place",
          "display",
          "shadow",
          "blend",
          "filter",
          "backdrop",
          "cursor",
          "outline",
          "select",
        ],
      },
    ],
  },
};
