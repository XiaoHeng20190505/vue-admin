import  { Login }  from '../api/login'
import { getToken, getUserNameToken, setToken, setUserName } from '../utils/appToken'

const state = {
	userToken: getToken() || '',
	userName: getUserNameToken() || ''
}
const getters = {
	userToken: state => state.userToken,
	userName: state => state.userName
}
const mutations = {}
const actions = {
	storeLogin(content, data) {
		return new Promise((resolve, reject) => {
			// 接口
			Login(data).then(Response => {
				let  data = Response.data.data
				content.state.userToken = data.token
				content.state.userName = data.username
				setToken(content.state.userToken)
				setUserName(content.state.userName)
				resolve(Response)
			}).catch(error => {
				reject(error)
			})
		})
	}
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}
