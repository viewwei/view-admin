<template>
  <div>
    <sn-table
      :data="[
        { deviceName: '才走', deviceIp: 'kdkdkdkkd',deviceIp1: 'kdkdkdkkd',deviceIp2: 'kdkdkdkkd' ,deviceIp3: 'kdkdkdkkd' ,deviceIp4: 'kdkdkdkkd'  },
        { deviceName: 'dwqdqw', deviceIp: 'dwqdwqd' },
        { deviceName: 'dwqdqw', deviceIp: 'dwqdwqd' },
        { deviceName: 'dwqdqw', deviceIp: 'dwqdwqd' },
        { deviceName: 'dwqdqw', deviceIp: 'dwqdwqd' },
        { deviceName: 'dwqdqw', deviceIp: 'dwqdwqd' },
        { deviceName: 'dwqdqw', deviceIp: 'dwqdwqd' },
      ]"
      :tableStyle="tableStyle"
      :stripe="true"
      :border="true"
      size="mini"
      @addEvent="addEvent"
    >
    <template slot-scope="{row,table}" slot="operation">
      <span>{{row.deviceName}}</span>
      <span>{{table.label}}</span>
    </template>
    </sn-table>
     <el-pagination
    :small="false"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
</template>
<script>
const json = require("./config.js").default;
export default {
  data() {
    return {
      tableStyle: json,
      currentPage4:10,
    };
  },
  mounted() {
    console.log("vvvvvvvvv:", json);
  },
  methods:{
      addEvent(row){
          console.log("row:",row);
      },
       handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
       handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
  },
  
};
</script>