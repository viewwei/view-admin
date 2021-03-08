import Vue from 'vue'
import VueRouter from 'vue-router'

// layout
import layout from '@/components/layout/index.vue'
/**
 * 切记：webpackChunkName 最好不要删除，这个是按需加载的名称
 * */
const Table = () => import(/* webpackChunkName: "Table" */ '@/views/tables/index.vue')
const Login = () => import(/* webpackChunkName: "Login" */ '@/views/login/index.vue')
const Test1 = () => import(/* webpackChunkName: "test1" */ '@/components/test/index1.vue')
const Test2 = () => import(/* webpackChunkName: "test2" */ '@/components/test/index2.vue')
const Test3 = () => import(/* webpackChunkName: "test3" */ '@/components/test/index3.vue')
const twaver = () => import('@/views/twaver/index')
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'home',
    component: layout,
    redirect: '/a',
    meta: {
      title: '首页',
      icon: 'home'
    },
    children: [
      {
        path: '/a',
        name: 'a',
        component: Test1
      }
    ]
  },
  {
    path: "/test2",
    name: "test2",
    component: layout,
    redirect: '/test2/a',
    children: [
      {
        path: '/test2/a',
        name: 'test2',
        component: Test2
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const asyncRoutes = [
  {
    path: '/table',
    component: layout,
    name: 'table',
    redirect: '/table/index',
    meta: {
      title: '业务代码',
      icon: 'table'
    },
    children: [
      {
        path: '/table/index',
        name: 'tableIndex',
        component: Table,
        meta: {
          title: 'table',
          icon: 'table',
          roles: ['1', '2']
        }
      },
      {
        path: '/table/twaver',
        name: 'twaver',
        component: twaver,
        meta: {
          title: 'twaver',
          icon: 'table',
          roles: ['1', '2']
        }
      }
    ],
  }
]
// const router = new VueRouter({
//   routes
// })
const createRouter = () => new VueRouter({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: routes
})
const router = createRouter()
// 重置路由需要在权限变化和登出的时候出现
const resetRouter = () => {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export { asyncRoutes, routes, resetRouter }
export default router
