import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from "./lang/index"
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import './styles/element-variables.scss'
import './styles/index.scss'
import "./icons/index"
import LoadPlugin from "./plugin/loadPlugin"
Vue.use(LoadPlugin)
Vue.use(Element, {
  size:  'medium', // set element-ui default size
})
// import a from "./font/global.css"
import './font/global.css'
Vue.config.productionTip = false
import "./promise"
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
