import { Loading } from 'element-ui';
const LoadPlugin = {}
let _Vue
LoadPlugin.install = (Vue) => {
    _Vue = Vue
    const Load = (function () {
        let _loadingInstance = {}
        class iLoad {
            loading(option) {
                _loadingInstance = Loading.service(option);
            }
            closeLoading() {
                _loadingInstance.close();
            }
        }
        return iLoad
    })()
    let load = new Load()
    _Vue.prototype.$load = load
}
export default LoadPlugin