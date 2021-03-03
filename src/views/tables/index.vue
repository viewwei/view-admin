<template>
  <div class="main">
    <sn-table-tool :sourceData="tableStyle" @selectDataModel="selectDataModel"></sn-table-tool>
    <sn-form :formStyle="formConfig"></sn-form>
    <sn-table
      class="table"
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
const json = require('./config.js').default
const formConfig = require('./formConfig').default
export default {
  data () {
    return {
      tableStyle: json, // table的结构
      loading: true, // load加载按钮
      selectData: [], // 当前选中的数据
      formConfig: formConfig, // 表单数据
      sourceData: [
        {
          deviceName: '才走',
          deviceIp: 'kdkdkdkkdcfdddddddddddddddddddddddddddddddddddddddddddddddd'
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
        { deviceName: '26', deviceIp: 'dwqdwqd' }
      ]
    }
  },
  mounted () {
    setTimeout(() => {
      this.loading = false
    }, 2000)
    debugger
    this.$form.setFormPropertyValue(this.formConfig.params, {})
  },
  methods: {
    addEvent (row) {
      console.log('row:', row)
    },
    // 超级链接，row代表返回行数据，scope代表返回config中的params中想对应的数据
    linkClick (row, scope) {
    },
    handleSizeChange (playload) {
      // 页码变化和页码条目变化数据，playload为有一个对象 pagenum,pagesize两个属性
      console.log('分页:', playload)
    },
    selectDataModel (operation) {
      console.log('操作:', operation)
    },
    selectAll (selection) {
      if (selection.length > 0) {
        this.tableStyle.tool[1].disabled = false
      } else {
        this.tableStyle.tool[1].disabled = true
      }
    },
    tableTagClick (row, scoped) {
      console.log('tag:', row, scoped)
    },
    modifyEvent (row, scoped, value) {
      console.log('row:', row, scoped, value)
    },
    switchEvent () {
      console.log(arguments[arguments.length - 1])
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
