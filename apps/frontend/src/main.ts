import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import "./style.css";
import "virtual:uno.css";
import "@unocss/reset/normalize.css";

const app = createApp(App);

const pinia = createPinia();

/**
 * pinia数据持久化
 */
pinia.use(piniaPluginPersistedstate);

app.use(router);
app.use(pinia);
app.mount("#app");
