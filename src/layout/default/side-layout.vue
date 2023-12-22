<template>
  <div class="left-layout">
    <div class="app-ico">
      <!-- <img style="width:100%;" src="../assets/image/pcq_i.svg" /> -->
    </div>

    <!-- 主要功能 -->
    <div class="left-layout-box">
      <!-- https://router.vuejs.org/guide/migration/#Removal-of-event-and-tag-props-in-router-link- -->
      <router-link to="/home" tag="div" class="left-layout-nav" replace>
        <i class="iconfont icon-home-fill"></i>
      </router-link>

      <router-link to="/recycle" tag="div" class="left-layout-nav" replace>
        <i class="iconfont icon-delete-fill"></i>
      </router-link>

      <router-link to="/chart" tag="div" class="left-layout-nav" replace>
        <i class="iconfont icon-chart-line"></i>
      </router-link>

      <router-link to="/book" tag="div" class="left-layout-nav" replace>
        <i class="iconfont icon-map"></i>
      </router-link>
    </div>

    <!-- 说明 -->
    <div class="left-layout-box left-layout-box-sub">
      <div class="left-layout-nav">
        <div>
          <i class="iconfont icon-gallery-view" @click="gallery"></i>
        </div>
      </div>

      <div class="left-layout-nav">
        <div>
          <i class="iconfont icon-lightbulb" @click="levelTip"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LeftLayout',
  methods: {
    getDataList() {
      this.$axios.get(`experience/info`, { noLoading: false }).then(res => {
        this.recycleCount = res.data.data[0].recycleCount;
      });
    },
    gallery() {
      let vm = this;
      const modal = this.$modal({
        title: `介绍`,
        body: function() {
          return (
            <div class="app-explain">
              <p>
                我们会喜欢玩游戏其中一个原因就是反馈快。当我们击杀怪物后，马上就能获得装备，经验或者是升级，非常直观。
                而学习的话需要一个长时间的积累才能看到成果，而且每次学习完之后我们不能感觉到像玩游戏一样“打了怪，赚了经验,升级了级”。
                也无法直观的对自己的能力有一个“认识”。不知道自己属于哪一个“级别”。
              </p>
              <p>
                所以RTU(Road To upgrade)
                升级之路就是想做这件事。希望尽可能的把所学的知识经验具现化。理论上借鉴了
                <a
                  target="_blank"
                  href="https://www.zybuluo.com/flysmart/note/213521"
                >
                  德雷福斯模型
                </a>
                和
                <a
                  href="https://baike.baidu.com/item/%E4%B8%80%E4%B8%87%E5%B0%8F%E6%97%B6%E5%AE%9A%E5%BE%8B/8255848?fr=aladdin"
                  target="_blank"
                >
                  一万小时定律
                </a>
                以及
                <a
                  target="_blank"
                  href="https://zh.wikipedia.org/zh-hans/%E9%81%97%E5%BF%98%E6%9B%B2%E7%BA%BF"
                >
                  艾宾浩斯记忆曲线（这个还未加入到项目中）
                </a>
                设计了一个简单易用的等级系统。
              </p>
              <h4>等级划分</h4>
              <div>
                <p>新手（novice）</p>
                <p>
                  分为五个等级 I II III IV
                  V。总共经验为1000exp，每个等级200点经验
                </p>
              </div>
              <div>
                <p>高级新手（advanced beginner）</p>
                <p>
                  分为五个等级 I II III IV
                  V。总共经验为2000exp，每个等级400点经验
                </p>
              </div>
              <div>
                <p>胜任者（competent）</p>
                <p>
                  分为五个等级 I II III IV
                  V。总共经验为3000exp，每个等级600点经验
                </p>
              </div>
              <div>
                <p>精通者（proficient）</p>
                <p>
                  分为五个等级 I II III IV
                   V。总共经验为4000exp，每个等级800点经验
                </p>
              </div>
              <div>
                <p>专家（expert）</p>
                <p>
                  无等级，此App的尽头，专家后应该不需要用这个了~ ヽ(ー_ー)ノ
                </p>
              </div>
              <div>
                <p>
                  每1点经验对应为1个小时，所以10000点经验正好就是10000个小时。这正是成为一个专家级人物需要的至少时间。
                  <u style="display:inline">**而且是有效时间**</u>
                </p>
              </div>
            </div>
          );
        },
        footer: function() {
          function close(event) {
            modal.close();
          }

          return (
            <button v-pcq-button onClick={close}>
              关闭
            </button>
          );
        }
      });
    },
    levelTip() {
      const modal = this.$modal({
        title: `等级说明`,
        body: () => {
          return (
            <div class="level-explain">
              <div>
                <a
                  target="_blank"
                  href="https://www.zybuluo.com/flysmart/note/213521"
                >
                  德雷福斯模型
                </a>
                是伯克利科学家在1980提出的关于如何评价技能水平和如何提升技能层次的模型。
                该模型是如何超越新手层次，如何不断精通技术的有效指导方法
                该模型概括了从新手到专家必须经历的 5 个阶段。
              </div>
              <h2>五阶段模型</h2>
              <div>
                <h4>第一阶段：新手（novice）</h4>
                <p>
                  小白、学徒工，跟着打酱油
                  想要一本手册，想别人告诉他一步一步怎么做
                  没有或者只有很少的经验
                  因为没有判断能力，他们需要及时的行为反馈
                  不知道如何应付错误，出错会让他们慌乱
                  按照明确规则可以看起来做点事情 他们难以利用网络的知识片段
                  只会单纯的抄录代码，并不清楚它们应用的情景 最佳进阶手段
                  教练明确的指令训练，这个阶段不需要太多理解性的东西
                </p>
              </div>
              <div>
                <h4>第二阶段：高级新手（advanced beginner）</h4>
                <p>
                  小工、能够跟着做点事情 有一定经验，有一些模块库。
                  对规则有所理解，会尝试性的应用规则对付任务；
                  想要快速的获取解决问题的信息，对知识体系不感兴趣
                  知道哪些信息有用，依赖信息；
                  他们是“基于搜索引擎的编程”的忠实实践者；
                  能拼接代码完成目标功能； 超过50%的人群会整个生涯都处于这个阶段
                  最佳进阶手段 观察和模仿环境中高水平的人来提升。
                </p>
              </div>
              <div>
                <h4>第三阶段：胜任者（competent）</h4>
                <p>
                  师傅。能够独立负责做事情。 拥有比较多的技巧；
                  拥有相当多的经验； 能听懂专家的抽象观点；
                  能做为一个团队的核心了； 最重要能力是评估问题解决的可能性。
                  熟练他所使用的开发语言的各种语法细节 最佳进阶手段
                  持续苛刻挑战性的任务
                </p>
              </div>
              <div>
                <h4>第四阶段：精通者（proficient）</h4>
                <p>
                  经验已经足以提炼一般性的指导方法
                  对于所处的技术领域具有全局思维 能够整体系统的解决问题。
                  围绕自己的技术领域，不断积极寻求更大的概念框架。
                  不断审视自己解决问题的手段 恰到好处的使用各种《设计模式》
                  大约有10%人处于这个阶段 最佳进阶手段 尚不清楚
                </p>
              </div>
              <div>
                <h4>第五阶段：专家（expert）</h4>
                <p>
                  创造解决问题的方法手段。
                  追求最佳实践，创造更好的工具和方法。面对问题时候能自然的产生直觉的解决办法。
                  专家通常很难把他们的行为恰如其分地解释清楚，他们的很多行为是如此地熟练以至于已经变成无意识。
                  新手靠规则，专家靠直觉； 他们著书、写文章、做巡回演讲。
                  不到5%的人在这一个阶段（在体育运动中 前0.2%才是明星）
                  专家需要保持实践来维持他的水平，专家离开实践后，就成为胡说八道的“理论大师”。专家并不意味着是好的教练。
                  但是，一旦你成了某个领域的专家，在别的领域成为专家就会变得更容易（所谓成功是一种习惯）。
                </p>
              </div>
            </div>
          );
        },
        footer: function() {
          function close(event) {
            modal.close();
          }

          return (
            <button v-pcq-button onClick={close}>
              关闭
            </button>
          );
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@layout-theme: #fff;

.left-layout {
  width: 80px;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  color: #fff;
  background: @layout-theme;
  display: flex;
  flex-direction: column;

  &-nav {
    position: relative;
    height: 70px;
    text-align: center;
    transition: all 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;

    .iconfont {
      display: flex;
      font-size: 24px;
      text-shadow: 0 0 0 #fff;
      cursor: pointer;
      color: var(--primary);
      width: 40px;
      height: 40px;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      transition: all 0.3s;
      text-shadow: 0 0 0 #fff;

      &:hover {
        border: 1px solid var(--primary);
        box-shadow: 0 0 5px var(--primary);
        width: 45px;
        height: 45px;
        text-shadow: 0 0 2px var(--primary);
      }
    }

    &.bottom {
      flex: 1;
      align-items: flex-end;
      padding-bottom: 15px;
    }

    .count {
      position: absolute;
      color: #fff;
      right: 24px;
      top: 18px;
      background: #f00;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      font-size: 12px;
      cursor: pointer;
    }
  }

  .app-ico {
    color: #fff;
    text-align: center;
    font-size: 56px;
    font-weight: bold;
    font-family: monospace;
    padding: 10px 0;
    height: 80px;
  }

  .more-ellipsis {
    text-align: center;
    cursor: pointer;
    color: #57606f;
    transition: all 0.3s;
    &:hover {
      text-shadow: 0 0 6px #fff;
    }
  }
}

.left-layout-box-sub {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.app-explain {
  > p {
    text-indent: 32px;
    line-height: 1.65;
    margin-bottom: 10px;
  }

  h4 {
    font-size: 20px;
    margin-bottom: 10px;
  }

  > div {
    margin-bottom: 15px;

    > p:first-child {
      font-size: 18px;
      margin-bottom: 5px;
      font-weight: bold;
    }
  }
}

.level-explain {
  > h2 {
    margin-bottom: 15px;
  }

  > div {
    margin-bottom: 15px;

    &:first-child {
      text-indent: 32px;
      line-height: 1.65;
    }

    > h4 {
      margin-bottom: 8px;
      font-size: 18px;
    }

    > p {
      text-indent: 32px;
      line-height: 1.65;
      margin-bottom: 5px;
    }
  }
}
</style>