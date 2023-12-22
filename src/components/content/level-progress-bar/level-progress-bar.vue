<template>
  <div class="progress" id="progress">
    <div class="progress-bar" :style="totalExp | expFormat('width')">
      <span
        class="progress-text"
      >{{totalExp | expFormat('currentExp')}}/{{totalExp | expFormat('levelBaseExp')}}exp</span>
    </div>
    <span
      class="progress-text"
    >{{totalExp | expFormat('currentExp')}}/{{totalExp | expFormat('levelBaseExp')}}exp</span>
  </div>
</template>

<script>
export default {
  name: 'LevelProgressBar',
  props: {
    totalExp: {
      type: Number | String,
      default: 0
    }
  },
  mounted() {
    this.setProgressTextStyleLeft();
    // window.onresize = e => {
    //   this.setProgressTextStyleLeft();
    // };
  },
  methods: {
    // 有点伤性能...
    setProgressTextStyleLeft() {
      // 想了很久没办法用CSS的方式实现中间的内容根据宽度自动适中，只能先用js来了
      const progress = document.getElementById('progress');
      const progressTextItems = document.querySelectorAll('.progress-text');
      // progressProps.width 这个出来是字符串... 像 '100px' 这种
      const progressProps = window.getComputedStyle(progress);

      const progressWidth = () => {
        const width = progressProps.width.replace('px', '');
        return parseInt(width);
      };

      const progressTextStyleLeft = progressWidth() / 2 - 60 + 'px'; // 这个60是.progress-text里的width:120px减一半

      progressTextItems.forEach(e => {
        e.style.left = progressTextStyleLeft;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.progress {
  position: relative;
  display: block;
  width: 100%;
  height: 20px;
  background: var(--gray);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  &-bar {
    width: 100%;
    height: 100%;
    text-align: center;
    position: absolute;
    left: 0;
    z-index: 1;
    color: #fff;
    background: var(--primary);
    overflow: hidden;
  }

  &-text {
    position: absolute;
    top: 2px;
    font-size: 12px;
    width: 120px;
    text-align: center;
  }
}
</style>