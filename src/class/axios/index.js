import axios from 'axios'
import i18n from "@/lang/index"
import store from "@/store/index"
import RequestConst from '@/const/requestConst'
import Context from "@/main"
if (process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = 'api'
} else {
    axios.defaults.baseURL = ''
}
axios.defaults.timeout = 2000
/**
 * 请求之前拦截.
 * 常用的功能如:为每个请求添加token
 * */
axios.interceptors.request.use((config) => {
    return config
}, (err) => {
    /* 请求失败操作 */
    return Promise.reject(err)
})
axios.interceptors.response.use(response => {
    if (response.status == 200) {
        //代表成功请求
        const { data: { code } } = response
        if (code === RequestConst.NOT_LOGIN) {
            // 代表尚未登录，需要返回到登录界面，并且情况本地登录标记
            store.commit("login/LOGINOUT")
            Context.$tip.success({
                message: i18n.t('userNotLogin'),
                callback: () => {
                    Context.$router.replace({ path: "/login" })
                }
            })
            return Promise.reject(response)
        } else {
            return response
        }
    } else {
        return Promise.reject(response)
    }
}, err => {
    return Promise.reject(err)
})
export default class {
    getResource(url) {
        return axios.get(`${url}`)
    }
    deleteResource(url, params) {
        if (params) {
            return axios.delete(`${url}`, {
                data: params
            })
        }
        return axios.delete(`${url}`)
    }
    putResource(url, data, config) {
        return axios.put(`${url}`, data, config)
    }
    postResource(url, params, config) {
        return axios.post(`${url}`, params, config)
    }
}