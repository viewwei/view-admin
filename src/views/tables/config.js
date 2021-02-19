import {TableConst} from "@/const/table.js"
const config = {
  title:"table表格",//table数据标题
  ref:"table",//表格的ref
  tableOperation:{
    label:"操作", //操作栏的标题,
    fixed:"left",//操作栏固定的方向
    slot:"operation",//插槽的名称
    width:200,
    operations:[
      {
        label:"添加",
        event:"addEvent",
        formatterFun:function(scope){
          return "添加"
        }
      },
      {
        label:"删除",
        event:"deleteEvent",
        formatterFun:function(scope){
          return "删除" 
        }
      }, 
    ]
  },
  //表格信息栏
  // 设置栏目
  params:{
    index:{
      label:"序号",
      show:true,
      width:100,
      indexMethod:function(index){ //设置自定义索引
        return index +1
      }
    },//显示序号
    tableShowField:"show", //控制table打开与关闭的字段
    tableHide:"hide",//控制table字段显示或者隐藏
      // 一条完整的数据
    deviceName:{
      label:"设备名称",
      // readType:TableConst.NORMAL,//读取方式
      show:true,//设备名称需要打开,
      hide:true,//设备名称需要展示 
    },
    deviceIp:{
      label:"设备Ip",
      show:true,//设备Ip需要打开
      hide:true,//设备Ip需要展示
      readType:TableConst.FUNCTION,//函数式读取
      readFunc:function(scoped,index){
        console.log("index:",index);
        return "dddd"
      }
    }
  }
}
export default config