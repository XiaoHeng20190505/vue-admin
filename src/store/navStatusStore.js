/**
 * 用于监测导航栏是否折叠的状态变化 
 * */

/**可使用 cookie/sessionStorage/localStorage存放isCollapse使得浏览器记住上次折叠的状态 */
const state = {
	isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false
}
/**添加数据的监听事件，检测数据的变化，可进行处理 */
const getters = {
	isCollapse: state => state.isCollapse
}
/** mutations主要用于修改 state ，理论上是修改 state 的唯一途径，处理同步的操作 */
const mutations = {
	setIsCollapseStatus(state) {
		state.isCollapse = !state.isCollapse
		sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
	}
}
/** actions 主要处理业务代码，异步请求。也可以处理同步：用于界面触发 actions，actions再触发mutations */
const actions = {
	/**
		 * content:第一个默认参数，指向store
		 * data：用户传入的参数
		 *  */
	setMenuStatus(content, data) {
		// console.log(content)//查看 content 的包含内容
		content.commit('setIsCollapseStatus')//调用setIsCollapseStatus方法
	}
}
/**
 * 将此 store 暴露出去
 * namespaced 是在外部调用此 store 的内部方法时要加上此 store 暴露出去的名字,否则无法找到相应的方法.
 * 这样暴露的目的时为了,解决不同 store 之间会有相同的方法名,导致位置是那个 store 中的方法.尽量不同的 store 和方法都使用不同的名字
 */
export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
};