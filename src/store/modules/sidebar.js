const state = {
  isOpen: false,
  isCollapse: false
}
const mutations = {
  OPEN: function (state) {
    state.isCollapse = true
    state.isOpen = true
  },
  CLOSE: function (state) {
    state.isCollapse = false
    state.isOpen = false
  }
}
const actions = {
  open ({ commit }) {
    commit('OPEN')
  },
  close ({ commit }) {
    commit('CLOSE')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
