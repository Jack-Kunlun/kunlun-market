import { mergeConfig, defineConfig } from "vite";
import type { ConfigEnv } from "vite";
import viteConfig from "vite-config";

export default defineConfig((env: ConfigEnv) => {
  // eslint-disable-next-line no-console
  console.log(env);

  return mergeConfig(viteConfig, {});
});
