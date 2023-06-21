import { mergeConfig, defineConfig } from "vite";
import type { ConfigEnv, UserConfig } from "vite";
import viteConfig from "vite-config";

export default defineConfig((env: ConfigEnv) => {
  // eslint-disable-next-line no-console
  console.log(env);

  return mergeConfig(viteConfig, {
    server: {
      port: 5173,
      proxy: {
        "/api": {
          target: "http://localhost:3000",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  } as UserConfig);
});
