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

    <label for>
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
      是否发布：
      <input type="checkbox" style="vertical-align: bottom;" />
    </label>-->

    <!-- <label>小时数：{{spendTime | toHour}}</label> -->

    <div style="margin-bottom:30px">
      <ckeditor ref="ck" :editor="editor" v-model="content" @ready="ckReady"></ckeditor>
    </div>

    <button v-pcq-button btnType="primary" block @click="update()">Plus 1</button>
  </div>
</template>
	
<script>
import axios from 'axios';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import dayjs from 'dayjs';
import UploadAdapter from '@utils/ck-upload-adapter';

export default {
  name: 'edit',
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
      editedData: null,
      editor: ClassicEditor
    };
  },
  created() {
    this.getEditData(this.$route.params.experienceId);

    this.skillName = this.$route.query.skillName;

    window.onbeforeunload = function(e) {
      e = e || window.event;
      if (e) {
        // 按照标准取消事件
        e.returnValue = '';
      }
      // Chrome需要设置returnValue。
      e.preventDefault();
      return '';
    };
  },
  methods: {
    getEditData(experienceId) {
      axios
        .get(`experience/detail/${experienceId}`)
        .then(res => {
          this.editedData = res.data.data[0];
          this.title = this.editedData.Title;
          this.content = this.editedData.Content;
          this.startTime = dayjs(this.editedData.StartTime).format(
            'YYYY-MM-DDTHH:mm'
          );
          this.endTime = dayjs(this.editedData.EndTime).format(
            'YYYY-MM-DDTHH:mm'
          );
          this.exp = this.editedData.Exp;
        })
        .catch(err => {
          this.$message.error(`获取编辑数据错误！`);
        });
    },
    update() {
      if (!this.checkForm()) return;
      axios
        .put(`experience/${this.editedData.ExperienceID}`, {
          title: this.title,
          content: this.content,
          exp: this.exp,
          startTime: this.startTime,
          endTime: this.endTime
        })
        .then(
          res => {
            this.$message.success(`修改成功！`);
          },
          err => {
            this.$message.error(`修改失败！`);
          }
        );
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
    ckReady(editor) {
      editor.plugins.get('FileRepository').createUploadAdapter = loader => {
        return new UploadAdapter(loader);
      };
    }
  },
  destroyed() {
    window.onbeforeunload = function() {};
  }
};
</script>