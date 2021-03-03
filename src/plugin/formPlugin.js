/**
 * 表单相关操作
 * */ 
class Form {
    /**
     *为表单config设置值
     * */ 
    setFormPropertyValue(params,sourceData)
    {
        
        if (Object.prototype.toString.call(params) != "[object Object]" || 
            Object.prototype.toString.call(sourceData) != "[object Object]"
        ){
            return false
        }
        let keys = Object.entries(params)
        for(let index=0;index<keys.length;index ++){
            const [filed,fildValue] = keys[index]
            if (Object.prototype.toString.call(fildValue) !="[object Object]"){
                continue
            }
            const {transformationFunc} = fildValue
            if (Object.prototype.toString.call(transformationFunc) =="[object Function]"){
                // 拥有转换函数，需要进行转换
                let value = transformationFunc.call(params,sourceData)
                params[filed].value = value
            }else{
                params[filed].value = sourceData.hasOwnProperty(filed) ?
                sourceData[filed] : null
            }
        }
        return true
    }
    getFormPropertyValue(params,seat = null,limit = true){
        if (Object.prototype.toString.call(params) != "[object Object]"){
            return false;
        }
        let keys = Object.entries(params)
        let transformationParams = {}
        for(let index = 0;index<keys.length;index ++){
            const [filed,filedValue] = keys[index]
            if (Object.prototype.toString.call(filedValue) != "[object Object]"){
               if (limit){
                    if (params.hasOwnProperty('showFiled') && filedValue[params[showFiled]] == true){
                        continue
                    }
               }
            }
            let getValue
            if (params[filed].hasOwnProperty('emptyMark')  && params[filed].value === params[filed]['emptyMark']) {
                // 代表这个数值为空
                getValue = seat
            }else{
                getValue = params[filed].value
            }
            transformationParams[filed] = getValue
        }
        return true
    }
}
Form.install = function(_Vue){
    let Vue = _Vue
    Vue.prototype.$form = new Form()
}
export default Form