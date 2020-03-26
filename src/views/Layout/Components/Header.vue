<template>
	<div id="header-wrap">
		<div class="pull-left icon-header" @click="changeNavStatus"><svgicon iconName="menuIcon" iconClass="menuIcon-header" ></svgicon></div>
		<div class="pull-right flexbox">
			<div class="user-info">
				<div class="head-img pull-left"><img src="../../../sources/img/headImg.jpg" alt="头像" height="50px" width="50px"></div>
				管理员
			</div>
			<div class="exitIcon"><svgicon iconName="exitIcon" iconClass="menuIcon-header"></svgicon></div>
		</div>
	</div>
</template>
<script>
import { reactive, ref, toRefs, isRef, computed } from "@vue/composition-api";
export default {
	name: 'layoutheader',
	setup(props, { root }) {
		/**声明使用变量 */
		// const navMenuStatus = ref(false)
		/**声明使用函数 */
		const changeNavStatus = () => {
			/**调用 store 中的函数 ，触发更新信息*/
			root.$store.commit('setIsCollapseStatus')
		}
		return {
			changeNavStatus
		}
		
	}
	
}
</script>
<style lang="scss" scoped>
/**头部主样式 */
#header-wrap {
	position: fixed;
	top: 0;
	right: 0;
	left: $navMenuWidth;
	height: 75px;
	@include webkit(box-shadow, 0 3px 16px 0 rgba(0, 0, 0, .1));
	@include webkit(transition, $animations);
	line-height: 75px;
}
/**定义导航栏折叠后，头部的样式 */
.open {
	#header-wrap {
		left: $navMenuWidth;
	}
}
.close {
	#header-wrap {
		left: $navMenuMinWidth;
	}
}
/**头部菜单栏 */
.icon-header {
	padding: 0 32px;
	margin-bottom: -8px;
}
/**头部用户信息 */
.user-info {
	padding: 0 32px;
	display: flex;
	align-items: center;
	border-right: 1px solid #dedede;
	.head-img {
		overflow: hidden;
		height: 50px;
		widows: 50px;
		border-radius: 50%;
		margin-right: 20px;
	}
}
/**头部登出 */
.exitIcon {
	padding: 0 28px;
	display: inline-block;
}
</style>