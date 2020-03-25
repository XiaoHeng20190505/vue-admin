import Vue from "vue";
import VueRouter from "vue-router";
// 引入布局组件
import Layout from "../views/Layout/Layout.vue";//对路由的优化，将路由指向Layout.vue的提取出来

Vue.use(VueRouter);
// 设置进行路由的跳转
const routes = [
  {
    path: "/",
    redirect: "/login", // 重定向页面
    hidden: true,
    meta: {
      name: '主页'
    }
  },
  /**登录页路由 */
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    meta: {
      name: '登录'
    },
    component: () => import('../views/Login.vue')
  },
  /**控制台路由 */
  {
    path: "/console",
    hidden: false,
    name: "Console",
    meta: {
      name: '控制台',
      icon: 'consoleIcon'
    },
    redirect: '/consoleIndex',  // 重定路由到主要页面的路由
    // component: () => import("../views/Console/Console.vue"),
    component: Layout,
    children: [
      {
        path: "/consoleIndex",
        name: "ConsoleIndex",
        meta: {
          name: '控制台首页'
        },
        // component: () => import("../views/Console/Console.vue")
        component: () => import("../views/Console/Console.vue")
      }
    ]
  },
  /**信息路由 */
  {
    path: "/info",
    name: "Info",
    hidden: false,
    meta: {
      name: '信息',
      icon: 'infoIcon'
    },
    // redirect: '/infoList',  // 重定路由到主要页面的路由
    // component: () => import("../views/Console/Console.vue")
    component: Layout,
    children: [
      {
        path: "/infoList",
        name: "InfoList",
        meta: {
          name: '信息列表'
        },
        // component: () => import("../views/Console/Console.vue")
        component: () => import("../views/News/InfoList.vue")
      },
      {
        path: "/infoCategory",
        name: "InfoCategory",
        meta: {
          name: '信息分类'
        },
        // component: () => import("../views/Console/Console.vue")
        component: () => import("../views/News/InfoCatagory.vue")
      }
    ]
  },
  /**用户路由 */
  {
    path: "/user",
    name: "User",
    hidden: false,
    meta: {
      name: '用户',
      icon: 'userIcon'
    },
    // redirect: '/userList',  // 重定路由到主要页面的路由
    component: Layout,
    children: [
      {
        path: "/userList",
        name: "UserList",
        meta: {
          name: '用户列表'
        },
        // component: () => import("../views/Console/Console.vue")
        component: () => import("../views/User/UserList.vue")
      },
      {
        path: "/userManager",
        name: "UserManager",
        meta: {
          name: '用户管理'
        },
        // component: () => import("../views/Console/Console.vue")
        component: () => import("../views/User/UserManager.vue")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
