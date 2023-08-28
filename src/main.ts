import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import store from "./store";
import "@/plugins/axios";
import "@/access/index";
import ArcoVueIcon from "@arco-design/web-vue/es/icon";
import "bytemd/dist/index.css";
import "katex/dist/katex.css";
import "highlight.js/styles/atom-one-dark-reasonable.css";
import "gemoji";

createApp(App)
  .use(store)
  .use(router)
  .use(ArcoVue)
  .use(ArcoVueIcon)
  .mount("#app");
