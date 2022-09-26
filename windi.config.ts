import { defineConfig } from "windicss/helpers";

export default defineConfig({
  darkMode: "class",
  alias: {
    full: "w-full h-full",
    "flex-center": "flex justify-center items-center",
  },
  theme: {
    extend: {
      colors: {},
      backgroundImage: {
        login: "linear-gradient(to right, #fbc2eb, #a6c1ee)",
      },
      width: {
        card: "358px",
      },
      height: {
        card: "588px",
      },
      borderRadius: {
        15: "15px",
      },
    },
  },
});
