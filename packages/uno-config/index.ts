import { UserConfig, presetAttributify, presetIcons, presetTypography, presetUno } from "unocss";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const unocssConfig: UserConfig<any> = {
  theme: {
    colors: {
      white: "#fff",
      grey: "#d9d9d9",
      gradientPink: "linear-gradient(to right, #fbc2eb, #a6c1ee)",
      gradientViolet: "linear-gradient(to right, #a6c1ee, #fbc2eb)",
    },
    fontSize: {
      sm: "12px",
      base: "14px",
      md: "16px",
      lg: "24px",
      xl: "32px",
      xxl: "40px",
    },
    padding: {
      smm: "4px",
      sm: "8px",
      md: "16px",
      lg: "24px",
      xl: "32px",
      xxl: "40px",
    },
    margin: {
      smm: "4px",
      sm: "8px",
      md: "16px",
      lg: "24px",
      xl: "32px",
      xxl: "40px",
    },
    borderRadius: {
      smm: "4px",
      sm: "8px",
      md: "16px",
      lg: "24px",
      xl: "32px",
      xxl: "40px",
    },
  },
  /**
   * Unocss 默认使用 rem 单位来处理尺寸值，而不是像素单位。这样做的好处是可以根据根元素的字体大小来调整尺寸值，从而实现响应式布局。
   * 如果要使用px，可以直接这样使用：m-10px，mx-16px
   * 或者在theme中配置, 然后在这里使用
   */
  rules: [
    /**
     * margin
     */
    [
      /^m-(.*)$/,
      ([, c], { theme }) => {
        if (theme.margin[c]) {
          return { margin: theme.margin[c] };
        }
      },
    ],
    [
      /^m(l|t|r|b|x|y)-(.*)$/,
      ([, prefix, c], { theme }) => {
        if (theme.margin[c]) {
          switch (prefix) {
            case "l":
              return { "margin-left": theme.margin[c] };
            case "t":
              return { "margin-top": theme.margin[c] };
            case "r":
              return { "margin-right": theme.margin[c] };
            case "b":
              return { "margin-bottom": theme.margin[c] };
            case "x":
              return { "margin-left": "12px", "margin-right": theme.margin[c] };
            case "y":
              return { "margin-top": theme.margin[c], "margin-bottom": theme.margin[c] };
            default:
              break;
          }
        }
      },
    ],
    /**
     * padding
     */
    [
      /^p-(.*)$/,
      ([, c], { theme }) => {
        if (theme.margin[c]) {
          return { padding: theme.margin[c] };
        }
      },
    ],
    [
      /^p(l|t|r|b|x|y)-(.*)$/,
      ([, prefix, c], { theme }) => {
        if (theme.padding[c]) {
          switch (prefix) {
            case "l":
              return { "padding-left": theme.padding[c] };
            case "t":
              return { "padding-top": theme.padding[c] };
            case "r":
              return { "padding-right": theme.padding[c] };
            case "b":
              return { "padding-bottom": theme.padding[c] };
            case "x":
              return { "padding-left": theme.padding[c], "padding-right": theme.padding[c] };
            case "y":
              return { "padding-top": theme.padding[c], "paddingB-bottom": theme.padding[c] };
            default:
              break;
          }
        }
      },
    ],
    /**
     * height
     */
    ["h-full", { height: "100%" }],
    ["h-card", { height: "480px" }],
    [/^h-(\d+)$/, ([, d]) => ({ height: `${d}px` }), { autocomplete: "h-<num>" }],
    /**
     * width
     */
    ["w-full", { width: "100%" }],
    ["w-card", { width: "480px" }],
    [/^w-(\d+)$/, ([, d]) => ({ width: `${d}px` }), { autocomplete: "w-<num>" }],
    /**
     * background
     */
    [
      /^bg-(.*)$/,
      ([, c], { theme }) => {
        if (theme.colors[c]) {
          return { background: theme.colors[c] };
        }
      },
    ],
    /**
     * text
     */
    [
      /^text-(.*)$/,
      ([, c], { theme }) => {
        if (theme.colors[c]) {
          return { color: theme.colors[c] };
        }

        if (theme.fontSize[c]) {
          return { "font-size": theme.fontSize[c] };
        }
      },
    ],
    // rounded
    [
      /^rounded-(.*)$/,
      ([, c], { theme }) => {
        if (theme.borderRadius[c]) {
          return { "border-radius": theme.colors[c] };
        }
      },
    ],
  ],
  /**
   * 使用预设
   */
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
      },
    }),
    presetTypography(),
  ],
  shortcuts: [
    {
      full: "w-full h-full",
      "flex-center": "flex justify-center items-center",
    },
  ],
  /**
   * 注入原始 css
   */
  preflights: [
    {
      getCSS: () => {
        return `
          #root,#app {
            padding: 0;
            margin: 0;
            height: 100%;
            width: 100%;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            -webkit-text-size-adjust: 100%;
          }
        `;
      },
    },
  ],
};
