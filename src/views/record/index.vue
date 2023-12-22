<template>
  <div>
    <h2 style="margin-bottom:20px;color:#183055;">{{skillName}}</h2>

    <label class="block">
      经验标题：
      <input
        v-pcq-input
        type="text"
        id="title"
        v-model="title"
        placeholder="标题"
        style="width:80%;"
      />
    </label>

    <label for>
      开始时间：
      <input
        v-pcq-input
        style="width: 240px;"
        type="datetime-local"
        v-model="startTime"
        @input="getExpByDiffTime"
      />
    </label>
    <label for>
      结束时间：
      <input
        v-pcq-input
        style="width: 240px;"
        type="datetime-local"
        v-model="endTime"
        @input="getExpByDiffTime"
      />
    </label>

    <label>
      经验值：
      <input
        v-pcq-input
        style="width: 240px;"
        type="number"
        v-model="exp"
        placeholder="经验值"
        min="0"
      />
    </label>

    <!-- <label>
      是否发布：<input type="checkbox" style="vertical-align: bottom;" />
    </label>-->

    <!-- <label>小时数：{{spendTime | toHour}}</label> -->

    <div style="margin-bottom:30px;margin-right:30px;">
      <ckeditor :editor="editor" v-model="content" @ready="ckReady"></ckeditor>
    </div>

    <button v-pcq-button btnType="primary" @click="plus1()">Plus 1</button>

    <button
      v-pcq-button
      v-pcq-popconfirm
      pcqPopconfirmTitle="确定要清空内容吗？"
      @onConfirm="clearForm"
    >重置所有内容</button>
    {{saveLocalTip}}
    <button
      v-pcq-button
      btnType="danger"
      v-pcq-popconfirm
      pcqPopconfirmTitle="确定要删除草稿吗？不能恢复哦~"
      @onConfirm="clearDraft"
      class="float-right mr-6"
    >清除此草稿</button>

    <!-- successModalVisible -->
    <modal :visible="successModalVisible" @cancel="handleSuccessModal">

      <record-success-info :total="totalExp" @ballAnimationEnd="ballAnimationEnd"></record-success-info>

      <template v-slot:footer>
        <div class="text-center">
          <button v-pcq-button btnType="primary" @click="handleSuccessModal">再接再厉!</button>
        </div>
      </template>
    </modal>
  </div>
</template>


<script>
import axios from 'axios';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import dayjs from 'dayjs';
import UploadAdapter from '@utils/ck-upload-adapter';
import LevelProgressBar from '@components/content/level-progress-bar/level-progress-bar.vue';
import RecordSuccessInfo from './record-success-info/record-success-info.vue';

export default {
  name: 'record',
  components: {
    LevelProgressBar,
    RecordSuccessInfo
  },
  data() {
    return {
      skillName: '',
      title: '',
      content: '',
      exp: 0,
      item: {},
      startTime: null,
      endTime: null,
      spendTime: 0,
      editor: ClassicEditor,
      isPosting: false, // 是否正在提交中，如果是，则阻止ctrl+s事件，不保存草稿
      actionTimer: null,
      actionTime: 0,
      saveLocalTip: '',
      draftLocalKey: 'RTU_DRAFT',
      successModalVisible: false,
      totalExp: 0,
      recordingItem: null // 正在记录的经验的数据
    };
  },
  created() {
    this.item = this.$route.params;
    this.skillName = this.$route.query.skillName;

    this.getRecordingItem();

    // window.onbeforeunload = function(e) {
    //   e = e || window.event;
    //   if (e) {
    //     // 按照标准取消事件
    //     e.returnValue = '';
    //   }
    //   // Chrome需要设置returnValue。
    //   e.preventDefault();
    //   return '';
    // };
    this.startTime = this.endTime = dayjs().format('YYYY-MM-DDTHH:mm');
    this.setLocalDraftToRecord();
  },
  mounted() {
    document.addEventListener('keydown', this.handleEvent);
    document.addEventListener('mousedown', this.handleEvent);

    this.setAutoSaveTimer();
  },
  methods: {
    ballAnimationEnd(e){
      console.log(e);
    },
    handleSuccessModal() {
      this.successModalVisible = !this.successModalVisible;
    },
    ckReady(editor) {
      editor.plugins.get('FileRepository').createUploadAdapter = loader => {
        return new UploadAdapter(loader);
      };
    },
    plus1(successInfo = '新增成功！') {
      if (!this.checkForm()) return;
      this.isPosting = true;
      axios
        .post(`experience/record`, {
          title: this.title,
          content: this.content,
          skillId: this.item.id,
          exp: this.exp,
          startTime: this.startTime,
          endTime: this.endTime
        })
        .then(res => {
          // this.$message.success(successInfo);

          this.successModalVisible = true;

          // 清除这个分类的草稿
          const skillName = this.$route.query.skillName;
          const draft = JSON.parse(localStorage.getItem(this.draftLocalKey));
          if (draft.hasOwnProperty(skillName)) {
            delete draft[skillName];
            localStorage.setItem(this.draftLocalKey, JSON.stringify(draft));
          }
          // 重新设置localStore里的RECORDING_ITEM。可能会有继续记录的情况，防止总经验值不准
          this.recordingItem.TotalExp = parseInt(
            this.totalExp + parseInt(this.exp)
          );

          // const expSpan = document.querySelector('#exp-animate');
          // const expSpa1n = document.getElementById('exp-animate');

          // this.$nextTick(() => {
          //   const expSpan = document.querySelector('#exp-animate');
          //   expSpan.classList.add('exp-animate');
          // });

          // setTimeout(() => {
          //   this.totalExp = this.recordingItem.TotalExp;
          // }, 1000); // 1000是动画效果的一半，用于在放到最大的时候变换数字

          localStorage.setItem(
            'RECORDING_ITEM',
            JSON.stringify(this.recordingItem)
          );
        })
        .catch(err => {
          this.$message.error(err.msg);
        })
        .finally(() => {
          this.isPosting = false;
        });
    },
    handleEvent(e) {
      this.actionTime = 0;

      if (this.isPosting) {
        e.preventDefault();
        return;
      }

      if (e.ctrlKey && e.key == 's') {
        this.saveDraftToLocal();
        e.preventDefault();
      }
    },
    // 保存草稿到本地
    saveDraftToLocal() {
      const store = JSON.parse(localStorage.getItem(this.draftLocalKey));

      const id = `ID_${new Date().getTime()}`;
      const data = {
        title: this.title,
        content: this.content,
        skillId: this.item.id,
        exp: this.exp,
        startTime: this.startTime,
        endTime: this.endTime,
        saveTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
      };

      const skillName = this.$route.query.skillName;
      store[skillName] = { id: id, data: data };

      localStorage.setItem('RTU_DRAFT', JSON.stringify(store));
      this.saveLocalTip = `草稿已于${dayjs().format(
        'YYYY-MM-DD HH:mm:ss'
      )}保存`;
    },
    // 设置本地草稿到记录页
    setLocalDraftToRecord() {
      let store = JSON.parse(localStorage.getItem(this.draftLocalKey));
      let skillName = this.$route.query.skillName;

      if (!store[skillName]) return;
      let draft = store[skillName].data;

      for (const key in draft) {
        this[key] = draft[key];
      }
    },
    // 设置自动保存的计时器
    setAutoSaveTimer() {
      this.actionTimer = setInterval(() => {
        this.actionTime++;
        // 每10秒保存一下
        if (this.actionTime % 10 == 0) {
          this.saveDraftToLocal();
        }
      }, 1000);
    },
    getExpByDiffTime() {
      let startTime = dayjs(this.startTime);
      let endTime = dayjs(this.endTime);
      const data = { month: 0, day: 0, hour: 0, minute: 0 };

      for (const unit in data) {
        data[unit] = endTime.diff(startTime, unit);
      }

      this.spendTime = data.minute;
      // 有些时候可能未满1个小时，按1点经验算
      if (data.hour == 0 && data.minute > 0) {
        this.exp = 1;
        return;
      }

      // 结束时间小于开始时间的话data.hour为负数，但是这里要显示为0
      if (data.hour < 0) {
        this.exp = 0;
        return;
      }

      // 以分钟为单位计入花费时间
      this.exp = data.hour;
    },
    checkForm() {
      if (this.title == '') {
        this.$message.warning('标题不能为空');
        return false;
      } else if (this.content == '') {
        this.$message.warning('内容不能为空');
        return false;
      } else {
        return true;
      }
    },
    clearForm() {
      this.title = null;
      this.startTime = dayjs().format('YYYY-MM-DDTHH:mm');
      this.endTime = dayjs().format('YYYY-MM-DDTHH:mm');
      this.exp = 0;
      this.content = '';
    },
    clearDraft() {
      const draftStore = JSON.parse(localStorage.getItem(this.draftLocalKey));
      delete draftStore[this.skillName];
      console.log(draftStore);
    },
    getRecordingItem() {
      this.recordingItem = JSON.parse(localStorage.getItem('RECORDING_ITEM'));
      this.totalExp = this.recordingItem.TotalExp;
    }
  },
  destroyed() {
    document.removeEventListener('keydown', this.handleEvent);
    window.onbeforeunload = function() {};
    clearInterval(this.actionTimer);
  }
};
</script>

<style lang="less" scoped>
</style>