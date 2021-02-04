import router, { asyncRoutes, routes } from "./router/index"
import constRouter from "@/const/router.js"
import store from "./store/index"
import {isLogin} from "@/utils/user"
const whiteRoutes =["/login"]
router.beforeEach(async (to, from, next) => {
    let loginResult = isLogin()
    
    if (loginResult){
        debugger
        // 代表已经登录
        if (to.path === "/login"){
            // 如果是登录界面直接跳转到首页
            next("/")
        }else{
            console.log("dddddddddddddd:",store.state.router.systemRouters)
            if (store.state.router.systemRouters.length >0){
                // 代表已经添加动态路由
                next()
            }else{
                debugger
                const roles =await store.dispatch('login/getRoles') 
                const accessRouters = await store.dispatch('router/getRouter',roles)
                router.addRoutes(accessRouters)
                next({...to,replace:true})
            }
            // 需要动态路由
        }
    }else {
        debugger
        // 处理尚未登录的情况
        // 判断当前路由是否是白名单路由，如果是白名单，则直接登录
        let isExist = whiteRoutes.includes(to.path)
        if (isExist){
            // 白名单，直接登录
            next()
        }else{
            //不是白名单，说明是权限路由，跳转到登录界面
            next(`/login?redirect=${to.path}`)
        }

    }

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