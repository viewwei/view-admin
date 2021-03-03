import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

const cn = require.context('./en', true, /\.js$/)
const modules = cn.keys().reduce((modules, modulePath) => {
  const value = cn(modulePath)
  modules = { ...value.default, ...modules }
  return modules
}, {})

const zh = require.context('./zh', true, /\.js$/)
const zhModules = zh.keys().reduce((zhModules, modulePath) => {
  const value = zh(modulePath)
  zhModules = { ...value.default, ...zhModules }
  return zhModules
}, {})
export default new VueI18n({
  locale: navigator.language,
  messages: {
    'zh-CN': zhModules,
    'en-US': modules
  }
})
