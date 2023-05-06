import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      include: ["./**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
      environment: "jsdom",
      coverage: {
        reporter: ["text", "json", "html"],
      },
      reporters: "verbose",
      setupFiles: "./RTLInVitest.setup.ts",
    },
  })
);
