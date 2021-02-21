<template>
  <div class="table-tool">
    <button
      :disabled="item.disabled"
      v-for="(item, index) in sourceData.tool"
      :key="index"
      @click="selectDataModel(item)"
    >
      <svg-icon :icon-class="item.icon" class="svg-icon" />{{ item.label }}
    </button>
    <el-dropdown trigger="click">
      <button  class="table-data-model">
        <svg-icon icon-class="set" class="svg-icon" />选择数据模型
      </button>
      <el-dropdown-menu slot="dropdown" class="mode-dropdown">
          <div v-for="([filed,filedValue],itemValue) in Object.entries(sourceData.params )" :key="itemValue">
            <el-checkbox v-if="filed !='index' && 
            (Object.is(typeof filedValue,'object' )) &&
            (filedValue[sourceData.params.tableShowField] == true)"
            v-model="filedValue[sourceData.params.tableHide]"
             >{{filedValue.label}}</el-checkbox>
            </div>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  props: {
    sourceData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      checkList: [],
    };
  },
  methods: {
    selectDataModel(value) {
      this.$emit('selectDataModel',value)
    },
  },
};
</script>
<style lang="scss" scoped>
.table-tool {
  display: flex;
  justify-content: flex-end;
  padding: 10px 0px;
  background-color: #fff;
}
button {
  outline: none;
  border: none;
  margin-right: 10px;
  background-color: #e1e5e6;
  color: #2495ce;
  padding: 5px 15px;
  font-size: 12px;
  font-weight: 700;
  border-radius: 3px;
  cursor: pointer;
  .svg-icon {
    width: 13px;
    height: 13px;
    vertical-align: text-top;
    margin-right: 3px;
  }
}
button[disabled="disabled"] {
  cursor: not-allowed;
}
button:hover,.table-data-model{
  background-color: #2495ce;
  color: #fff;
}
.mode-dropdown {
  padding: 10px;
  min-width: 100px
}
</style>