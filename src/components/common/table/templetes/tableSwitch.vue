<template>
  <el-switch
    v-model="switchStyle.state"
    @change="change"
    :active-color="switchStyle !=null ?switchStyle.activeColor: '#13ce66'"
    :inactive-color="switchStyle !=null ?switchStyle.inactiveColor: '#ff0000'"
  >
  </el-switch>
</template>
<script>
export default {
  inheritAttrs: false,
  data() {
    return {
     
      switchStyle:this.scope.readFunc ? this.scope.readFunc(this.row, this.scope, this.index, this.sourceData) : null
    };
  },
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
  methods: {
    change() {
      this.switchStyle.state = !this.switchStyle.state;
      this.scope.event && this.$emit(this.scope.event,this.row, this.scope, this.index, this.sourceData, this.switchStyle.state)
    },
  },
};
</script>