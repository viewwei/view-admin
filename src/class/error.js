export default class {
    // code 代码错误码，error代表错误信息
    constructor(code){
        this.code = code
        this.error = errorCode[code]
    }
}
const errorCode={
    1:"params结构错误",
    2:"要打印的数据不是一个数组",
    3:"发生错误",
    4:"excel的标题为空",
    5:"excel的数据为空"
}