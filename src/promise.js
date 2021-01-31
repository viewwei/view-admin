import router,{asyncRoutes,routes} from "./router/index"
import constRouter from "@/const/router.js"
import store from "./store/index"
const whiteRoutes =  routes.reduce((target,value)=>{
    target.push(value.path)
    return target
},[])
let isLoading = false
router.beforeEach(async(to,from,next) =>{
    const isLogin = await store.dispatch('user/isLogin')
    if (isLogin){
        debugger
        // 去判断权限
        if(!isLoading ){
            const roles =await store.dispatch('test/getRoles')
            const accessRouters = await store.dispatch('test/getRouter',roles)
            isLoading = true 
            router.addRoutes(accessRouters)
            next({...to,replace:true})

        }else{
            next()
        }
    }else{
       if (whiteRoutes.includes(to.path) !=-1) {
        // 代表可以不用登录就可以访问的
        next()
       }else{
        //代表需要登录，登录成功之后跳转到上次点击的界面
        next(`/${constRouter}?redirect=${to.path}`)
       }
    }
})