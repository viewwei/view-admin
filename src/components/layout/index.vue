<template>
  <div class="v-layout">
    <div class="v-slider" :class="{ 'v-slider-with': isOpen }">
      <sidebar
        :styleValue="0"
        :childrenRouter="routers"
        :collapse="isCollapse"
        :default_active="currentRouter"
      />
    </div>
    <div class="v-main">
      <div>{{ currentRouter }}</div>
      <div>vvv</div>
      <appMain />
    </div>
  </div>
</template>
<script>
import { Sidebar, AppMain } from "./components";
import {mapState } from "vuex"
export default {
  components: {
    Sidebar,
    AppMain,
  },
  computed: {
     ...mapState({
         isOpen:state => state.sidebar.isOpen,
         isCollapse:state => state.sidebar.isCollapse,
         routers:state => state.router.systemRouters,
         currentRouter:state=>state.router.currentRouter
     }),
  },
};
</script>
<style  src="./index.scss" lang="scss" scoped></style>