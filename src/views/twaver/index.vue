<template>
  <div id="twaver"></div>
</template>
<script>
import TwaverPlugin from "@/class/twaverPlugin";
const twaver = new TwaverPlugin();
export default {
  data() {
    return {};
  },
  mounted() {
    twaver.initNetwork({
      canvasDivId: "twaver",
      data: {
        x: 20,
        y:20
      },
    });
    twaver.createSigleNode({
        name:"2222222"
    })
 },
};
</script>
<style lang="scss" scoped>
#twaver {
  width: 100%;
  height: 100%;
  min-height: 500px;
//   position: absolute;
}
</style>