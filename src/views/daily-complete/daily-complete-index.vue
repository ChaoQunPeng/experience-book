<!--
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2023-12-26 14:52:27
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2023-12-29 15:38:16
 * @FilePath: /experience-book/src/views/daily-complete/daily-complete-index.vue
 * @Description: 
-->
<template>
  <div>
    <a-button class="mb-30" type="primary" @click="add">新增</a-button>
    <a-row :key="rowKey" :gutter="20">
      <a-col v-for="(item, index) in listData" :key="item.id" :span="6" class="mb-30">
        <a-card :title="item.name">
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

          <div class="flex px-12 py-10">
            <div class="flex-1 font-bold">打卡次数：{{ item.punchList.length }}次</div>
            <div>创建时间：{{ item.createTime | dateFormat('YYYY-MM-DD') }}</div>
          </div>

          <div>
            <a-calendar :ref="'calendar_' + item.id" :key="item.id" class="a-calendar" :fullscreen="false">
              <template slot="dateCellRender" slot-scope="value">
                <!-- {{ parseDate(value) }} -->
                <span v-if="resolveShowPunch(value, item)" :key="'dateCellRender' + item.id">
                  <a-icon class="text-blue" :style="{ fontWeight: 'bold' }" type="check" />
                </span>
              </template>
            </a-calendar>
          </div>

          <a-checkbox :default-checked="resolveDefaultChecked(item)" @change="statusOnChange($event, item)">
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
      rowKey: 0
    };
  },

  computed: {
    resolveDefaultChecked() {
      return function (item) {
        let res = item.punchList.findIndex(e => e.createTime == dayjs().format('YYYY-MM-DD'));
        return res > -1;
      };
    },
    parseDate() {
      return function (value) {
        return dayjs(value).format('DD');
      };
    },
    resolveShowPunch() {
      return function (value, item) {
        const currentCellDate = dayjs(value).format('YYYY-MM-DD');

        return item.punchList.findIndex(e => dayjs(e.createTime).format('YYYY-MM-DD') == currentCellDate) > -1;
      };
    }
  },

  created() {
    this.getList();
  },

  // mounted() {},

  methods: {
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
/deep/ .ant-checkbox-wrapper {
  width: 100%;
  padding: 20px;
  border-top: 1px solid #e8e8e8;

  > span {
    user-select: none;
  }
}

/deep/ .ant-card-body {
  padding: 0;
}

/deep/ .ant-radio-group-small {
  display: none;
}

/deep/ .a-calendar {
  .ant-fullcalendar-header {
    padding: 0 12px 12px 12px;
  }
}
</style>
