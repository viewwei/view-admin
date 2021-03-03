// 该文件主要是用于表单的验证
/**
 * 必填属性
 * 回调函数 callback
 * 验证值 value
 * 非必填属性
 * 不验证 disabled
 * 是否必须 required
 * 错误提示 message
 * */
export default function (_params = {}) {
    const {
        disabled, //校验标记
        callback,//回调标记
        value,//校验值
        required,//是否必须
        min,//最小值
        max,//最大值
        message,//错误信息
        maxLen,//最大长度
        minLen,//最小长度
        reg,//正则校验值
        maxSize,//最大选择个数
        minSize//最小选择个数
    } = _params
    if (!callback) {
        return
    }
    if (disabled) {
        // 代表不验证表单
        callback()
        return
    }
    if (!value && value != false) {
        //代表验证值为空或者不存在
        if (required) {
            callback(new Error(message || '输入框不能为空'))
        } else {
            callback()
        }
    } else if (
        (_params.hasOwnProperty('min') && _params.hasOwnProperty('max')) &&
        (Object.prototype.toString.call(min) == '[object Number]' && Object.prototype.toString.call(max) == '[object Number]') &&
        (Object.prototype.toString.call(value) == '[object Number]' || !isNaN(Number(value)))
    ) {
        // 代表同时存在min 和max属性,同时必须保证value是数值，或者能够转成字符串的数值
        let changeValue = typeof value == 'string' ? parseInt(value) : value
        if (min <= changeValue && max >= changeValue) {
            callback()
        } else {
            callback(new Error(message || `输入框数值大小不得大于${max}且不得小于${min}`))
        }
    } else if (
        (_params.hasOwnProperty('max') && !_params.hasOwnProperty('min')) &&
        (Object.prototype.toString.call(max) == '[object Number]') &&
        (Object.prototype.toString.call(value) == '[object Number]' || !isNaN(Number(value)))
    ) {
        // 代表同时存在max属性不存在max属性,同时必须保证value是数值，或者能够转成字符串的数值
        //  表示取值存在天花板
        let changeValue = typeof value == 'string' ? parseInt(value) : value
        if (max < changeValue) {
            callback(new Error(message || `输入框数值大小不得大于${max}`))
        } else {
            callback()
        }
    } else if (
        (_params.hasOwnProperty('min') && !_params.hasOwnProperty('max')) &&
        (Object.prototype.toString.call(min) == '[object Number]') &&
        (Object.prototype.toString.call(value) == '[object Number]' || !isNaN(Number(value)))
    ) {
        // 代表同时存在min属性不存在max属性,同时必须保证value是数值，或者能够转成字符串的数值
        //  表示取值存在地板值
        let changeValue = typeof value == 'string' ? parseInt(value) : value
        if (min < changeValue) {
            callback(new Error(message || "输入框数值大小区间错误"))
        } else {
            callback()
        }
    } else if (
        (
            (maxLen != undefined && Object.prototype.toString.call(maxLen) == '[object Number]') &&
            (minLen != undefined && Object.prototype.toString.call(minLen) == '[object Number]') &&
            Object.prototype.toString.call(value) == '[object String]')
    ) {
        // 判断字符的长度区间在min~max之间
        if (minLen <= value.length && maxLen >= value.length) {
            callback()
        } else {
            callback(new Error(message || `字符串长度不得低于${minLen}且不得高于${maxLen}`))
        }
    } else if (
        (maxLen != undefined && minLen == undefined) &&
        (Object.prototype.toString.call(maxLen) == '[object Number]') &&
        Object.prototype.toString.call(value) == '[object String]'
    ) {
        // 字符串只限制了最大长度
        if (value.length > maxLen) {
            callback(new Error(message || `字符串长度不低高于${maxLen}`))
        } else {
            callback()
        }
    } else if (
        (minLen != undefined && maxLen == undefined) &&
        (Object.prototype.toString.call(minLen) == '[object Number]') &&
        Object.prototype.toString.call(value) == '[object String]'
    ) {
        // 字符串只限制了最大长度
        if (value.length < minLen) {
            callback(new Error(message || `字符串长度不得低于${minLen}`))
        } else {
            callback()
        }
    } else if (reg != undefined) {
        // 正则判断
        if (!reg.test(value)) {
            // 代表正则判断不成功
            callback(message || "数据格式错误")
        } else {
            callback()
        }
    } else if (
        (maxSize != undefined && Object.prototype.toString.call(maxSize) == "[object Number]") &&
        (minSize != undefined && Object.prototype.toString.call(minSize) == "[object Number]") &&
        (Array.isArray(value))
    ) {
        if (value.length >= minSize && value.length <= maxSize) {
            callback()
        } else {
            callback(new Error(message || `所选个数不能超过${maxSize}且不得小于${minSize}`))
        }
    } else if (
        (maxSize != undefined && Object.prototype.toString.call(maxSize) == "[object Number]") &&
        minSize == undefined &&
        (Array.isArray(value))
    ) {
        if (value.length > maxSize) {
            callback(new Error(message || `所选个数不能超过${maxSize}`))
        } else {
            callback()
        }
    } else if (
        (minSize != undefined && Object.prototype.toString.call(minSize) == "[object Number]") &&
        maxSize == undefined &&
        (Array.isArray(value))
    ) {
        if (value.length < minSize) {
            callback(new Error(message || `所选个数不能低于${maxSize}`))
        } else {
            callback()
        }
    }else{
        callback()
    }
}