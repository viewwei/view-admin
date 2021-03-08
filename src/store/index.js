import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getter'
Vue.use(Vuex)
const modulesFiles = require.context('./modules', true, /\.js$/)
console.log("modulesFiles.keys():",modulesFiles.keys())
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})
const store = new Vuex.Store({
  getters,
  modules
})
export default store
