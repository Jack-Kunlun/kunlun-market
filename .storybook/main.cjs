const path = require("path");
const vitePluginImp = require("vite-plugin-imp");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions"],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-vite",
  },
  features: {
    storyStoreV7: true,
  },
  async viteFinal(config, { configType: env }) {
    // customize the Vite config here
    const customConfig = {
      css: {
        preprocessorOptions: {
          less: {
            javascriptEnabled: true,
          },
          modifyVars: {
            // 在这里自定义主题色等样式
          },
        },
      },
      resolve: {
        alias: {
          "@": path.resolve("src"),
          "@assets": path.resolve("src/assets"),
        },
      },
      esbuild: {
        jsxInject: `import React from 'react'`,
      },
    };

    config.plugins.push(
      vitePluginImp({
        libList: [
          {
            libName: "antd",
            style: (name) => `antd/es/${name}/style`,
          },
        ],
      })
    );
    // return the customized config
    return { ...config, ...customConfig };
  },
};
