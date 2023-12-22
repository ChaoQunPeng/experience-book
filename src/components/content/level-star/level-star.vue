<template>
  <div class="level-stars">
    <template v-for="num in 5">
      <template v-if="num <= level">
        <i class="iconfont icon-star-fill light" :key="num"></i>
      </template>
      <template v-else>
        <i class="iconfont icon-star-fill" :key="num"></i>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: 'LevelStar',
  props: ['level']
};
</script>

<style lang="less" scoped>
.level-stars {
  display: inline-block;

  > .iconfont {
    color: #a4b0be;

    &.light {
      color: #ffa502;
    }
  }
}
</style>