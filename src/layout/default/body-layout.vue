<template>
  <div class="body-layout">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'BodyLayout'
};
</script>

<style lang="less" scoped>
.body-layout {
  min-height: calc(100vh - 70px);
  height: calc(100vh - 70px);
  margin-left: 80px;
  margin-top: 70px;
  overflow: auto;
  border-top-left-radius: 24px;
}
</style>