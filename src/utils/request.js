/**
 * 拦截器，所有使用axios进行请求的都会执行此拦截器
 */

// 引入axios依赖包
import axios from 'axios'

const BASEURL = process.env.NODE_ENV === 'production' ? ''  : '/devapi'
console.log(process.env.NODE_ENV)
console.log(BASEURL)
// 初始化axios实例，之后使用axios时都用service调用
const service = axios.create({
    baseURL: BASEURL,//初始化axios的时候指定访问的资源服务器。
    //是在访问的接口之前加了一个前缀，比如本来要访问/getSms,但是加了一个前缀就变成了访问/devapi/getSms
    timeout: 1000
})
console.dir(service)

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

export default service  //将拦截器实例暴露出去，让页面可以引入调用，引入时不需要加大括号{}将service括起来
//如果没有default，则在引入时必须将service用大括号{}包裹起来
