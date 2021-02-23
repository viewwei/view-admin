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
import Table from "@/components/common/table/table.vue"
import TableTool from "@/components/common/tabletool/index.vue"
// import "@/class/date.js"
Vue.use(LoadPlugin)
import ExportExcel from "./plugin/exportExcel/excelPlugin"
Vue.use(ExportExcel)
Vue.component('sn-table', Table)
Vue.component('sn-table-tool', TableTool)
Vue.prototype.$bus = new Vue();
Vue.use(Element, {
  size:  'mini', // set element-ui default size
})
import './font/global.css'
Vue.config.productionTip = false
import "./promise"
export default new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
