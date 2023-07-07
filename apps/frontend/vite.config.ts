import path from "path";
import vue from "@vitejs/plugin-vue";
import UnoCSS from "unocss/vite";
// import AutoImport from "unplugin-auto-import/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";
import vitePluginImp from "vite-plugin-imp";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    UnoCSS(),
    vue(),
    /**
     * 自动引入vue、vue-router、components等，生成d.ts文件，方便代码提示
     * 已移除unplugin-auto-import插件，如果需要使用请重新安装
     * yarn add unplugin-auto-import
     */
    // AutoImport({
    //   //安装两行后你会发现在组件中不用再导入ref，reactive等
    //   imports: ["vue", "vue-router"],
    //   dts: "types/auto-import.d.ts",
    //   //ant-design-vue
    //   resolvers: [AntDesignVueResolver()],
    //   eslintrc: {
    //     // 1、改为true用于生成eslint配置。2、生成后改回false，避免重复生成消耗
    //     enabled: false,
    //   },
    // }),
    /**
     * 配置ant-design-vue按需引入，并生成d.ts文件，方便代码提示
     */
    Components({
      /**
       * ant-design-vue按需引入
       * importStyle = false 样式就没了
       * 无法处理非组件模块问题，如 message等
       */
      resolvers: [AntDesignVueResolver({ importStyle: true, resolveIcons: true })],
      dts: "types/components.d.ts",
    }),
    /**
     * 使用vite-plugin-imp解决unplugin-vue-components此插件无法处理非组件模块问题，如 message等。
     */
    vitePluginImp({
      libList: [
        {
          libName: "ant-design-vue",
          style: (name) => `ant-design-vue/es/${name}/style/css`,
        },
      ],
    }),
  ],
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
  server: {
    port: 5178,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
