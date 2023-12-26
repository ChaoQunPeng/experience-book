<template>
  <div style="height: 100%">
    <!-- <header-layout></header-layout> -->

    <!-- <left-layout></left-layout> -->

    <!-- <body-layout>
       <content-layout></content-layout>
    </body-layout> -->

    <transition name="route" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import HeaderLayout from './default/header-layout.vue';
import LeftLayout from './default/side-layout.vue';
import BodyLayout from './default/body-layout.vue';
import ContentLayout from './default/content-layout.vue';

export default {
  data() {
    return {
      recycleCount: 0
    };
  },
  components: {
    HeaderLayout,
    LeftLayout,
    BodyLayout,
    ContentLayout
  }
};
</script>

<style lang="less" scoped>
@layout-theme: transparent;

body {
  background: @layout-theme;
}
</style>
