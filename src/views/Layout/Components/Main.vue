<template>
	<div id="main-wrap">
		<router-view />
	</div>
</template>
<script>
export default {
	name: 'layoutmain',
}
</script>
<style lang="scss" scoped>
#main-wrap {
	position: fixed;
	top: 75px;
	left: $navMenuWidth;
	right: 0px;
	bottom: 0px;
	border-bottom: 0;
	@include webkit(border, 30px solid #f7f7f7);
	@include webkit(padding, 20px 0 0 20px);
	@include webkit(transition, $animations)
}
/**定义导航栏折叠后，头部的样式 */
.open {
	#main-wrap {
		left: $navMenuWidth;
	}
}
.close {
	#main-wrap {
		left: $navMenuMinWidth;
	}
}
</style>