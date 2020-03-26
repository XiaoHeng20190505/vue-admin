<template>
  <div id="SvgIcon">
    <svg :class="svgClass" aria-hidden="true">
      <use :xlink:href="svgName"></use>
    </svg>
  </div>
</template>

<script>
import { reactive, ref, computed} from "@vue/composition-api";
export default {
  name: "SvgIcon",
  props:{
    iconName: {
      type: String,
      default: ''
    },
    iconClass: {
      tyle: String,
      default: ''
    }
  },
  setup(props, context) {
    const svgName = computed(() => {
      return `#icon-${props.iconName}`
    })
    const svgClass = computed(() => {
      if(props.iconClass){
        return `svg-icon ${props.iconClass}`
      }
      else {
        return `svg-icon`
      }
    })
    
    return {
      svgName,
      svgClass
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  color: white;
  margin-right: 10px;
  font-size: 20px;
  &.menuIcon-header {
    fill: black;
    font-size: 25px;
    cursor: pointer;
    margin-bottom: -8px;
  }
}
</style>
