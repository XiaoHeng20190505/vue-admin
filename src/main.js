import Vue from "vue";
import compositionApi from "@vue/composition-api"
import Login from "./views/Login.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);
Vue.use(compositionApi);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(Login)
}).$mount("#app"); // 此#app跟index.html进行绑定，目的是为了将Login的页面渲染到id为app的div中。
