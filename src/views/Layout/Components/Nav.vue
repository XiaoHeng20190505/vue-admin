<template>
  <div id="nav-wrap" :class="[navMenuStatus ? 'close' : 'open']">
    <div class="flexbox">
      <img src="../../../sources/img/headImg.jpg" alt="图片" :height="imgHeight" :width="imgWidth">
    </div>
    <el-menu
      background-color="transparent"
      text-color="white"
      :collapse="navMenuStatus"
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
import { reactive, ref, toRefs, isRef, computed } from "@vue/composition-api";
export default {
  name: "layoutnav",
  setup(props, { root }) {
    /**定义变量 */
    const imgHeight = ref('200px')
    const imgWidth = ref('200px')
    const routes = reactive(root.$router.options.routes);
    /**添加数据监听 */
		const navMenuStatus = computed(() => {
      if(root.$store.state.isCollapse){
        imgHeight.value = '50px'
        imgWidth.value = '50px'
      }else{
        imgHeight.value = '200px'
        imgWidth.value = '200px'
      }
			return root.$store.state.isCollapse
		})

    /**数据 return 出去才能获取使用 */
    return {
      imgHeight,
      imgWidth,
      navMenuStatus,
      routes
    };
  }
};
</script>
<style lang="scss" scoped>
#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background-color: #344a5f;
  @include webkit(transition, $animations);
}
/**控制左侧导航栏的扩展与折叠 */
.open {
  width: $navMenuWidth;
}
.close {
  width: 64px;
}
#SvgIcon {
  display: inline-block;
}
.flexbox {
  align-items: center;;
}
img {
  border-radius: 50%;
  margin: 10px auto;
  @include webkit(transition, $animations);
}
.el-menu {
  border: none;
}
</style>