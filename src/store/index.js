import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCollapse: false
  },
  /**添加数据的监听事件，检测数据的变化，可进行处理 */
  getters: {
    isCollapse: state => state.isCollapse
  },
  mutations: {
    setIsCollapseStatus(state) {
      state.isCollapse = !state.isCollapse
    }
  },
  actions: {},
  modules: {}
});
