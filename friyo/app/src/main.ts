import { createApp } from "vue";
import "./bootstrap";
import router from "./router";
import App from "./App.vue";

import "./sass/app.scss";
import { BootstrapIconsPlugin } from "bootstrap-icons-vue";
import { createPinia } from "pinia";

createApp(App)
  .use(BootstrapIconsPlugin)
  .use(createPinia())
  .use(router)
  .mount("#app");
