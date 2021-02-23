/**
 * 对Date进行扩展，扩展的目的是为了不污染原来的Date函数
 * 注意:扩展只是扩展原型方法，不对Date的静态方法进行扩展
 */ 
let date = Date.prototype
let SNDate = Object.create(date)
SNDate.getCurrentDate = (currentDate,fmt) =>{
    console.log("current no");
    var o = {
        "M+": currentDate.getMonth() + 1, //月份 
        "d+": currentDate.getDate(), //日 
        "h+": currentDate.getHours(), //小时 
        "m+": currentDate.getMinutes(), //分 
        "s+": currentDate.getSeconds(), //秒 
        "q+": Math.floor((currentDate.getMonth() + 3) / 3), //季度 
        "S": currentDate.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (currentDate.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
export default SNDate