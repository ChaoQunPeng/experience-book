<template>
  <div class="success-info-wrap">
    <div class="title">恭喜! 你又学习到新的知识了!</div>

    <div class="skill-info">
      <div class="sub-title">
        <span>name</span>
        <span>Javascript</span>
      </div>
      <div class="sub-title text-right">
        <span>total</span>
        <span>200exp</span>
      </div>
    </div>

    <div class="exp-ball-wrap">
      <div id="exp-ball" class="exp-ball rotate-ani"></div>
      <div class="exp-ball-num">199/200</div>
      <!-- <span class="shadow"></span> -->
    </div>

    <div class="text-center" style="transform: scale(1.5);">
      <span>{{totalExp | expFormat('name')}}</span>
      <level-star class="mr-6" :level="totalExp | expFormat('level')"></level-star>
    </div>
  </div>
</template>


<script>
import LevelStar from '@components/content/level-star/level-star.vue';

export default {
  name: 'RecordSuccessInfo',
  data() {
    return {
      borderRadius: {
        'border-radius': '50%'
      }
    };
  },
  components: {
    LevelStar
  },
  props: {
    totalExp: {
      type: String | Number,
      default: 0
    }
  },
  mounted() {
    const expBall = document.querySelector('#exp-ball');
    expBall.addEventListener('animationiteration ', () => {
      alert(`asd`);
      this.$emit('ballAnimationEnd');
    });

    expBall.onanimation = () => {
      console.log(123);
    };
  },
  methods: {
    // 得到一个两数之间的随机数
    getRandomArbitrary(min, max) {
      const random = Math.random() * (max - min) + min;
      return Math.ceil(random);
    },
    // 获得一个形如border-radius:50% 50% 50% 50%;
    getBorderRaduis() {
      let radiusStr = '';
      for (let i = 0; i < 4; i++) {
        const radiusValue = this.getRandomArbitrary(40, 80);
        radiusStr += `${radiusValue}% `;
      }
      return radiusStr;
    }
  }
};
</script>

<style lang="less" scoped>
.success-info-wrap {
  width: 450px;
  margin: 0 auto;
  padding: 0 20px;
  height: 450px;
}

.title {
  text-align: center;
  font-size: 26px;
  margin-bottom: 20px;
  font-weight: 600;
}

.skill-info {
  display: flex;
}

.skill-info > div {
  flex: 1;
}

.sub-title {
  > span:first-child {
    font-size: 12px;
    color: #747d8c;
    margin-right: 5px;
  }

  > span:last-child {
    font-size: 26px;
    color: #2f3542;
  }
}

.exp-ball-wrap {
  position: relative;
  width: 100%;
  height: 300px;
  margin: 40px auto 0 auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.exp-ball {
  position: absolute;
  border: 5px solid;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background: var(--primary);
  border: 1px solid var(--primary);
  box-shadow: inset 0 0 60px #100f7f;
}

.exp-ball-num {
  position: absolute;
  width: 120px;
  text-align: center;
  left: 50%;
  margin-left: -60px;
  margin-top: 100px;
  font-size: 30px;
  color: #fff;
  text-shadow: 0 0 54px #fff;
}

.shadow {
  position: absolute;
  bottom: 0;
  width: 120px;
  height: 15px;
  border-radius: 50%;
  filter: blur(5px);
  background: #000;
  opacity: 0.5;
}

.rotate-ani {
  animation-name: rotateAni;
  animation-duration: 5s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes rotateAni {
  0% {
    transform: rotate(0);
    border-radius: 50% 50% 50% 50%;
  }
  20% {
    transform: rotate(60deg);
    border-radius: 42% 48% 46% 52%;
  }
  40% {
    transform: rotate(120deg);
    border-radius: 45% 56% 49% 48%;
  }
  60% {
    transform: rotate(180deg);
    border-radius: 50% 45% 52% 46%;
  }
  80% {
    transform: rotate(240deg);
    border-radius: 58% 46% 55% 42%;
  }
  90% {
    transform: rotate(300deg);
    border-radius: 45% 56% 49% 48%;
  }
  100% {
    transform: rotate(360deg);
    border-radius: 50% 50% 50% 50%;
  }
}
</style>