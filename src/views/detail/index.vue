<template>
  <div class="detail">
    <!-- <router-link to="/home" replace>Go to Home</router-link> -->
    <div class="pcq-layout">
      <div style="width: 250px; margin-right: 30px">
        <div class="name text-center">{{ headline }}</div>

        <div class="halo">
          <p>{{ computeExp }}</p>
          <div></div>
        </div>

        <button v-pcq-button btnType="primary" class="block" @click="goRecord()">Level Up!</button>
      </div>
      <div style="background: #fff; flex: 1; padding: 20px; border-radius: 6px; display: flex">
        <div class="exp-container clearfix">
          <div v-for="(item, index) in items" :key="index" class="exp-container-item">
            <div class="exp-box">
              <div class="exp">{{ item.Exp }}</div>
            </div>
            <div style="flex: 1">
              <a class="title" @click="viewExp(item)">{{ item.Title }}</a>
              <a class="content" @click="viewExp(item)">{{ item.Content }}</a>
              <div class="date">
                <a @click="editExp(item)">编辑</a>
                |
                <a v-pcq-popconfirm pcqPopconfirmTitle="您确定要删除这条经验吗？" @onConfirm="confirmDel(item)">删除</a>
                |
                <a @click="handleModifyExpClassifyModel(item)">操作</a>
                |
                {{ item.CreateDate | dateFormat('YYYY-MM-DD') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <modal
      title="修改所属技能"
      :visible="modifyExpClassifyVisible"
      @ok="modfiyExpClassify"
      @cancel="handleModifyExpClassifyModel"
    >
      <div class="mb-3">经验名称：{{ expItem && expItem.Title }}</div>
      <select v-model="skillIdValue" class="pcq-select">
        <option value="0" disabled>选择新的所属分类</option>
        <option v-for="(skill, index) in skillList" :key="index" :value="skill.SkillID">{{ skill.Name }}</option>
      </select>
    </modal>
  </div>
</template>

<script>
import axios from 'axios';
import trimHtml from 'trim-html';

export default {
  name: 'detail',
  data() {
    return {
      items: [],
      title: '',
      content: '',
      headline: '',
      modifyExpClassifyVisible: false,
      skillList: [],
      skillIdValue: 0,
      expItem: null
    };
  },
  computed: {
    computeExp() {
      let exp = 0;
      this.items.forEach(e => {
        exp += e.Exp;
      });
      return exp;
    }
  },
  created() {
    this.initData();
    this.headline = this.$route.query.skillName;
  },
  methods: {
    confirmDel(item) {
      this.delExp(item);
    },
    initData() {
      let queryParamsId = this.$router.currentRoute.params['id'];

      this.items = [
        {
          Exp: 1,
          Title: 'sdfd',
          Content: 'asdas'
        },
        {
          Exp: 1,
          Title: 'sdfd',
          Content: 'asdas'
        }
      ];
      return;
      axios.get(`experience/${queryParamsId}`).then(res => {
        this.items = res.data.data;
        this.items.forEach(e => {
          e.Content = trimHtml(e.Content, {
            limit: 200,
            preserveTags: false
          }).html;

          e.Content = this.escape2Html(e.Content);
        });
      });
    },
    goRecord() {
      this.$router.push({
        name: `record`,
        query: {
          skillName: this.$route.query.skillName,
          totalExp: this.$route.query.totalExp
        }
      });
    },
    editExp(item) {
      this.$router.push({
        path: `/edit/${item.ExperienceID}`,
        params: {
          ...JSON.parse(JSON.stringify(item))
        },
        query: {
          skillName: this.$route.query.skillName
        }
      });
    },
    delExp(item) {
      axios.delete(`experience/${item.ExperienceID}`).then(
        res => {
          this.initData();
          this.$message.success(`删除成功！`);
        },
        err => {
          this.$message.error(`删除失败！`);
        }
      );
    },
    handleModifyExpClassifyModel(skill) {
      this.modifyExpClassifyVisible = !this.modifyExpClassifyVisible;
      if (this.modifyExpClassifyVisible) {
        this.editedExp = skill;
        this.getSkillList();
      }
    },
    getSkillList() {
      this.$axios
        .get(`/skill`)
        .then(res => {
          this.skillList = res.data.data;
        })
        .catch(err => {
          this.$message.error(`获取技能列表错误！`);
        });
    },
    modfiyExpClassify() {
      this.$axios
        .put(`/experience/modify/${this.editedExp.ExperienceID}`, {
          SkillID: this.skillIdValue
        })
        .then(res => {
          this.$message.success(`修改分类成功！`);
          this.modifyExpClassifyVisible = false;
          this.initData();
        })
        .catch(err => {
          this.$message.error(`修改分类失败！`);
        });
    },
    viewExp(item) {
      this.$router.push({
        // 如果提供了path params会自动忽略
        name: 'web-page',
        query: {
          expId: item.ExperienceID
        }
        // params: {
        //   ...item
        // }
      });
    },
    escape2Html(str) {
      var arrEntities = { lt: '<', gt: '>', nbsp: ' ', amp: '&', quot: '"' };
      return str.replace(/&(lt|gt|nbsp|amp|quot);/gi, function (all, t) {
        return arrEntities[t];
      });
    }
  }
};
</script>

<style lang="less" scoped>
.halo {
  position: relative;
  width: 160px;
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 50px auto 30px auto;

  p {
    position: absolute;
    font-size: 40px;
    font-weight: 700;
    color: var(--primary);
    z-index: 1000;
  }

  > div {
    position: absolute;
    font-size: 40px;
    font-weight: 700;
    border: 10px solid var(--primary);
    width: 160px;
    height: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    color: #183055;
    box-shadow: inset 0px 0px 2px 0px var(--primary);
    border-radius: 0 50% 50% 50%;
    transform: rotate(45deg);
  }
}

.name {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 20px;
}

.exp-container {
  flex: 1;
  padding-left: 20px;

  > span {
    float: left;
    border: 1px solid;
    width: 20px;
    text-align: center;
  }
}

.exp-container-item {
  position: relative;
  display: flex;
  background: #f1f1f1;
  min-height: 60px;
  border-radius: 6px;
  margin-bottom: 15px;
  padding: 15px;
  max-height: 135px;

  .exp-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90px;
    border: 3px solid;
    margin-right: 15px;
    height: 90px;
    border-radius: 50%;
    font-size: 40px;
  }

  .title {
    display: block;
    color: #333;
    font-size: 20px;
    margin-bottom: 10px;
    transition: all 0.3s;

    &:hover {
      color: var(--primary);
    }
  }

  .content {
    color: #666;
    font-size: 14px;
    line-height: 1.8;
    // 多行文字换行，兼容性不太好
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    transition: all 0.3s;

    &:hover {
      color: var(--primary);
    }
  }

  .date {
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 12px;
    color: #999;
    cursor: pointer;
  }
}
</style>
