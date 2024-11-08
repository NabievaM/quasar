import { createSSRApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router/index.js";
import { Quasar } from "quasar";
import "quasar/src/css/index.sass";
import "./css/tailwind.css";

export function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia();

  app.use(pinia);
  app.use(router);
  app.use(Quasar);

  return { app, pinia, router };
}
