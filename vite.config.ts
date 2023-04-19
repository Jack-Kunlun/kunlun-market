import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import vitePluginImp from "vite-plugin-imp";
import WindiCSS from "vite-plugin-windicss";

// eslint-disable-next-line import/no-default-export
export default defineConfig({
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
  cacheDir: ".vite",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve("src/assets"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
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
});
