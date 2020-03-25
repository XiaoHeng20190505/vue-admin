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
      // require: true,
      default: ''
    },
    iconClass: {
      tyle: String,
      // require: true,
      default: ''
    }
  },
  setup(props, context) {
    // const msg = ref('我是SvgIcon组件,图片内容')
    console.log('props')
    console.log(props)
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
    console.log(svgName.value)
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
}
  // color: #fff !important;

</style>
