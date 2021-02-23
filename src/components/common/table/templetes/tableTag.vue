<template>
  <el-tag
    :color="scope.readFunc(row, scope,index,sourceData).color"
    effect="dark"
    :hit="false"
    size="small"
    @click="tableTagClick"
  >
    <svg-icon
      v-if="scope.readFunc(row, scope,index,sourceData).icon.length > 0"
      :icon-class="scope.readFunc(row, scope,index,sourceData).icon"
      class="svg-icon"
    ></svg-icon>
    {{
      scope.readFunc
        ? scope.readFunc(row, scope, index, sourceData).label
        : "unknow"
    }}
  </el-tag>
</template>
<script>
export default {
    inheritAttrs: false,
  props: {
    // 代表源数据
    row: {
      type: Object,
      required: false,
    },
    scope: {
      type: Object,
      required: false,
    },
    field: {
      type: String,
      required: true,
    },
    sourceData: {
      type: Array,
      required: true,
    },
    index: {
      type: Number,
      required: false,
    },
  },
  computed: {
    getTagStyle() {
      return this.scope.styleFunc(this.row);
    },
  },
  methods:{
      tableTagClick(){
          this.scope.event && this.$emit(this.scope.event,this.row,this.scope)
      }
  }
};
</script>
<style lang="scss" scoped>
.el-tag--dark {
  text-align: center;
  width: 60px;
  cursor: pointer;
  border: none !important;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.svg-icon {
  width: 13px;
  height: 13px;
  vertical-align: text-bottom;
  margin-right: 0px;
}
</style>