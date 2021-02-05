const state = {
    // 判断是否登录标记
    roles: ["1"],
}
const mutations = {
    LOGIN: function (state, roles) {
        // 设置登录本地标识
        if (roles == 1) {
            state.roles = ["1"]
        } else if (roles == 2) {
            state.roles = ["2"]
        }
        localStorage.setItem("login", true)
    }
}
const actions = {
    login({ commit }, userInfo) {
        const { username, password } = userInfo
        // 返回一个状态
        return new Promise((resolve, reject) => {
            if (username == "admin" && password == "admin") {
                commit("LOGIN", 1)
                resolve()
            } else if (username == "view" && password == "123") {
                commit("LOGIN", 2)
                resolve()
            }
            else {
                reject()
            }
        })
    },
    getRoles({state}){
        return state.roles
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}