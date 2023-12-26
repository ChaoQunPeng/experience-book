<!--
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2023-12-26 14:52:27
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2023-12-26 21:15:10
 * @FilePath: /experience-book/src/views/daily-complete/daily-complete-index.vue
 * @Description: 
-->
<template>
  <div>
    <div class="flex mr-0 ml-4 mt-0">asdsd</div>
    <a-row :gutter="20">
      <a-col v-for="item in listData" :key="item.key" :span="6">
        <a-card :title="item.name">
          <template #extra>
            <a-dropdown :trigger="['click']">
              <span>
                <a-icon type="more" />
              </span>
              <a-menu slot="overlay">
                <a-menu-item key="0"> 编辑 </a-menu-item>
                <a-menu-item key="1"> 删除 </a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>

          <a-checkbox :default-checked="item.status == 1" @change="statusOnChange($event, item)">
            完成打卡 {{ item.status }}
          </a-checkbox>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { Api } from '../../api/index';

export default {
  name: 'daily-complete-index',

  // components:{},

  // props: {},

  data() {
    return {
      listData: []
    };
  },

  // computed: {},

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
    },
    statusOnChange(e, item) {
      console.log(e.target.checked);
      console.log(item);
      item.status = e.target.checked ? 1 : 0;
    }
  }

  // watch: {},

  // filters: {},
};
</script>

<style lang="less" scoped>
::selection {
  background: var(--primary);
  color: #fff;
}

/deep/ .ant-checkbox-wrapper {
  width: 100%;
  padding: 20px;
}

/deep/ .ant-card-body {
  padding: 0;
}
</style>
