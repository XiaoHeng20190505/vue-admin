import Vue from 'vue'
import SvgIcon from '@components/SvgIcon.vue'

Vue.component('svgicon',SvgIcon)  //注册全局组件


// 解析svg文件

// require.context(‘../sources/icon’, false, /\.svg$/) 
//参数说明：
// 第一个：目录
// 第二个：是否遍历子级目录
// 第三个：定义遍历文件规则
/**
 * @param {String} 第一个参数：目录
 * @param {Boolean} 第二个参数：是否遍历子级目录
 * @param {String} 第三个参数：定义遍历文件规则
 */
const req = require.context('../sources/icon', false, /\.svg$/)
const requireAll = requireContext => {
	console.log(' requireContext ')
	console.log( requireContext )
	console.log(requireContext.keys().map(requireContext))
  return requireContext.keys().map(requireContext)
}
requireAll(req)
