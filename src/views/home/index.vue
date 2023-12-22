<template>
  <div>
    <div>
      <label>
        <input
          v-pcq-input
          type="text"
          ref="searchSkillInput"
          placeholder="查找技能"
          v-model="searchKey"
          style="width: 200px"
        />
      </label>
    </div>

    <div class="pcq-grid" style="margin-left: -15px" id="GRID">
      <div class="pcq-grid-item" draggable="true" v-for="(item, index) in list" :key="index">
        <a class="skill-card-wrap" href="javascript:;" @click="goDetail(item)">
          <div :id="'card' + index" class="skill-card">
            <div class="descr-line" @click="$event.stopPropagation()">
              <div style="width: 150px">
                这里感觉可以放点什么东西，但是暂时还没想到~~
                <!-- <label>
                  选择一个颜色：
                  <input type="color" tabindex="-1"/>
                  <button v-pcq-button btnType="primary" btnSize="sm" tabindex="-1">确定</button>
                </label>-->
              </div>
            </div>
            <div class="name">
              <span class="descr-name-dot"></span>
              {{ item.name }}
            </div>
            <div class="level">
              {{ item.totalExp | expFormat('name') }}
              {{ item.totalExp | expFormat('romanNum') }}
              <level-star :level="item.totalExp | expFormat('level')"></level-star>
              <span class="exp-text">{{ item.totalExp || 0 }} exp</span>
            </div>
            <div class="exp">
              <level-progress-bar :totalExp="item.totalExp"></level-progress-bar>
            </div>
          </div>
          <div class="skill-card-handle">
            <i class="iconfont icon-ellipsis-vertical"></i>
            <ul>
              <li @click.stop="updateCard(item)">编辑</li>
              <li v-pcq-popconfirm pcqPopconfirmTitle="您确定要删除此技能吗？" @onConfirm="deleteCard(item)">删除</li>
            </ul>
          </div>
        </a>
      </div>
    </div>

    <modal title="新增技能" :visible="modalIsVisible" @ok="addedCard" @cancel="cancel">
      <input v-pcq-input type="text" v-model="title" />
    </modal>

    <div class="add-skill" @click="handleModal()">
      <i class="iconfont icon-plus"></i>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import LevelStar from '@components/content/level-star/level-star.vue';
import LevelProgressBar from '@components/content/level-progress-bar/level-progress-bar.vue';

export default {
  data() {
    return {
      msg: 'home working',
      list: [],
      title: '',
      modalIsVisible: false,
      editor: ClassicEditor,
      searchKey: '',
      originData: [],
      value: ''
    };
  },

  components: {
    LevelStar,
    LevelProgressBar
  },

  created() {
    this.getList();
  },

  mounted() {
    // const searchSkillInput = this.$refs.searchSkillInput;
    // searchSkillInput.addEventListener('focus', () => {
    //   console.log(`focus`);
    // });
    // searchSkillInput.addEventListener('blur', () => {
    //   console.log(`blur`);
    // });
    // this.$refs.searchSkillInput.onfocus = function(params) {
    // };
  },
  methods: {
    getList() {
      this.list = [
        {
          id: 1,
          name: '名称',
          romanNum: 10,
          totalExp: 100
        }
      ];
      this.originData = [];

      return;
      axios('skill').then(res => {
        this.list = res.data.data;
        this.originData = this.list;
        // TODO: 仔细研究一下
        // this.$nextTick(() => {
        //   const skillCardWraps = document.querySelectorAll('.skill-card-wrap');
        //   if (skillCardWraps[0] instanceof HTMLElement) {
        //     skillCardWraps[0].focus();
        //     skillCardWraps[0].onfocus = function(params) {
        //       console.log(params);
        //     };
        //   }
        // });
      });
    },
    goDetail(item) {
      this.setRecordingItem(item);
      this.$router.push({
        path: `/detail/${item.id}`,
        query: {
          skillName: item.Name,
          totalExp: item.totalExp
        }
      });
    },
    // 设置准备记录的技能数据，用于新增后显示提示的信息
    setRecordingItem(item) {
      localStorage.setItem('RECORDING_ITEM', JSON.stringify(item));
    },
    cancel() {
      this.handleModal();
    },
    handleModal(e) {
      this.modalIsVisible = !this.modalIsVisible;
    },
    addedCard() {
      if (this.title == '') {
        this.$message.warning('技能名不能为空。。');
        return;
      }
      axios
        .post(`skill`, {
          Name: this.title
        })
        .then(
          res => {
            this.$message.success(`新增成功！`);
            axios.get('skill').then(res => {
              this.list = res.data.data;
              this.modalIsVisible = false;
              this.title = '';
            });
          },
          err => {
            this.$message.error(`新增失败！`);
          }
        );
    },
    updateCard(item) {
      const vm = this;
      this.value = item.Name;

      const body = <input v-pcq-input vModel={this.value} type="text" placeholder="新的技能名是" />;

      const modal = this.$modal({
        title: `修改技能名`,
        // 最优方式
        body: body,
        // 匿名函数 编译后会生成var _this4 = this; 应该指向了自身...js基础不行...
        // body: function() {
        //   return (
        //     <input
        //       v-pcq-input
        //       onInput={oi}
        //       vModel={vm.value}
        //       type="text"
        //       placeholder="新的技能名是"
        //     />
        //   );
        // },
        // 箭头函数会导致每次输入后input失去焦点，同时无法使用focus再次获取焦点
        // body: () => {
        //   return (
        //     <input
        //       v-pcq-input
        //       onInput={oi}
        //       vModel={vm.value}
        //       type="text"
        //       placeholder="新的技能名是"
        //     />
        //   );
        // },
        // 箭头函数里的this会指向父级
        onOk: () => {
          // console.log(this);
          // return;
          if (this.value == '') {
            this.$message.warning('新技能名称不能为空');
            return;
          }
          axios
            .put(`skill/${item.SkillID}`, {
              Name: this.value
            })
            .then(
              res => {
                this.$message.success(`修改成功`);
                modal.close();
                this.getList();
              },
              err => {
                this.$message.error(`修改失败`);
              }
            );
        }
      });
    },
    deleteCard(item) {
      if (item.totalExp > 0) {
        this.$message.warning('该技能下存在经验，不能删哦~');
        return;
      }
      axios.delete(`skill/${item.SkillID}`).then(res => {
        if (res) {
          this.$message.success(`删除成功`);
          this.getList();
        }
      });
    }
    // getPhaseInfo(totalExp) {
    //   if (totalExp >= 0 && totalExp < 1000) {
    //     const expRange = [
    //       [0, 199],
    //       [200, 399],
    //       [400, 599],
    //       [600, 799],
    //       [800, 999]
    //     ];
    //     return this.getLevelInfo(totalExp, expRange, '新手', 199);
    //   } else if (totalExp >= 1000 && totalExp < 3000) {
    //     const expRange = [
    //       [1000, 1399],
    //       [1400, 1799],
    //       [1800, 2199],
    //       [2200, 2599],
    //       [2600, 2999]
    //     ];
    //     return this.getLevelInfo(totalExp, expRange, '高级新手', 399);
    //   } else if (totalExp >= 3000 && totalExp < 6000) {
    //     const expRange = [
    //       [3000, 3599],
    //       [3600, 4199],
    //       [4200, 4799],
    //       [4800, 5399],
    //       [5400, 5999]
    //     ];
    //     return this.getLevelInfo(totalExp, expRange, '胜任者', 599);
    //   } else if (totalExp >= 6000 && totalExp < 10000) {
    //     const expRange = [
    //       [6000, 6799],
    //       [6800, 7599],
    //       [7600, 8399],
    //       [8400, 9199],
    //       [9200, 9999]
    //     ];
    //     return this.getLevelInfo(totalExp, expRange, '精通者', 799);
    //   } else {
    //     return { name: '专家', level: '' };
    //   }
    // },
    // getLevelInfo(totalExp, expRange, levelName, levelExp) {
    //   const data = {
    //     name: levelName,
    //     level: 0,
    //     baseExp: levelExp,
    //     range: []
    //   };
    //   for (let i = 0; i < expRange.length; i++) {
    //     if (totalExp >= expRange[i][0] && totalExp <= expRange[i][1]) {
    //       switch (i) {
    //         case 0:
    //           data.level = 'I';
    //           break;
    //         case 1:
    //           data.level = 'II';
    //           break;
    //         case 2:
    //           data.level = 'III';
    //           break;
    //         case 3:
    //           data.level = 'IV';
    //           break;
    //         case 4:
    //           data.level = 'V';
    //           break;
    //       }

    //       data.currentExp = totalExp - expRange[i][0];
    //       data.range = expRange[i];
    //     }
    //   }

    //   return data;
    // }
  },
  watch: {
    searchKey: function (val) {
      this.list = this.originData;
      this.list = this.list.filter(e => {
        // 模糊查找
        return e.Name.toLocaleUpperCase().indexOf(val.toLocaleUpperCase()) > -1;
        // 精确查找
        // return e.Name.indexOf(val) > -1;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.pcq-grid {
  display: flex;
  flex-wrap: wrap;
}

.pcq-grid-item {
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 1430px) {
  .pcq-grid-item {
    flex-basis: 33.33333%;
  }
}

@media (max-width: 1100px) {
  .pcq-grid-item {
    flex-basis: 50%;
  }
}

.skill-card-wrap {
  position: relative;
  background: #fff;
  width: 100%;
  margin: 15px;
  border-radius: 4px;
  top: 0;
  color: #fff;
  transition: all 0.3s;
  cursor: pointer;
  transform: translateY(0);

  &:hover {
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    transform: translateY(-15px);
    z-index: 2;
  }

  &:focus {
    outline: 2px dashed #5352ed;
  }
}

.skill-card {
  padding: 20px 30px 20px 40px;
  overflow: hidden;
  border-radius: 3px;
  position: relative;

  .name {
    font-size: 20px;
    margin-bottom: 24px;
    border-bottom: 1px solid var(--gray);
    padding-bottom: 5px;
    color: var(--dark);

    .descr-name-dot {
      width: 5px;
      height: 5px;
      background: var(--primary);
      position: absolute;
      top: 32px;
      left: 25px;
      border-radius: 2px;
    }
  }

  .level {
    margin-bottom: 15px;
    font-size: 18px;
    color: var(--dark);
  }

  .exp {
    font-size: 18px;
    color: #666;

    > span {
      font-size: 12px;
    }
  }

  .exp-text {
    font-size: 12px;
    float: right;
    color: #a4b0be;
    margin-top: 6px;
  }

  .descr-line {
    position: absolute;
    width: 5px;
    height: 156px;
    // background: rgba(47, 53, 66, 0.75);
    background: rgba(255, 255, 255, 0.75);
    left: 0;
    top: 0;
    z-index: 2;
    overflow: hidden;
    border-right-color: var(--primary);
    border-right-style: solid;
    border-right-width: 5px;
    transition: width 0.3s;

    // &::after {
    //   content: '';
    //   position: absolute;
    //   top: 0;
    //   right: 0;
    //   width: 0px;
    //   height: 100%;
    //   background: #1e90ff;
    //   box-shadow: -3px 0 10px #1e90ff;
    // }

    &:hover {
      width: 100%;
    }
  }
}

.skill-card-handle {
  position: absolute;
  right: 6px;
  top: 10px;
  color: var(--peace);
  width: 20px;
  text-align: center;
  height: 30px;

  &:hover {
    > ul {
      display: block;

      > li {
        padding: 8px 8px;
        border-bottom: 1px solid #ddd;

        &:last-child {
          border-bottom: none;
        }

        &:hover {
          background: #ddd;
        }
      }
    }
  }

  > ul {
    display: none;
    position: absolute;
    list-style: none;
    width: 120px;
    background: #fff;
    border: 1px solid #f1f1f1;
    box-shadow: 2px 2px 30px #ddd;
  }
}

.home-header {
  height: 80px;
  font-size: 30px;
  line-height: 80px;
  padding-left: 20px;
}

.button {
  --color: #ff6b81;
  background: #fff;
  display: inline-block;
  color: var(--color);
  font-size: 20px;
  padding: 10px 20px;
  border-radius: 4px;
  border: 2px solid var(--color);
  cursor: pointer;
  box-shadow: 0 0 0 var(--color);
  transition: all 0.3s;

  &:hover {
    background: var(--color);
    box-shadow: 0 0 5px var(--color);
    color: #fff;
  }
}

.add-skill {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: var(--primary);
  color: #fff;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 1px 4px var(--primary);
  transition: all 0.3s;
  cursor: pointer;
  transform: scale(1);
  z-index: 20;

  > .iconfont {
    font-size: 26px;
  }

  &:hover {
    transform: scale(1.1);
  }
}
</style>
