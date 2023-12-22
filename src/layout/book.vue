<template>
  <div class="book">
    <div class="book-wrap">
      这里感觉也能做点好玩的事...
      <div class="book-page">
        在笛卡尔坐标系中，每个
        欧氏空间 里的点都由横坐标和纵坐标这两个值来确定。
        在CSS（和大部分的计算机图形学）中，原点 (0, 0) 在元素的左上角。
        每个点都使用数学上的向量符号(x,y)来描述。
      </div>

      <div class="book-page">
        在笛卡尔坐标系中，每个
        欧氏空间 里的点都由横坐标和纵坐标这两个值来确定。
        在CSS（和大部分的计算机图形学）中，原点 (0, 0) 在元素的左上角。
        每个点都使用数学上的向量符号(x,y)来描述。
      </div>

      <div class="book-page">
        在笛卡尔坐标系中，每个
        欧氏空间 里的点都由横坐标和纵坐标这两个值来确定。
        在CSS（和大部分的计算机图形学）中，原点 (0, 0) 在元素的左上角。
        每个点都使用数学上的向量符号(x,y)来描述。
      </div>

      <div class="book-page">
        在笛卡尔坐标系中，每个
        欧氏空间 里的点都由横坐标和纵坐标这两个值来确定。
        在CSS（和大部分的计算机图形学）中，原点 (0, 0) 在元素的左上角。
        每个点都使用数学上的向量符号(x,y)来描述。
      </div>

      <div class="book-page">
        在笛卡尔坐标系中，每个
        欧氏空间 里的点都由横坐标和纵坐标这两个值来确定。
        在CSS（和大部分的计算机图形学）中，原点 (0, 0) 在元素的左上角。
        每个点都使用数学上的向量符号(x,y)来描述。
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'book',
  created() {
    console.log(this.$route.query.expId);
  }
};
</script>

<style lang="less" scoped>
.book {
  &-wrap {
    position: relative;
    border: 1px solid;
    padding: 50px;
    padding-top: 200px;
    height: 100vh;
    transform-style: preserve-3d;
  }

  &-page {
    position: absolute;
    color: #000;
    border: 1px solid;
    box-shadow: 0 0 4px #666;
    width: 300px;
    height: 400px;
    background: #fff;
    transform-origin: right;
    animation: bookTurning 1s;
    animation-fill-mode: forwards;
    animation-timing-function: linear;
    backface-visibility: visible;

    &:nth-child(1) {
      animation-delay: 0s;
    }

    &:nth-child(2) {
      animation-delay: 2s;
    }

    &:nth-child(3) {
      animation-delay: 4s;
    }

    &:nth-child(4) {
      animation-delay: 6s;
    }

    &:nth-child(5) {
      animation-delay: 8s;
    }
  }
}

@keyframes bookTurning {
  0% {
    transform: rotateY(0) skewY(0);
  }

  50% {
    transform: rotateY(90deg) skewY(20deg);
  }

  100% {
    transform: rotateY(180deg) skewY(0);
  }
}
</style>