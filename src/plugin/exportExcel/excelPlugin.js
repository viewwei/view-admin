import Error from "@/class/error"
import { TableNomalConst } from "@/const/table.js"
import SNDate from "@/class/date.js"
const ExcelPlugin = {}
let _Vue
/**
 * 插件编码注意；
 * 插件并不一定需要导出一个带有install的对象，也可以直接导出一个函数
 * 这两者之间的区别是:用install函数中this的指向ExcelPlugin,而直接导出的函数this
 * 为null,其实这个在初始化源码的时候，可以看到。源码在初始化的时候优先判断
 * 插件是否有install方法，如果有直接使用plugin.call(plugin,args),如果没有的话
 * 使用的是plugin.call(null,args) 
 * */
ExcelPlugin.install = (Vue, option) => {
    _Vue = Vue
    class Excel {
        // 导出
        exportExcel(excelHeader, data, filename, error) {
            import('@/plugin/exportExcel/Export2Excel.js')
                .then(excel => {
                    excel.export_json_to_excel({ // 调用excel方法生成表格
                        header: excelHeader,
                        data,
                        filename
                    });
                }).catch(e => {
                    error && error(e)
                })
        }
        exportExcelEntry(params, sourceData, fileName, callback) {
            // params代表config.params数据，sourceData代表数据来源
            if (Object.prototype.toString.call(params) === '[object object]') {
                callback(new Error(1))
                return
            }
            const keys = Object.keys(params)
            const legitimateKey = keys.filter(key => {
                if (typeof params[key] != 'object') {
                    return false
                } else if (params.hasOwnProperty('tableShowField') &&
                    typeof params[key][params.tableShowField] == 'boolean'
                    && (params[key][params.tableShowField] == false
                        || (params[key][params.tableShowField] == true &&
                            params[key][params.tableHide] == false)
                    )

                ) {
                    // 判断是否有tableShowField字段
                    return false
                }
                return true
            })
            if (
                !Array.isArray(sourceData)
            ) {
                callback(new Error(2))
                return
            }
            let exportValues = []
            let exportLabels = []
            for (let index = 0; index < sourceData.length; index++) {
                let values = []
                let element = sourceData[index]
                legitimateKey.forEach(key => {
                    if (key === TableNomalConst.INDEX) {
                        values.push(index + 1)
                    } else {
                        if (
                            params[key].hasOwnProperty(TableNomalConst.EXPORTFUNC) &&
                            typeof params[key][TableNomalConst.EXPORTFUNC] == "function"
                        ) {
                            // 通过回调返回执行要输出的值，比如返回数据1代表成功，Excel要输出的成功，而不是1
                            let exportValue = params[key][TableNomalConst.EXPORTFUNC](element)
                            values.push(exportValue)
                        } else {
                            if (!element.hasOwnProperty(key) && Object.prototype.toString.call(element[key]) != '[object object]') {
                                values.push("")
                            } else {
                                values.push(element[key])
                            }
                        }

                    }
                })
                exportValues.push(values)
            }
            legitimateKey.forEach(key => {
                let label = params[key].label
                exportLabels.push(label)
            })
            //  
            if (!fileName || (typeof fileName != 'string')) {
                fileName = SNDate.getCurrentDate(new SNDate.constructor(), "yyyy-MM-dd hh:mm:ss")
            }
            if (exportLabels.length == 0) {
                callback(new Error(4))
                return
            }
            if (exportValues.length == 0) {
                callback(new Error(5))
                return
            }
            this.exportExcel(exportLabels, exportValues, fileName, e => {
                callback(new Error(3))
            })
        }
    }
    _Vue.prototype.$excel = new Excel()
}
export default ExcelPlugin