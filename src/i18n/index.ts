import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import zhCN from "./locale/zhCN.json";

const resources = {
  zhCN: {
    translation: zhCN,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "zhCN",
  interpolation: {
    escapeValue: false,
  },
});
