<template>
  <div>
    <el-menu
      :collapse-transition="false"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      v-if="styleValue ==0"
    >
    <side-bar :styleValue="1" :childrenRouter="item.children" :routerInfo="item" v-for="(item,index) in childrenRouter" :key="index"/>
    </el-menu>
     <el-submenu :index="routerInfo.path" v-if="styleValue ==1">
       <!-- {{routerInfo}} -->
        <span slot="title">{{routerInfo.name}}</span>
       <div v-if="childrenRouter && childrenRouter.length >0">
         <side-bar :styleValue="1" :childrenRouter="item.children" :routerInfo="item"  v-for="(item,index) in childrenRouter" :key="index"/>
       </div>
     </el-submenu >  
  </div>
</template>
<script>
export default {
  name:"side-bar",
  data() {
    return {
      isCollapse: false,
    };
  },
  props:{
    // 定义加载的类型
      styleValue:{
        type:Number,
        required:true,
        default:0,
        
      },
      childrenRouter:{
        // type:Object,
        required:true,
      },
      routerInfo:{
           type:Object,
        required:false,
      }
  },
  mounted() {
    console.log("styleValue",this.styleValue)
    console.log("childrenRouter",this.childrenRouter)

  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>