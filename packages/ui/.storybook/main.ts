import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
import vitePluginImp from "vite-plugin-imp";
import WindiCSS from "vite-plugin-windicss";

const config: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)", "../**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  viteFinal: async (config, {}) => {
    return mergeConfig(config, {
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
      plugins: [
        WindiCSS(),
        vitePluginImp({
          libList: [
            {
              libName: "antd",
              style: (name) => `antd/es/${name}/style`,
            },
          ],
        }),
      ],
    });
  },
};

export default config;
