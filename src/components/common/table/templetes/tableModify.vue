<template>
  <div>
    <el-link v-if="show" @click="operationClick(1)">
      {{
        scope.readFunc
          ? scope.readFunc(row, scope, index, sourceData)
          : row[field]
      }}
      <svg-icon icon-class="modify" class="svg-icon"></svg-icon>
    </el-link>
    <div class="table-modify" v-else>
      <el-input
        size="mini"
        ref="input"
        v-model="input"
        placeholder="请输入内容"
        class="table-modify"
      ></el-input>
      <svg-icon
        icon-class="ok"
        class="svg-icon table-operation"
        @click="operationClick(0)"
      ></svg-icon>
      <svg-icon
        icon-class="cancel"
        class="svg-icon table-operation"
        @click="operationClick(1)"
      ></svg-icon>
    </div>
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
  data () {
    return {
      input: this.scope.readFunc
        ? this.scope.readFunc(this.row, this.scope, this.index, this.sourceData)
        : this.row[this.field],
      show: true
    }
  },
  methods: {
    operationClick (type) {
      this.show = !this.show
      if (!this.show) {
        this.$nextTick(() => {
          this.$refs.input.focus()
        })
      }
      if (type == 0) {
        // 代表确定,需要发送请求
        this.scope.event &&
          this.$emit(this.scope.event, this.row, this.scope, this.input)
      }
    }
  },
  props: {
    // 代表源数据
    row: {
      type: Object,
      required: false
    },
    scope: {
      type: Object,
      required: false
    },
    field: {
      type: String,
      required: true
    },
    sourceData: {
      type: Array,
      required: true
    },
    index: {
      type: Number,
      required: false
    }
  }
}
</script>
<style scoped>
.table-modify >>> .el-input__inner {
  color: #000;
}
.table-modify >>> input {
  height: 15px;
}
</style>
<style lang="scss" scoped>
.svg-icon {
  vertical-align: inherit;
  margin-left: 0px;
  margin-right: 0px;
}
.table-modify {
  width: 100px;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  margin-right: 10px;
  height: 25px;
}
.table-operation {
  color: #000;
  padding-right: 3px;
  cursor: pointer;
}
.table-operation:hover {
  color: #1890ff;
}
</style>
