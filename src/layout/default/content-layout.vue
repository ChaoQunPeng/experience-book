<template>
  <div class="content-layout">
    <transition name="route" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'ContentLayout'
};
</script>

<style lang="less" scoped>
.content-layout {
  padding: 30px 0 60px 30px;
  background: var(--gray);
  min-height: calc(100vh - 70px);
  overflow-y: auto;
  overflow-x: hidden;
}
</style>