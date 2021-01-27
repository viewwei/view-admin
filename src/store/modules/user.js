const state = {
    isLogin :true
}
const mutations = {}
const actions = {
    isLogin({state}){
        return  state.isLogin
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
  }