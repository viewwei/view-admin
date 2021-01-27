import { asyncRoutes } from "@/router/index.js"
const state = {
    roles: ["2"],
    copyRouter: asyncRoutes,// 保留一份完成的路由信息图
}
const mutations = {}
const actions = {
    getRoles({ commit, state }) {
        return state.roles
    },
    getRouter({ }, roles) {
        
        return new Promise(resolve => {
            let accessedRoutes = []
            if (roles.includes("1")) {
                // 拥有超级权限,拥有所以的路由
                accessedRoutes = asyncRoutes || []
            } else {
                accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
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