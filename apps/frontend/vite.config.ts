import path from "path";
import vue from "@vitejs/plugin-vue";
import UnoCSS from "unocss/vite";
import AutoImport from "unplugin-auto-import/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    UnoCSS(),
    vue(),
    /**
     * 自动引入vue、vue-router、components等，生成d.ts文件，方便代码提示
     */
    AutoImport({
      //安装两行后你会发现在组件中不用再导入ref，reactive等
      imports: ["vue", "vue-router"],
      dts: "types/auto-import.d.ts",
      //ant-design-vue
      resolvers: [AntDesignVueResolver()],
      eslintrc: {
        // 1、改为true用于生成eslint配置。2、生成后改回false，避免重复生成消耗
        enabled: false,
      },
    }),
    /**
     * 配置ant-design-vue按需引入，并生成d.ts文件，方便代码提示
     */
    Components({
      // ant-design-vue   importStyle = false 样式就没了
      resolvers: [AntDesignVueResolver({ importStyle: true, resolveIcons: true })],
      dts: "types/components.d.ts",
    }),
  ],
  css: {},
  resolve: {
    alias: {
      "@": path.resolve("src"),
      "@assets": path.resolve("src/assets"),
    },
  },
  server: {
    port: 5178,
  },
});
