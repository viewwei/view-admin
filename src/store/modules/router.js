import { asyncRoutes,routes} from "@/router/index.js"
const state = {
    systemRouters: [],// 后面保存的是系统所有的路由信息
    currentRouter:"",//当前选中的路由
}
const mutations = {
    SAVE_ROUTER:function(state,accessedRoutes){
        let whiteRouters = routes.filter(key=>key.path != "/login")
        state.systemRouters = state.systemRouters.concat(whiteRouters,...accessedRoutes)
    },
    SAVE_CURRENT_ROUTER:function(state,router){
        
        state.currentRouter = router
    }
}
const actions = {
    getRoles({state }) {
        return state.roles
    },
    setCurrentRouter({commit},router){
        commit("SAVE_CURRENT_ROUTER",router)
    },
    getRouter({commit}, roles) {
        return new Promise(resolve => {
            let accessedRoutes = []
            if (roles.includes("1")) {
                // 拥有超级权限,拥有所以的路由
                accessedRoutes = asyncRoutes || []
                commit("SAVE_ROUTER",accessedRoutes)
            } else {
                accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
                // 发送一份路由到state,用来保存
                commit("SAVE_ROUTER",accessedRoutes)
            }
            resolve(accessedRoutes)
        })
    }
}
// 过滤需要的路由
function filterAsyncRoutes(routes, roles) {
    let res = []
    const copyRoutes = routes.slice(0, routes.length)
    copyRoutes.forEach(route => {
        if (hasPromission(roles, route)) {
            // 有权限
            const temp = { ...route }
            if (temp.children) {
                temp.children = filterAsyncRoutes(route.children, roles)
            }
            res.push(temp)
        }

    });
    return res
}
// 判断是否拥有权限
function hasPromission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role))
    } else {
        return true
    }


}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}