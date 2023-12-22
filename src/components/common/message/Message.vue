<template>
  <div class="message fadeIn">
    <div class="message-content">
      <i v-if="type=='info'" class="iconfont icon-info-circle info"></i>
      <i v-else-if="type=='success'" class="iconfont icon-check-circle success"></i>
      <i v-else-if="type=='error'" class="iconfont icon-times-circle error"></i>
      <i v-else-if="type=='warning'" class="iconfont icon-exclamation-circle warning"></i>
      <i v-else class="iconfont icon-tag"></i>
      {{content}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Message',
  data() {
    return {
      content: '',
      type: '',
      index: 0 // 此message组件的索引
    };
  },
  mounted() {
    let destroyTime = 0;
    destroyTime = 1500 + this.index * 300;
    setTimeout(() => {
      this.$el.classList.replace('fadeIn', 'fadeOut');

      setTimeout(() => {
        this.$destroy();
      }, 1000);
    }, destroyTime);
  },
  destroyed() {
    this.$el.remove();
  }
};
</script> 

<style lang="less" scoped>
</style>