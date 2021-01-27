import Vue from 'vue'
import VueRouter from 'vue-router'
import RouterConst from "@/const/router.js"
/**
 * 切记：webpackChunkName 最好不要删除，这个是按需加载的名称
 * 
 * */ 
const Login = () =>import(/* webpackChunkName: "login" */ '@/components/login/Index.vue')
const Test1 = () => import(/* webpackChunkName: "test1" */ '@/components/test/index1.vue')
const Test2 = () => import(/* webpackChunkName: "test2" */ '@/components/test/index2.vue')
const Test3 = () => import(/* webpackChunkName: "test3" */ '@/components/test/index3.vue')

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "vv" */ '../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "aboutc" */ '../views/About.vue')
  },
  {
    path:'/login',
    name:RouterConst.Login,
    component:Login
  }
]

const asyncRoutes = [
  {
    path:'/test1',
    name:"test1",
    component:Test1,
    meta:{
      title:"test1",
      roles:["1","2"]
    }
  },
  {
    path:'/test2',
    name:"test2",
    component:Test2,
    meta:{
      title:"test1",
      roles:["1","2"]
    }
  },
  {
    path:'/test3',
    name:"test3",
    component:Test3,
    meta:{
      title:"test1",
      roles:["1"]
    }
  },

]


const router = new VueRouter({
  routes
})
export {asyncRoutes,routes}
export default router
