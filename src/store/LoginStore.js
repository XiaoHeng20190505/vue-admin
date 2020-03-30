import  { getVcode, Register, Login }  from '../api/login'
const loginStore = {
	state: {},

	/**添加数据的监听事件，检测数据的变化，可进行处理 */
	getters: {},

	/** mutations主要用于修改 state ，理论上是修改 state 的唯一途径，处理同步的操作 */
	mutations: {},

	/** actions 主要处理业务代码，异步请求。也可以处理同步：用于界面触发 actions，actions再触发mutations */
	actions: {
		storeLogin(content, data) {
			return new Promise((resolve, reject) => {
				// 接口
				Login(data).then(Response => {
					resolve(Response)
				}).catch(error => {
					reject(error)
				})
			})
			
		}
	}
}

export default loginStore
