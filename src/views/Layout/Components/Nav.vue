<template>
  <div id="nav-wrap">
    <el-menu
      @open="handleOpen"
      @close="handleClose"
      background-color="transparent"
      text-color="white"
      :collapse="isCollapse"
      router
    >
      <template v-for="(item, index) in routes">
        <!-- 因为index不允许为数字，所以技巧将index+空字符串转换为字符串形式 -->
        <el-submenu v-if="!item.hidden" :key="item.id" :index="index+''">
          <!-- 一级菜单 -->
          <template slot="title">
            <!-- 第一种图标的设定可使用element-ui的图标，第二种会使用自定义矢量图标，选用阿里矢量图标库，使用svg -->
            <!-- <i class="el-icon-location"></i> -->
            <svgicon :iconName="item.meta.icon" :iconClass="item.meta.icon"></svgicon>
            <span slot="title">{{ item.meta.name }}</span>
          </template>
          <!-- 子菜单 -->
          <el-menu-item v-for="subitem in item.children" :key="subitem.id" :index="subitem.path">{{ subitem.meta.name }}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
   
  </div>
</template>
<script>
import { reactive, ref, toRefs, isRef } from "@vue/composition-api";
export default {
  name: "layoutnav",
  setup(props, { root }) {
    /**
     * 定义变量
     */
    const isCollapse = ref(false);

    const routes = reactive(root.$router.options.routes);
    //   console.log(routes)

    /**定义处理函数 */
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };

    /**数据 return 出去才能获取使用 */
    return {
      isCollapse,
      routes,
      handleOpen,
      handleClose
    };
  }
};
</script>
<style lang="scss" scoped>
#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: $navMenuWidth;
  height: 100vh;
  background-color: #344a5f;
}
#SvgIcon {
  display: inline-block;
}
</style>