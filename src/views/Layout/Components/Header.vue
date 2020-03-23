<template>
	<div id="header-wrap">头部</div>
</template>
<script>
export default {
	name: 'layoutheader'
	
}
</script>
<style lang="scss" scoped>
#header-wrap {
	position: fixed;
	top: 0;
	right: 0;
	left: $navMenuWidth;
	height: 75px;
	// -webkit-box-shadow: 0 3px 16px 0 rgba(0, 0, 0, .1);
}
</style>