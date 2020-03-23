<template>
	<div id="main-wrap">
		<router-view />
	</div>
</template>
<script>
export default {
	name: 'layoutmain'
}
</script>
<style lang="scss" scoped>
@import '../../../styles/config.scss';
#main-wrap {
	position: fixed;
	top: 75px;
	left: $navMenuWidth;
	right: 0px;
	bottom: 0px;
	border: 30px solid #f7f7f7;
}
</style>