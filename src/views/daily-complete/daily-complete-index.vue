<!--
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2023-12-26 14:52:27
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2023-12-30 15:57:54
 * @FilePath: /experience-book/src/views/daily-complete/daily-complete-index.vue
 * @Description: 
-->
<template>
  <div class="mt-15 overflow-x-hidden">
    <a-tabs class="mb-30 px-30" v-model="activeKey" default-active-key="all" @change="tabOnChange">
      <a-tab-pane key="incomplete" :tab="'待打卡 ' + listData.filter(e => !e.todayPunchStatus).length"> </a-tab-pane>
      <a-tab-pane key="completed" :tab="'已打卡 ' + listData.filter(e => e.todayPunchStatus).length"> </a-tab-pane>
      <!-- <a-tab-pane key="all" :tab="'全部 ' + listData.length"> </a-tab-pane> -->

      <a-button slot="tabBarExtraContent" type="primary" @click="add">新增</a-button>
    </a-tabs>

    <a-row class="px-30" :key="rowKey" :gutter="30">
      <a-col v-for="(item, index) in resolveListData" :key="item.id" :span="6" class="mb-30">
        <a-card>
          <template #title>
            <span class="text-size-18 text-black select-none">{{ item.name }}</span>
            <span class="text-size-14 text-black-85 font-normal ml-8 select-none">
              打卡:<span class="font-normal">{{ item.punchList.length }}</span
              >次
            </span>
          </template>
          <template #extra>
            <a-dropdown :ref="'dropdown_' + index" :trigger="['click']" v-model="item.visible">
              <span class="cursor-pointer">
                <a-icon type="more" />
              </span>
              <a-menu slot="overlay" @click="onClick($event, item)">
                <a-menu-item key="edit"> 编辑 </a-menu-item>
                <a-menu-item key="delete">
                  <a-popconfirm
                    placement="bottom"
                    title="Are you sure delete this task?"
                    ok-text="Yes"
                    cancel-text="No"
                    @confirm="confirm(item, index)"
                    @cancel="cancel(item)"
                  >
                    删除
                  </a-popconfirm>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>

          <div class="absolute left-12 top-16 text-black-65 select-none">
            开始于：{{ item.createTime | dateFormat('YYYY-MM-DD') }}
          </div>

          <div>
            <a-calendar :ref="'calendar_' + item.id" :key="item.id" class="a-calendar" :fullscreen="false">
              <!-- <template #headerRender="{ value, type, onChange, onTypeChange }">
                <div class="header">
                  1
                </div>
              </template> -->

              <div
                class="flex flex-col items-center justify-center select-none cursor-pointer"
                slot="dateFullCellRender"
                slot-scope="value"
              >
                <span class="flex items-center justify-center day-value" :class="resolveShowPunch(value, item)">
                  {{ parseDate(value) }}
                </span>

                <!-- <span>缺卡</span> -->
              </div>
            </a-calendar>
          </div>

          <a-checkbox
            class="text-center"
            :default-checked="resolveDefaultChecked(item)"
            @change="statusOnChange($event, item)"
          >
            完成打卡
          </a-checkbox>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import { Api } from '../../api/index';

export default {
  name: 'daily-complete-index',

  // components:{},

  // props: {},

  data() {
    return {
      listData: [],
      value: '',
      visible: false,
      rowKey: 0,
      activeKey: 'incomplete'
    };
  },

  computed: {
    resolveListData() {
      if (this.activeKey == 'all') {
        return this.listData;
      } else if (this.activeKey == 'completed') {
        return this.listData.filter(e => e.todayPunchStatus);
      } else {
        return this.listData.filter(e => !e.todayPunchStatus);
      }
    },
    resolveDefaultChecked() {
      return function (item) {
        let res = item.punchList.findIndex(e => e.createTime == dayjs().format('YYYY-MM-DD'));
        return res > -1;
      };
    },
    parseDate() {
      return function (value) {
        return dayjs(value).format('D');
      };
    },
    resolveShowPunch() {
      return function (value, item) {
        const currentCellDate = dayjs(value).format('YYYY-MM-DD');

        let index = item.punchList.findIndex(e => dayjs(e.createTime).format('YYYY-MM-DD') == currentCellDate);

        if (index > -1) {
          return 'punched';
        }
      };
    }
  },

  created() {
    this.getList();
  },

  // mounted() {},

  methods: {
    tabOnChange(key) {
      console.log(key);
    },
    async getList() {
      let res = await Api.dailyComplete.getList().catch(err => {
        console.error(err);
      });

      this.listData = res.data;

      this.rowKey++;

      // this.visible = false;

      // await this.$nextTick();

      // this.visible = true;
    },
    async add() {
      this.$info({
        title: '新增',
        closable: true,
        content: () => <a-input vModel={this.value} placeholder="打卡事项名称" />,
        onOk: async () => {
          await Api.dailyComplete
            .add({
              name: this.value
            })
            .catch(err => {
              console.error(err);
            });

          this.value = '';
          this.getList();
        },
        onCancel() {}
      });

      this.getList();
    },
    async changeStatus(id, body) {
      let result = await Api.dailyComplete.changeStatus(id, body).catch(err => {
        console.error(err);
      });

      if (result) {
      }
    },
    async delete(id) {
      let result = await Api.dailyComplete.delete(id).catch(err => {
        console.error(err);
      });

      if (result) {
      }
    },
    async edit(id, body) {
      let result = await Api.dailyComplete.edit(id, body).catch(err => {
        console.error(err);
      });

      if (result) {
      }
    },
    async statusOnChange(e, item) {
      item.status = e.target.checked ? 1 : 0;

      await this.changeStatus(item.id, { status: item.status });
      this.getList();
    },
    async confirm(item, index) {
      await this.delete(item.id);
      this.getList();
      item.visible = false;
    },
    cancel(item) {
      item.visible = false;
    },
    onClick(e, item) {
      if (e.key == 'delete') {
        return;
      }

      if (e.key == 'edit') {
        item.visible = false;

        this.value = item.name;

        this.$info({
          title: '编辑',
          closable: true,
          content: () => <a-input vModel={this.value} placeholder="打卡事项名称" />,
          onOk: async () => {
            await this.edit(item.id, { name: this.value });
            this.value = '';
            this.getList();
          },
          onCancel() {}
        });
      }
    }
  }

  // watch: {},

  // filters: {},
};
</script>

<style id="DAILY" lang="less">
::selection {
  // background: #16a085 !important;
  // color: #fff;
}
</style>

<style lang="less" scoped>
/deep/ .ant-tabs {
  .ant-tabs-bar {
    margin-bottom: 0;
  }
  .ant-tabs-nav .ant-tabs-tab {
    padding: 12px 0;
  }
}

/deep/ .ant-card {
  border-radius: 12px;

  .ant-card-head {
    padding: 0 15px;
  }

  .ant-card-body {
    position: relative;
    padding: 0;
  }
}

/deep/ .ant-checkbox-wrapper {
  width: 100%;
  padding: 20px;
  border-top: 1px solid #e8e8e8;

  > span {
    user-select: none;
  }
}

/deep/ .ant-radio-group-small {
  display: none;
}

/deep/ .a-calendar {
  .ant-fullcalendar-header {
    position: relative;
    padding: 15px 12px;
  }

  .ant-fullcalendar-value {
    color: rgba(36, 48, 66, 0.4);
    background: rgba(243, 247, 251, 0.7);
    border-radius: 50%;
    font-weight: 300;
  }

  .ant-fullcalendar-selected-day .ant-fullcalendar-value {
    color: #fff;
    background: #1890ff;
  }

  .ant-fullcalendar-calendar-body {
    padding: 8px 5px;
  }

  .ant-fullcalendar table {
    height: auto;
  }

  .ant-fullcalendar td {
    // vertical-align: top;
    height: 30px;
  }

  .ant-fullcalendar-column-header-inner {
    user-select: none;
  }

  .ant-fullcalendar-last-month-cell,
  .ant-fullcalendar-next-month-btn-day {
    color: rgba(0, 0, 0, 0.25);

    .day-value {
      background: #fff !important;
    }
  }

  .ant-fullcalendar-cell {
    .day-value {
      background: rgba(243, 247, 251, 0.7);
      color: rgba(36, 48, 66, 0.4);
    }
  }

  .day-value {
    width: 25px;
    height: 25px;
    border-radius: 10px;

    &.punched {
      background-color: #1890ff;
      color: #fff !important;
    }
  }

  .ant-fullcalendar-today {
    .day-value {
      border: 1px solid #1890ff;
      color: #1890ff;
    }
  }
}
</style>
