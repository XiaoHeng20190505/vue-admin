import cookie from "js-cookie"

const userToken = "admin_token"
const usernameToken = "UserName"
/**获取 Token 的值 */
export function getToken() {
	return cookie.get(userToken)
}
/**设置 Token 的值 */
export function setToken(value){
	return cookie.set(userToken, value)
}
/**移除 Token 的值 */
export function removeToken() {
	return cookie.remove(userToken)
}
/**获取 UserName 的值 */
export function getUserNameToken() {
	cookie.get(usernameToken)
}
/**设置 UserName 的值 */
export function setUserName(value) {
	cookie.set(usernameToken, value)
}