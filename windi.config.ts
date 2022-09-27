import { defineConfig } from "windicss/helpers";
import plugin from "windicss/plugin";
import { safelist } from "./config/windicss";

export default defineConfig({
  darkMode: "class",
  alias: {
    full: "w-full h-full",
    "flex-center": "flex justify-center items-center",
  },
  attributify: true,
  safelist,
  shortcuts: {},
  theme: {
    extend: {
      colors: {},
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
        card: "400px",
      },
      height: {
        sm: "32px",
        md: "40px",
        lg: "48px",
        card: "600px",
      },
      borderRadius: {
        smm: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "48px",
      },
      padding: {
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "48px",
      },
    },
  },
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        ".btn": {
          padding: "4px 16px",
          minWidth: "50px",
          textAlign: "center",
          fontSize: "14px",
          borderRadius: "2px",
          cursor: "pointer",
          transition: "all .3s",
        },
        ".btn-default": {
          background: "#fff",
          color: "#000",
          border: "1px solid transparent",
          boxShadow: "0 2px #00000004",
          borderColor: "#d9d9d9",
          "&:hover": {
            color: "#40a9ff",
            borderColor: "#1890ff",
            background: "#fff",
          },
        },
        ".btn-text": {
          backgroundColor: "transparent",
          color: "#000",
          "&:hover": {
            color: "#000000d9",
            background: "rgba(0,0,0,.018)",
            borderColor: "transparent",
          },
        },
      });
    }),
  ],
});
