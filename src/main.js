import Vue from "vue";  //默认是指向vue/dist/vue.runtime.js
import compositionApi from "@vue/composition-api"
import App from './App.vue' //用于加载初始界面及通过路由进行跳转
import router from "./router/index.js";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import '@components/SvgIcon.js'


Vue.use(ElementUI);
Vue.use(compositionApi);
Vue.config.productionTip = false;


//默认运行runtime模式，因为vue指向vue/dist/vue.runtime.js,要改变指向，就要改变你引入vue的路径
new Vue({
  router,
  store,
  render: h => h(App) //渲染App.vue模块
}).$mount("#app"); // 此#app跟index.html进行绑定，目的是为了将App的页面渲染到id为app的div中。
