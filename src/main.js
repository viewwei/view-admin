import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './lang/index'
import Element from 'element-ui'
import LoadPlugin from './plugin/loadPlugin'
import Table from '@/components/common/table/table.vue'
import TableTool from '@/components/common/tabletool/index.vue'
import ExportExcel from './plugin/exportExcel/excelPlugin'
import Tip from '@/plugin/tipPlugin'
import Form from '@/plugin/formPlugin'
import './promise'
import './font/global.css'
import '@/class/axios/index'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/element-variables.scss'
import './styles/index.scss'
import './icons/index'
// 过滤查询
import CommonForm from '@/components/common/form/form.vue'
Vue.component('sn-table', Table)
Vue.component('sn-table-tool', TableTool)
Vue.component('sn-form', CommonForm)
Vue.prototype.$bus = new Vue()
Vue.use(Element, {
  size: 'mini' // set element-ui default size
})
Vue.config.productionTip = false
Vue.use(LoadPlugin)
Vue.use(ExportExcel)
Vue.use(Tip)
Vue.use(Form)
// Vue.use(Twaver)
export default new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
