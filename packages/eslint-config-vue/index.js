module.exports = {
  root: true,
  env: { node: true },
  globals: {
    defineEmits: "readonly",
    defineProps: "readonly",
  },
  extends: ["common", "plugin:vue/vue3-recommended", "@vue/prettier"],
  overrides: [
    {
      files: ["*.config.{ts,js}"],
      rules: {
        "import/no-default-export": "off",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    // 在<template>中强制一致缩进
    "vue/html-indent": ["error", 2],
    "vue/html-self-closing": "off",
    // 执行自闭合的风格
    "vue/max-attributes-per-line": [
      "warn",
      {
        singleline: 3,
        multiline: 1,
      },
    ],
    // 要求单行元素的内容前后有一个换行符
    "vue/singleline-html-element-content-newline": "off",
  },
};
