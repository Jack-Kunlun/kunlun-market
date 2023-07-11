import { createApp } from "vue";
import App from "./App.vue";
import { pinia } from "./pinia";
import { router } from "./router";
import "./style.css";
import "virtual:uno.css";
import "@unocss/reset/normalize.css";

const app = createApp(App);

app.use(pinia);

app.use(router);

app.mount("#app");
