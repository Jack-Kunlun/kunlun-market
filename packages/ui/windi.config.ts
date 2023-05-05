import { safelist, plugins, attributify, shortcuts, alias, themeExtend } from "windi-config";
import { defineConfig } from "windicss/helpers";

export default defineConfig({
  darkMode: "class",
  alias: {
    ...alias,
  },
  // 开启属性化模式
  attributify,
  safelist,
  plugins,
  shortcuts: {
    ...shortcuts,
  },
  theme: {
    extend: {
      ...themeExtend,
    },
  },
});
