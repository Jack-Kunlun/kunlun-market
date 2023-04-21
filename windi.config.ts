import { defineConfig } from "windicss/helpers";
import { safelist, plugins } from "./config/windicss";

export default defineConfig({
  darkMode: "class",
  alias: {
    full: "w-full h-full",
    "flex-center": "flex justify-center items-center",
  },
  // 开启属性化模式
  attributify: true,
  safelist,
  plugins,
  shortcuts: {},
  theme: {
    extend: {
      colors: {
        white: "#fff",
        grey: "#d9d9d9",
      },
      fontSize: {
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "48px",
        38: "38px",
      },
      backgroundImage: {
        gradientPink: "linear-gradient(to right, #fbc2eb, #a6c1ee)",
        gradientViolet: "linear-gradient(to right, #a6c1ee, #fbc2eb)",
      },
      width: {
        card: "500px",
      },
      height: {
        sm: "24px",
        md: "32px",
        lg: "40px",
        200: "200px",
        card: "500px",
      },
      borderRadius: {
        smm: "4px",
        sm: "16px",
        md: "24px",
        lg: "32px",
        xl: "48px",
        50: "50%",
      },
      padding: {
        smm: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "48px",
      },
      margin: {
        smm: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "48px",
      },
    },
  },
});
