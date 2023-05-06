import plugin from "windicss/plugin";

export const btn = plugin(({ addComponents }) => {
  addComponents({
    ".btn": {
      padding: "0 16px",
      minWidth: "40px",
      textAlign: "center",
      fontSize: "14px",
      cursor: "pointer",
      transition: "all .3s",
      whiteSpace: "nowrap",
      display: "inline-block",
      position: "relative",
      border: "1px solid transparent",
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
    ".btn-primary": {
      background: "#1890ff",
      color: "#fff",
      textShadow: "0 -1px 0 rgb(0 0 0 / 12%)",
      boxShadow: "0 2px #0000000b",
      "&:hover": {
        color: "#fff",
        background: "#40a9ff",
        borderColor: "#40a9ff",
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
});
