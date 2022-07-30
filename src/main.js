import { createApp } from "vue";
import "./assets/scss/index.scss";
import App from "./App.vue";
import router from "./router";
import "@/assets/scss/vendors/_icon.scss";

createApp(App).use(router).mount("#app");
