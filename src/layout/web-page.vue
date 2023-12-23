<template>
  <div class="webpage">
    <div class="main-body">
      <h1 class="title mb-4 text-center">{{ title }}</h1>
      <div class="sub-title text-center">{{ createDate | dateFormat('YYYY-MM-DD HH:mm:ss') }}</div>
      <article class="article" v-html="content"></article>
    </div>

    <div class="go-back" @click="goBack">返回</div>
  </div>
</template>

<script>
export default {
  name: 'book',
  components: {},
  data() {
    return {
      title: '',
      content: '',
      createDate: '',
      vn: null
    };
  },
  created() {
    const expId = this.$route.query.expId;
    this.getExpById(expId);
  },
  methods: {
    getExpById(experienceId) {
      this.title = `萨达`;
      this.content = `asdsa`;
      this.createDate = `asdasasd`;
      return;
      this.$axios
        .get(`experience/detail/${experienceId}`)
        .then(res => {
          this.title = res.data.data[0].Title;
          this.content = res.data.data[0].Content;
          this.createDate = res.data.data[0].CreateDate;

          // 此处将来优化代码格式
          // this.$nextTick(() => {
          //   let dom = document.querySelectorAll('code');
          //   dom.forEach(e => {
          //     console.dir(e.parentElement);
          //     console.dir(e.className);
          //     let div = document.createElement('div');
          //     div.className = 'code-prefix';
          //     if (e.className == 'language-plaintext') {
          //       div.textContent = 'language-plaintext';
          //       e.parentElement.appendChild(div);
          //     }
          //   });
          // });
        })
        .catch(err => {
          this.$message.error(`获取数据错误！`);
        });
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.main-body {
  width: 720px;
  margin: 30px auto;
}

.title {
  margin-bottom: 15px;
}

.sub-title {
  font-size: 14px;
}

.article /deep/ p {
  color: #2f3542;
  padding: 5px 0;
}

.article /deep/ strong {
  padding: 5px 0;
  display: inline-block;
}

.article /deep/ pre {
  position: relative;
  color: #fff;
  font-size: 16px;
  display: block;
  padding: 20px;
  background: #2f3542;
  border-radius: 4px;

  > code {
    background: transparent;
    color: #fff;
    font-weight: lighter;
  }
}

.article /deep/ code {
  color: #57606f;
  background: #a4b0be;
  font-weight: normal;
  padding: 2px 4px;
  border-radius: 2px;

  // &::after {
  //   content: 'plaintext';
  //   position: absolute;
  //   color: #333;
  //   background: #fff;
  //   border-radius: 2px;
  //   padding: 4px 8px;
  //   top: 0;
  //   right: 0;
  // }
}

.article /deep/ blockquote {
  border-left: 4px solid #ddd;
  padding-left: 15px;
}

.article /deep/ figure {
  width: 100% !important;
  text-align: center;
}

.article /deep/ img {
  width: 100%;
}

.article /deep/ ul {
  margin-left: 20px;
}

.article /deep/ ol {
  margin-left: 20px;
}

.article /deep/ .code-prefix {
  position: absolute;
  color: #333;
  background: #fff;
  border-radius: 2px;
  padding: 4px 8px;
  top: 0;
  right: 0;
}
</style>

<style lang="less">
.go-back {
  background: var(--primary);
  color: #fff;
  position: fixed;
  bottom: 15px;
  left: 15px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    opacity: 0.85;
  }
}
</style>
