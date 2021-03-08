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
      <div>vvvv</div>
      <div>
        <BreadCrumb :breadcrumb="getRouterInfor()"/>
      </div>
      <appMain />
    </div>
  </div>
</template>
<script>
import { Sidebar, AppMain } from './components'
import { mapState } from 'vuex'
import {computedRouting} from "@/utils/routerUtil"
import BreadCrumb from "./routerbreadcrumb"
export default {
  components: {
    Sidebar,
    AppMain,
    BreadCrumb,//路由面包屑
  },
  computed: {
    ...mapState({
      isOpen: state => state.sidebar.isOpen,
      isCollapse: state => state.sidebar.isCollapse,
      routers: state => state.router.systemRouters,
      currentRouter: state => state.router.currentRouter
    })
  },
  methods:{
    getRouterInfor(){
    return  computedRouting(this.currentRouter)
    }
  }
}
</script>
<style  src="./index.scss" lang="scss" scoped></style>
