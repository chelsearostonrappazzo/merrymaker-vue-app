import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueSelectImage from "vue-select-image";
require("vue-select-image/dist/vue-select-image.css");
import VueClipboard from "vue-clipboard2";
import { EmojiPickerPlugin } from "vue-emoji-picker";
import VueSimpleAlert from "vue-simple-alert";

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";

axios.defaults.baseURL = process.env.NODE_ENV === "production" ? "https://desolate-brook-47135.herokuapp.com" : "/";


var jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
}

Vue.use(VueSelectImage);
Vue.use(VueClipboard);
Vue.use(EmojiPickerPlugin);
Vue.use(VueSimpleAlert);
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
