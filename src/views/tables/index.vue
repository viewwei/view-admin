<template>
  <div>
    <sn-table-tool :sourceData="tableStyle" @selectDataModel="selectDataModel"></sn-table-tool>
    <sn-table
      :sourceData="sourceData"
      :tableStyle="tableStyle"
      :stripe="true"
      :border="true"
      :showType="1"
      :height="300"
      :loading="loading"
      size="mini"
      @addEvent="addEvent"
      @handleSizeChange="handleSizeChange"
      @selectAll="selectAll"
      @linkClick="linkClick"
      @tableTagClick="tableTagClick"
      @modifyEvent="modifyEvent"
      @switchEvent="switchEvent"
    >
    </sn-table>
  </div>
</template>
<script>
const json = require("./config.js").default;
export default {
  data() {
    return {
      tableStyle: json,//table的结构
      loading: true,//load加载按钮
      selectData:[],// 当前选中的数据
      sourceData:[
        {
          deviceName: '才走',
          deviceIp: 'kdkdkdkkdcfdddddddddddddddddddddddddddddddddddddddddddddddd',
        },
        { deviceName: '1', deviceIp: 'c' },
        { deviceName: '2', deviceIp: 'dwqdwqd' },
        { deviceName: '3', deviceIp: 'dwqdwqd' },
        { deviceName: '4', deviceIp: 'dwqdwqd' },
        { deviceName: '5', deviceIp: 'dwqdwqd' },
        { deviceName: '6', deviceIp: 'dwqdwqd' },
        { deviceName: '7', deviceIp: 'dwqdwqd' },
        { deviceName: '8', deviceIp: 'dwqdwqd' },
        { deviceName: '9', deviceIp: 'dwqdwqd' },
        { deviceName: '11', deviceIp: 'dwqdwqd' },
        { deviceName: '12', deviceIp: 'dwqdwqd' },
        { deviceName: '13', deviceIp: 'dwqdwqd' },
        { deviceName: '14', deviceIp: 'dwqdwqd' },
        { deviceName: '15', deviceIp: 'dwqdwqd' },
        { deviceName: '16', deviceIp: 'dwqdwqd' },
        { deviceName: '17', deviceIp: 'dwqdwqd' },
        { deviceName: '18', deviceIp: 'dwqdwqd' },
        { deviceName: '19', deviceIp: 'dwqdwqd' },
        { deviceName: '21', deviceIp: 'dwqdwqd' },
        { deviceName: '22', deviceIp: 'dwqdwqd' },
        { deviceName: '23', deviceIp: 'dwqdwqd' },
        { deviceName: '24', deviceIp: 'dwqdwqd' },
        { deviceName: '25', deviceIp: 'dwqdwqd' },
        { deviceName: '26', deviceIp: 'dwqdwqd' },
      ]
    };
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  },
  methods: {
    addEvent(row) {
      console.log("row:", row);
    },
    // 超级链接，row代表返回行数据，scope代表返回config中的params中想对应的数据
    linkClick(row,scope){
     console.log("excel:",this.$excel);
     debugger
     this.$tip.install = "ddd"
     console.log(this.$tip)
    //  this.$excel.exportExcelEntry(
    //    this.tableStyle.params,
    //    this.sourceData,
    // "view"
    //    )
    //   console.log("link",row,scope)
    //    let sourceOriginAmount = [
    //     {
    //         goodsName: '苹果',
    //         sourceCode: '123'
    //     },
    //     {
    //         goodsName: '香蕉',
    //         sourceCode: '234'
    //     }
    // ]; 
    // const tHeader = ['编号', '商品名称', '溯源码']; //表格表头
    // const filterVal = ['index', 'goodsName', 'sourceCode']; //要渲染的列
    // this.turnToExcel(sourceOriginAmount,tHeader,filterVal,'表格名字') //调用封装的函数
},
turnToExcel(sourceOriginAmount,tHeader,filterVal,filename){
  import('@/plugin/exportExcel/Export2Excel.js').then(excel => { // 导入js模块
          const list = (sourceOriginAmount || []).map((item, key) => { // 通过 map 方法遍历，组装数据成上面的格式
              let obj_index={index:key+1}
              let obj={...item,...obj_index}
              return obj
          });
          if (list) {
              const data = list.map(v => filterVal.map(j => v[j]));// 生成json数据
              debugger
              excel.export_json_to_excel({ // 调用excel方法生成表格
                  header: tHeader,
                  data,
                  filename
              });
          } else {
              alert('暂无无数据');
          }
          // this.loading = false;
      })
},
    handleSizeChange(playload) {
      // 页码变化和页码条目变化数据，playload为有一个对象 pagenum,pagesize两个属性
      console.log("分页:", playload);
    },
    selectDataModel(operation){
      console.log("操作:",operation);
    },
    selectAll(selection){
      if (selection.length >0){
        this.tableStyle.tool[1].disabled = false
      }else{
         this.tableStyle.tool[1].disabled = true
      }
    },
    tableTagClick(row,scoped){
      console.log("tag:",row,scoped);
    },
    modifyEvent(row,scoped,value){
        console.log("row:",row,scoped,value)
    },
    switchEvent(){
      console.log(arguments[arguments.length -1])
    }
  },
};
</script>
