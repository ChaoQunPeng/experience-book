<template>
  <div>
    <div class="password-wrap">
      <input
        v-pcq-input
        type="password"
        v-model="password"
        v-on:keyup.enter="unlock"
        placeholder="请输入密码 pcq1230"
      />

      <button v-pcq-button btnType="primary" class="block" @click="unlock">解锁</button>
    </div>
  </div>
</template>

<script>
const TEMPORARY_PASSWORD = 'pcq1230';

export default {
  name: 'LockScreen',
  data() {
    return {
      password: '',
      ht: `<p>sdfsdfds</p>`
    };
  },
  methods: {
    unlock() {
      if (this.password === TEMPORARY_PASSWORD) {
        this.$router.push({ path: `/home` });
      } else {
        this.$message.error('密码错误！');
      }
    }
  }
};
</script>

<style lang="less" scoped>
body {
  background: #57606f;
}

.password-wrap {
  width: 520px;
  height: 160px;
  position: fixed;
  padding: 20px;
  left: 50%;
  top: 50%;
  margin-left: -260px;
  margin-top: -160px;
}

</style>