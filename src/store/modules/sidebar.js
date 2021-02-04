const state = {
    isOpen:false
}
const mutations = {
    OPEN:function(state){
        state.isOpen = true
    } ,
    CLOSE:function(state){
        state.isOpen = false
    }
}
const actions = {
    open({commit}){
        commit("OPEN")
    },
    close({commit}){
        commit("CLOSE") 
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
  }