import Vue from "vue";
import Vuex from "vuex";

import navStatusStore from './navStatusStore.js'
import loginStore from './LoginStore.js'

Vue.use(Vuex);
/**设置一个 store 的输出口 */
export default new Vuex.Store({
  modules: {
    navStatusStore,
    loginStore
  }
});
