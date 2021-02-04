<template>
    <div>
<el-menu  :collapse-transition="false" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
  <el-submenu index="1">
    <template slot="title">
      <i class="el-icon-location"></i>
      <span slot="title">导航一</span>
    </template>
    <el-submenu index="1-4">
      <span slot="title">选项4</span>
      <el-menu-item index="1-4-1">选项1</el-menu-item>
    </el-submenu>
  </el-submenu>
   <el-submenu index="2">
    <template slot="title">
      <i class="el-icon-location"></i>
      <span slot="title">导航一</span>
    </template>
    <el-submenu index="2-4">
      <span slot="title">选项4</span>
      <el-menu-item index="2-4-1">选项1</el-menu-item>
    </el-submenu>
  </el-submenu>
</el-menu>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        isCollapse: false
      };
    },
    mounted(){
        // setTimeout(() => {
        //   this.$store.dispatch("sidebar/open")
        //     this.isCollapse = true
        // }, 2000);
    },  
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>