import router, { asyncRoutes, routes } from "./router/index"
import constRouter from "@/const/router.js"
import store from "./store/index"
const whiteRoutes =["/login"]
let isLoading = false
let completeLogin = false
router.beforeEach(async (to, from, next) => {
    console.log(to)
    next()
    // if (completeLogin) {
    // } else {
    //     let isExist = whiteRoutes.includes(to.path) 
    //     if (!isExist) {
    //         // 代表可以不用登录就可以访问的,判断是否在白名单上面
    //         next()
    //     } else {
    //         //代表需要登录，登录成功之后跳转到上次点击的界面
    //         next(`/login?redirect=${to.path}`)
    //     }
    // }


    // const isLogin = await store.dispatch('user/isLogin')
    // if (isLogin){
    //     // 去判断权限
    //     if(!isLoading ){
    //         const roles =await store.dispatch('test/getRoles')
    //         const accessRouters = await store.dispatch('test/getRouter',roles)
    //         isLoading = true 
    //         router.addRoutes(accessRouters)
    //         next({...to,replace:true})

    //     }else{
    //         next()
    //     }
    // }else{
    //    if (whiteRoutes.includes(to.path) !=-1) {
    //     // 代表可以不用登录就可以访问的
    //     next()
    //    }else{
    //     //代表需要登录，登录成功之后跳转到上次点击的界面
    //     next(`/${constRouter}?redirect=${to.path}`)
    //    }
    // }
})