<template>
  <div id="layout-wrap" :class="[navMenuStatus ? 'close' : 'open']">
    <layoutheader />
    <layoutnav />
    <layoutmain />
  </div>
</template>
<script>
import { computed } from "@vue/composition-api";
// 引入页面布局
import layoutheader from "./Components/Header";
import layoutnav from "./Components/Nav";
import layoutmain from "./Components/Main";
export default {
  name: "layout",
  components: {
    //注册组件
    layoutheader,
    layoutnav,
    layoutmain
  },
  setup(props, { root }) {
    /**添加数据监听 */
		const navMenuStatus = computed(() => {
			return root.$store.state.navStatusStore.isCollapse
    })
    return {
      navMenuStatus
    }
  }
};
</script>
<style lang="scss" scoped>
</style>