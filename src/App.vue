<template>
  <div>
    <router-view name="layout"></router-view>
    <router-view name="lock"></router-view>
    <router-view name="webpage"></router-view>
    <router-view name="book"></router-view>
  </div>
</template>

<script>
import Layout from './layout/layout.vue';

export default {
  components: {
    Layout
  },
  created() {
    // console.log(
    //   `%c       `,
    //   `padding-bottom:50px;
    //    font-size:62px;
    //    background-image:url(http://192.168.0.105:3003/pcq_i.svg);
    //    background-size:cover;
    //    background-repeat:no-repeat
    //    `
    // );
  }
};
</script>

<style lang="less" scoped>
p {
  color: #f00;
  font-size: 60px;
}
</style>
