<template>
  <div class="header-layout">
    <div class="header-layout-box header-layout-box-start">
      <nav-bar></nav-bar>
    </div>
    <div class="header-layout-box" style="flex:1;"></div>
    <div class="header-layout-box header-layout-box-end">
      <div>
        <i class="iconfont icon-theme theme-picker layout-iconfont">
          <input ref="themePick" type="color" />
        </i>
      </div>

      <div>
        <i class="iconfont icon-lock-fill layout-iconfont" @click="lockApp"></i>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@components/content/nav-bar/nav-bar.vue';

export default {
  name: 'HeaderLayout',
  components: {
    NavBar
  },
  mounted() {
    const themePick = this.$refs.themePick;
    // 好像不能用input
    themePick.addEventListener('input', event => {
      // getComputedStyle
      document.documentElement.style.setProperty(
        '--primary',
        event.target.value
      );
    });
  },
  methods: {
    lockApp() {
      this.$router.push({
        path: `/lock-screen`
      });
    }
  }
};
</script>

<style lang="less" scoped>
@layout-theme: #fff;

.header-layout {
  display: flex;
  align-items: center;
  width: 100%;
  height: 70px;
  padding-left: 80px;
  background: @layout-theme;
  position: fixed;
  top: 0;

  &-box {
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  &-box-start {
    text-align: center;
  }

  &-box-end {
    width: 120px;
    text-align: right;

    > div {
      display: inline-flex;
      margin-right: 5px;
      width: 50px;
      height: 50px;
      justify-content: center;
      align-items: center;

      > .iconfont {
        width: 40px;
        height: 40px;
        font-size: 26px;
        color: var(--primary);
      }
    }
  }

  .theme-picker {
    position: relative;
    > input[type='color'] {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 41px;
      width: 35px;
    }
  }

  .nav-icon {
    cursor: pointer;
  }
}
</style>