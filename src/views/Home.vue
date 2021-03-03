<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
const HelloWorld = () => import(/* webpackChunkName: "bb" */ '@/components/HelloWorld.vue')
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  mounted () {
    // this.$store.dispatch('errorLog/clearErrorLog')
    console.log('view:', this.$store.state.test)
  }
}
</script>
