<template>
 <div>
<sn-table />     
</div>   
</template>
<script>
const json = require("./index.json")
export default {
    mounted(){
        console.log("vvvvvvvvv:",json)
    }
}
</script>