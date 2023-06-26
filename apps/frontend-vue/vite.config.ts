import path from "path";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
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
