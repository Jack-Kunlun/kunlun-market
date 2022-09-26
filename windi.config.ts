import { defineConfig } from "windicss/helpers";

export default defineConfig({
  darkMode: "class",
  alias: {
    full: "w-full h-full",
    "flex-center": "flex justify-center items-center",
  },
  theme: {
    extend: {
      colors: {
        while: "#fff",
      },
    },
  },
});
