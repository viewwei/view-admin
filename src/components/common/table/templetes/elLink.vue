<template>
  <el-link @click="linkClick" type="primary">
     {{scope.readFunc ? scope.readFunc(row,scope,index,sourceData) :row[field]}}
    </el-link>
</template>
<script>
export default {
    inheritAttrs: false,
  methods: {
    linkClick() { 
    this.scope.event &&this.$emit(this.scope.event, this.row, this.scope);
    },
  },
  props: {
    scope: {
      required: false,
    },
    row: {
      required: false,
    },
    field: {
      type: String,
      required: true,
    },
    sourceData:{
      type:Array,
      required:true
    },
    index:{
      type:Number,
      required:false
    }
  },
};
</script>