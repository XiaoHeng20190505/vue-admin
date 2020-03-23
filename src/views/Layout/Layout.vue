<template>
  <div id="layout-wrap">
    <layoutheader />
    <layoutnav />
    <layoutmain />
  </div>
</template>
<script>
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
  setup() {}
};
</script>
<style lang="scss" scoped>
</style>