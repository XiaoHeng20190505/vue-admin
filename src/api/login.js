/**
 * login页面执行的axios请求，请求资源服务器
 */
import service from '../utils/request'
/**
 * 获取验证码
 */
export function getVcode() {
    service.request({
        method: 'post',
        url: '/getSms/',
        data: {
            firstname: 'nelson'
        }
    })
}
/**
 * 登陆
 */

/**
 * 注册
 */