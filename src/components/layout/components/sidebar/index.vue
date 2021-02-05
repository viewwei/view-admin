<template>
  <div>
    <el-menu
      :collapse-transition="false"
      @select="selectMenu"
      :collapse="collapse"
      v-if="styleValue == 0"
      :default-active="default_active"
    >
      <side-bar
        :styleValue="item.children && item.children.length > 1 ? 1 : 2"
        :childrenRouter="item.children"
        :routerInfo="item"
        v-for="(item, index) in childrenRouter"
        :key="index"
      />
    </el-menu>
    <el-submenu :index="routerInfo.path" v-if="styleValue == 1">
      <span slot="title">{{ routerInfo.name }}</span>
      <div v-if="childrenRouter && childrenRouter.length > 0">
        <side-bar
          :styleValue="item.children && item.children.length > 0 ? 1 : 2"
          :childrenRouter="item.children"
          :routerInfo="item"
          v-for="(item, index) in childrenRouter"
          :key="index"
        />
      </div>
    </el-submenu>
    <el-menu-item
      :index="routerInfo.redirect ? routerInfo.redirect : routerInfo.path"
      v-if="styleValue == 2"
    >
      <i>
        <svg-icon :icon-class="routerInfo.meta.icon" class="svgIcon" />
      </i>
      <span slot="title" :to="routerInfo.path" tag="span">
        {{ routerInfo.name }}</span
      >
    </el-menu-item>
  </div>
</template>
<script>
export default {
  name: "side-bar",
  data() {
    return {};
  },
  props: {
    // 定义加载的类型
    styleValue: {
      type: Number,
      required: true,
      default: 0,
    },
    childrenRouter: {
      // type:Object,
      required: true,
    },
    routerInfo: {
      type: Object,
      required: false,
    },
    collapse: {
      type: Boolean,
      required: false,
    },
    default_active: {
      type: String,
      required: false,
    },
  },
  methods: {
    selectMenu(key) {
      if (key != this.default_active)
      {
            this.$router.push(key);
      }
    },
  },
};
</script>
<style src="./index.scss" lang="scss" scoped >
</style>