/**
 * 路由守卫,在路由跳转之前检查Token等信息是否存在,防止非法登入
 */
import router from "./index"	//导入路由跳转
import { getToken } from "../utils/appToken"
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
const whiteRouteList = ['/login']	//设置路由白名单

router.beforeEach((to, from, next) => {
	if(getToken()){	//Token不存在则报错
		alert("Token信息存在")
	}else{
		if(whiteRouteList.indexOf(to.path) === -1){	//Token存在,但目标路由不在白名单中,则跳转回login页面
			next('/login')	//当路由发生改变时,会再次触发 beforeEach 路由守卫的检查.
		}else{	//Token存在,但目标路由在报名单中,则跳转路由
			next()		//没有参数,路由没有改变,不会触发 beforeEach 路由守卫的检查.
		}
	}
})