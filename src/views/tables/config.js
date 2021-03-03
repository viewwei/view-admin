import { TableConst } from "@/const/table.js"
import TableTag from "@/class/tableTag.js"
import TableSwitch from "@/class/tableSwitch"
const config = {
  title: "table表格",//table数据标题
  tool: [
    {
      label: "导出表格", //操作栏的名称
      event: "",//操作的事件
      icon: "set",//操作按钮
      disabled: false//是否可以点击
    },
    {
      label: "导出选中表格表格",
      event: "",
      icon: "set",
      disabled: true
    },
    {
      label: "刷新",
      event: "",
      icon: "set",
      disabled: false
    },
    {
      label: "查询",
      event: "",
      icon: "set",
      disabled: false
    },
  ],
  tableOperation: {
    label: "操作", //操作栏的标题,
    fixed: "right",//操作栏固定的方向
    slot: "operation",//插槽的名称
    minWidth: 120,
    operations: [
      {
        label: "添加",
        event: "addEvent",
        formatterFun: function (scope) {
          return "添加"
        }
      },
      {
        label: "删除",
        event: "deleteEvent",
        formatterFun: function (scope) {
          return "删除"
        }
      },
    ]
  },
  //表格信息栏
  // 设置栏目
  params: {
    index: {
      label: "序号",
      show: true,
      minWidth: 120,
      fixed: "left",
      indexMethod: function (index) { //设置自定义索引
        return index + 1
      }
    },//显示序号
    tableShowField: "show", //控制table打开与关闭的字段
    tableHide: "hide",//控制table字段显示或者隐藏
    select: true,
    // 一条完整的数据
    deviceName: {
      label: "设备名称",
      // readType:TableConst.NORMAL,//读取方式
      show: true,//设备名称需要打开,
      hide: true,//设备名称需要展示 
    },
    deviceIp: {
      label: "设备Ip",
      show: true,//设备Ip需要打开
      hide: true,//设备Ip需要展示
      readType: TableConst.LINK,//函数式读取
      event: "linkClick",//代表超链接回调方法

    },
    deviceIp2: {
      label: "设备Ip",
      show: true,//设备Ip需要打开
      hide: true,//设备Ip需要展示
      readType: TableConst.FUNCTION,//函数式读取
      readFunc: function (row, scope, index, sourceData) {
        return "ddddvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv"
      }
    },
    deviceIp3: {
      label: "ffff",
      show: true,//设备Ip需要打开
      hide: true,//设备Ip需要展示
      readType: TableConst.FUNCTION,//函数式读取
      minWidth: 200,
      readFunc: function (row, scope, index, sourceData) {
        return "ddddvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv"
      }
    },
    deviceIp54: {
      label: "设备Ipcccc",
      show: true,//设备Ip需要打开
      hide: true,//设备Ip需要展示
      readType: TableConst.SWITCH,//函数式读取
      event: "switchEvent",
      readFunc: function (row, scope, index, sourceData) {
        return new TableSwitch(true)
      }
    },
    deviceIp44: {
      label: "设备Ip",
      show: true,//设备Ip需要打开
      hide: true,//设备Ip需要展示
      readType: TableConst.FUNCTION,//函数式读取
      readFunc: function (row, scope, index, sourceData) {
        return "dddd"
      }
    },
    deviceIp34: {
      label: "VVVVV",
      show: true,//设备Ip需要打开
      hide: true,//设备Ip需要展示
      readType: TableConst.MODIFY,//修改
      event: "modifyEvent",
      readFunc: function (row, scope, index, sourceData) {
        return "dddd"
      }
    },
    deviceIp24: {
      label: "设备Ip",
      show: true,//设备Ip需要打开
      hide: true,//设备Ip需要展示
      readType: TableConst.TAG,//函数式读取
      event: "tableTagClick",//tag的点击事件
      readFunc: function (row, scope, index, sourceData) {
        return new TableTag("#ff0000", "222", "home")
      },
    },
    deviceIp14: {
      label: "设备Ip",
      show: true,//设备Ip需要打开
      hide: true,//设备Ip需要展示
      readType: TableConst.FUNCTION,//函数式读取
      readFunc: function (row, scope, index, sourceData) {
        return "dddd"
      }
    }
  }
}
export default config