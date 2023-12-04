module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-react`
  extends: ["react"],
  overrides: [
    {
      files: ["src/pages/**/index.{jsx,tsx}"],
      rules: {
        "import/no-default-export": "off",
      },
    },
    {
      files: ["src/components/**/*.{jsx,tsx,ts,js}"],
      rules: {
        "import/no-default-export": "off",
      },
    },
    {
      files: ["src/pages/**/{components,component}/*.{ts,js,jsx,tsx}"],
      rules: {
        "import/no-default-export": "error",
      },
    },
  ],
};
