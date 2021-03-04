
/**
 * 表单相关操作
 * */
class Form {
  /**
     *为表单config设置值
     * */
  setFormPropertyValue(params, sourceData) {
    if (Object.prototype.toString.call(params) != '[object Object]' ||
      Object.prototype.toString.call(sourceData) != '[object Object]'
    ) {
      return false
    }
    const keys = Object.entries(params)
    for (let index = 0; index < keys.length; index++) {
      const [filed, fildValue] = keys[index]
      if (Object.prototype.toString.call(fildValue) != '[object Object]') {
        continue
      }
      const { transformationFunc } = fildValue
      if (Object.prototype.toString.call(transformationFunc) == '[object Function]') {
        // 拥有转换函数，需要进行转换
        const value = transformationFunc.call(params, sourceData)
        params[filed].value = value
      } else {
        let value
        if (params[filed].hasOwnProperty('defaultValue')) {
          // 有设置默认值
          if (sourceData.hasOwnProperty(filed)) {
            value = sourceData[filed]
          } else {
            value = params[filed]['defaultValue']
          }
        } else {
          // 没有设置默认值
          value = sourceData.hasOwnProperty(filed)
            ? sourceData[filed] : null
        }
        params[filed].value = value
      }

    }
    return true
  }
  // 把表单的值赋值给params对应的字段
  getFormPropertyValue(params, seat = null, limit = true) {
    if (Object.prototype.toString.call(params) != '[object Object]') {
      return false
    }
    const keys = Object.entries(params)
    const transformationParams = {}
    for (let index = 0; index < keys.length; index++) {
      const [filed, filedValue] = keys[index]
      if (Object.prototype.toString.call(filedValue) != '[object Object]') {
        continue
      } else if (Object.prototype.toString.call(filedValue) == '[object Object]') {
        if (limit) {
          if (params.hasOwnProperty('showFiled') && filedValue[params['showFiled']] == false) {
            continue
          }
        }
      }
      let getValue
      if (params[filed].hasOwnProperty('defaultValue') && params[filed].value === params[filed].defaultValue) {
        // 代表这个数值为空
        getValue = seat
      } else {
        getValue = params[filed].value
      }
      transformationParams[filed] = getValue
    }
    return transformationParams
  }
  // 给params,恢复默认值
  resetFormParams(params) {
    if (Object.prototype.toString.call(params) != "[objec Object]") {
      //  params不是对象，直接返回
      return false
    }
    let keys = Object.entries(params)
    for (let index = 0; index < keys.length; index++) {
      const [, filedValue] = keys[index]
      if (Object.prototype.toString.call(filedValue) != "[object Object]") {
        // 非对象即参数补充信息
        continue
      }
      if (filedValue.hasOwnProperty("value")) {
        // 没有设置value,只所以要判断一次，目的为防止filedValue没有value属性
        // 运动.value会新生成value属性,这会导致value不是响应式数据
        if (filedValue.hasOwnProperty('defaultValue')) {
          filedValue.value = filedValue['defaultValue']
        } else {
          filedValue.value = ""
        }
      }
    }
    return true
  }

}
Form.install = function (_Vue) {
  const Vue = _Vue
  Vue.prototype.$form = new Form()
}
export default Form
