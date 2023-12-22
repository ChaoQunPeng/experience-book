<template>
  <div style="background:#fff;margin-right: 30px;">
    <div class="title">{{generateTitle()}}</div>
    <h2 class="handle-bar float-right">
      <select
        v-model="skillIdValue"
        class="pcq-select"
        style="width:200px;"
        @change="skillIdChange"
      >
        <option value="0" label="全技能查询"></option>
        <option
          v-for="(skill,index) in skillList"
          :key="index"
          :value="skill.SkillID"
          :label="skill.Name"
        >{{skill.Name}}</option>
      </select>

      <input style="width:200px" class="pcq-input-month" type="month" v-model="searchKey" />

      <button
        v-pcq-button
        btnType="primary"
        @click="search"
        style="height: 36px;"
      >{{SEARCH_BTN_TEXT}}</button>
    </h2>

    <div style="margin-right:20px">
      <v-chart
        ref="chart"
        :forceFit="true"
        :height="height"
        :padding="padding"
        :data="data"
        :scale="scale"
      >
        <v-tooltip />
        <v-axis data-key="days" :label="label" :title="xAxisTitle" />
        <v-axis data-key="Exp" :label="label" :title="yAxisTitle" />
        <v-bar ref="bar" position="days*Exp" size="20"/>
        <v-legend data-key="days" />
      </v-chart>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
const data = [];

const scale = [
  {
    dataKey: 'days',
    type: 'time',
    tickCount: 32,
    formatter: val => {
      return dayjs(val).format('DD');
    }
  },
  {
    dataKey: 'Exp',
    min: 0,
    color: '#f00'
  }
];

const padding = {
  top: 20,
  right: 30,
  bottom: 80,
  left: 80
};

const label = {
  offset: 20
};

const xAxisTitle = {
  text: '日期',
  textStyle: {
    fill: '#666'
  }
};

const yAxisTitle = {
  text: '经验值',
  textStyle: {
    fill: '#666'
  }
};

export default {
  name: 'chart',
  data() {
    return {
      searchKey: '',
      data,
      scale,
      height: 500,
      padding,
      label,
      xAxisTitle,
      yAxisTitle,
      skillList: [],
      skillIdValue: 0,
      currentSelectedSkillName: '',
      currentExp: 0
    };
  },
  created() {
    this.searchKey = dayjs().format('YYYY-MM');
    this.getChartData();
    this.getSkillList();
  },
  methods: {
    clickBar(e,b) {
      console.log(e);
     console.log(b); 
    },
    search() {
      this.getChartData();
    },
    getChartData() {
      const year = dayjs(this.searchKey).year();
      const month = dayjs(this.searchKey).format('MM');
      const monthTotalDays = dayjs(this.searchKey)
        .endOf('month')
        .format('DD');

      this.scale[0].min = `${year}-${month}-01`;
      this.scale[0].max = `${year}-${month}-${monthTotalDays}`;

      let params = { year: year, month: month };

      if (this.skillIdValue) {
        params = { ...params, skillId: this.skillIdValue };
      }

      this.$axios
        .get(`/experience/total`, {
          params: params
        })
        .then(res => {
          this.data = res.data.data;

          for (let i = 0, item; (item = this.data[i]); i++) {
            this.currentExp += item.Exp;
          }

          this.xAxisTitle.text = `${this.currentSelectedSkillName ||
            '全技能'} 来自${params.year}年${params.month}月数据`;
        });
    },
    generateTitle() {
      const year = dayjs(this.searchKey).year();
      const month = dayjs(this.searchKey).format('MM');

      let title = `${this.currentSelectedSkillName ||
        ''} 在${year}年${month}月份 一共获得了 ${this.currentExp}exp`;

      return title;
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
    skillIdChange(event) {
      this.currentSelectedSkillName = this.skillList.filter(
        e => e.SkillID == event.target.value
      )[0].Name;
    }
  }
};
</script>

<style lang="less" scoped>
.title {
  padding: 25px 25px 0 25px;
  display: inline-block;
  font-size: 24px;
}

.handle-bar {
  padding: 25px 25px 0 25px;
}
</style>