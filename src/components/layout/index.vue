<template>
    <div class="v-layout">
        <div class="v-slider" :class="{'v-slider-with':isOpen}">
            <sidebar :styleValue="0" :childrenRouter="routers"/>
        </div>
        <div class="v-main">
            <div>头部</div>
            <appMain />
        </div>
    </div>
</template>
<script>
import {Sidebar,AppMain} from "./components"
export default {
    components:{
        Sidebar,
        AppMain
    },
    computed:{
        isOpen(){
            return this.$store.state.sidebar.isOpen
        },
        routers(){
            debugger
            return this.$store.state.router.systemRouters
        }
    },
}
</script>
<style  src="./index.scss" lang="scss" scoped></style>