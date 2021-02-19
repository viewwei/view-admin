import { Loading } from 'element-ui';
const LoadPlugin = {}
let _Vue
// 设置 loading 插件
/**
 * 该插件主要是显示 loading 加载状态,让 loading 加载状态和 html 标签分割来
 * options:加载的是 Loading 的插件选项.参数参考 https://element.eleme.cn/#/zh-CN/component/loading
 * 
 * */ 
LoadPlugin.install = (Vue) => {
    // 保存 Vue 对象
    _Vue = Vue 
    // 设置闭包的目标主要是让类的属性对象不暴露出来,这样就不会被别人修改
    const Load = (function () {
        let _loadingInstance = {}
        class iLoad {
            loading(option) {
                _loadingInstance = Loading.service(option);
            }
            closeLoading() {
               
                _loadingInstance&& _loadingInstance.close();
            }
        }
        return iLoad
    })()
    let load = new Load()
    // 挂载原型对象
    _Vue.prototype.$load = load
}
export default LoadPlugin