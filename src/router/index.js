import Vue from 'vue'
import VueRouter from 'vue-router'
/**
 * 切记：webpackChunkName 最好不要删除，这个是按需加载的名称
 * */ 
const Table = () =>import(/* webpackChunkName: "Table" */ '@/views/tables/index.vue')
const Login = () =>import(/* webpackChunkName: "Login" */ '@/views/login/index.vue')
const Test1 = () => import(/* webpackChunkName: "test1" */ '@/components/test/index1.vue')
const Test2 = () => import(/* webpackChunkName: "test2" */ '@/components/test/index2.vue')
const Test3 = () => import(/* webpackChunkName: "test3" */ '@/components/test/index3.vue')

// layout
import layout from "@/components/layout/index.vue"

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'home',
    component:layout,
    redirect:"/a",
    meta:{
      title:"首页",
      icon:"home"
    },
    children:[
      {
        path:"a",
        name:"a",
        component:Test1
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
]

const asyncRoutes = [
  {
    path:'/table',
    component:layout,
    name:"table",
    redirect:"/table/index",
    meta:{
      title:"表格",
      icon:"table"
    },
    children:[
      {
        path:"index",
        name:"tableIndex",
        component:Table
      }
    ],
    meta:{
      title:"table",
      icon:"table",
      roles:["1","2"]
    }
  },
  // {
  //   path:'/test1',
  //   name:"test1",
  //   component:Test1,
  //   meta:{
  //     title:"test1",
  //     roles:["1","2"]
  //   }
  // },
  // {
  //   path:'/test2',
  //   name:"test2",
  //   component:Test2,
  //   meta:{
  //     title:"test1",
  //     roles:["1","2"]
  //   }
  // },
  // {
  //   path:'/test3',
  //   name:"test3",
  //   component:Test3,
  //   meta:{
  //     title:"test1",
  //     roles:["1"]
  //   }
  // },

]
const router = new VueRouter({
  routes
})
export {asyncRoutes,routes}
export default router
