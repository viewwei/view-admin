<template>
    <div class="v-layout">
        <div class="v-slider" :class="{'v-slider-with':isOpen}">
            <sidebar/>
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
        }
    },
}
</script>
<style  src="./index.scss" lang="scss" scoped></style>