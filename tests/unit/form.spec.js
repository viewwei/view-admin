// 该单元测试主要是测试form表单插件方法
describe('测试form插件', () => {
    it('测试form插件,设置属性值', () => {
        let ret = require("@/views/tables/formConfig").default
        let plugin = new ((require('@/plugin/formPlugin')).default)()
        let value = plugin.getFormPropertyValue(ret.params, -1, true)
        expect(typeof value.deviceName).toEqual('number')
    })
    it("测试form插件,通过网络数据组织值", () => {
        let ret = require("@/views/tables/formConfig").default
        let plugin = new ((require('@/plugin/formPlugin')).default)()
        const sourceData = {
            deviceName:"dddddd",
            deviceName2:"ccc",
            deviceName5:"把把v" 
        }
        plugin.setFormPropertyValue(ret.params,sourceData)
        // console.log("测试后数据:",ret.params)
        expect(ret.params.deviceName.value).toEqual("1")
        expect(ret.params.deviceName2.value).toEqual("ccc")
    })

})
