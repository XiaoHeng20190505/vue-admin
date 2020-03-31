/**
 * login页面执行的axios请求，请求资源服务器
 */
import service from '../utils/request'
/**
 * 获取验证码
 */
export function getVcode(data) {
    return service.request({
        method: 'post',
        url: '/getSms/',
        data//当参数等于data时，可将data: data简写为data形式
    })
}
/**
 * 登陆
 */
export function Login(data) {
    return service.request({
        method: 'post',
        url: '/login/',
        data//当参数等于data时，可将data: data简写为data形式
    })
}

/**
 * 注册
 */
export function Register(data) {
    return service.request({
        method: 'post',
        url: '/register/',
        data//当参数等于data时，可将data: data简写为data形式
    })
}