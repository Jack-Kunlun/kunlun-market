/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const react = require("@vitejs/plugin-react").default;
const vitePluginImp = require("vite-plugin-imp").default;
const WindiCSS = require("vite-plugin-windicss").default;

/**
 * 由于vite配置引入的特性，只能使用commonjs规范导出配置
 * 具体可以查看vite的这条issue：https://github.com/vitejs/vite/issues/5370
 * 如果需要做额外配置可以在具体项目下的vite.config.js中进行配置
 * TODO: 目前只做了基础配置，后续可以根据需要进行扩展，比如增加环境变量等
 * TODO: 目前修改vite配置后需要重启服务，后续可以考虑增加热更新
 */
/** @type {import('vite').UserConfig} */
module.exports = {
  // 使用.less是为了方便设置主题色
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
    react(),
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
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve("src/assets"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000/admin",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["react", "antd"], // 注意看这里
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          react: "react",
          antd: "antd",
        },
      },
    },
  },
};
