const state = {
  isLogin: true,
  value: 'ddddddd'
}
const mutations = {}
const actions = {
  isLogin ({ state }) {
    return state.isLogin
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
