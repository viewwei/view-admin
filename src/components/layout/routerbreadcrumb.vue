<template>
  <!--  面包头屑 -->
  <div class="breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumb"
        :to="{ path: breadcrumbClick(item,index == breadcrumb.length -1) }"
        :key="index"
        >{{getBreadCrumb(item)}}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  props: {
    breadcrumb: {
      required: true,
      type: Array,
    },
  },
  methods:{
    breadcrumbClick(item,isPush){
      let to 
     if (isPush || (item.path == this.$route.path || item.redirect == this.$route.path)){
       to= ""
     }else{
       to= item.path
     }
     console.log("to:",to)
     return to
    },
       getBreadCrumb(item){
      if (item.meta && item.meta.title){
        return item.meta.title
      }else if (item.name){
        return item.name
      }else{
        return "请晚上路由信息"
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.breadcrumb {
  padding: 20px 10px;
  background: #fff;
  border-bottom: 2px solid #eff1f4;
}
</style>