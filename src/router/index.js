import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);
// 设置进行路由的跳转
const routes = [
  {
    path: "/",
    redirect: "/login" // 重定向页面
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: "/console",
    name: "Console",
    component: () => import("../views/Console/Console.vue")
  }
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  routes
});

export default router;
