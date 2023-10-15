import { createApp } from "vue";

import App from "./App.vue";
import store from "./store/index.js";
import router from "./router.js";
import BaseCard from "./components/ui/BaseCard.vue";
import BaseButton from "./components/ui/BaseButton.vue";
import clickOutside from "vue-click-outside";

const app = createApp( App );

if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify([]));
}




app.use(router);
app.use(store);
app.config.globalProperties.$http = () => {};
app.directive("click-outside", clickOutside);

app.component("base-card", BaseCard);
app.component("base-button", BaseButton);

app.mount("#app");
