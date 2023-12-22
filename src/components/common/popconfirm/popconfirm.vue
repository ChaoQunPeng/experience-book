<script>
export default {
  data() {
    return {
      isTrigger: false
    };
  },
  props: {
    content: {
      type: String | Object | Function
    }
  },
  methods: {
    ok() {
    },
    close() {
      this.$destroy();
    },
    prevent(event) {
      // 阻止父元素事件，防止父元素再次触发click事件
      event.stopPropagation();
    }
  },
  destroyed() {
    this.isTrigger = false;
    this.$el.remove();
  },
  render() {
    this.isTrigger = true;

    const footer = (
      <div class="pcq-popconfirm-footer">
        <button v-pcq-button btnSize="sm" onClick={this.close}>
          取消
        </button>
        <button v-pcq-button btnType="primary" btnSize="sm" onClick={this.ok}>
          确定
        </button>
      </div>
    );

    return (
      <div class="pcq-popconfirm-wrap">
        <div class="overlay"></div>
        <div class="pcq-popconfirm" onClick={this.prevent}>
          <div class="pcq-popconfirm-content">
            <i class="iconfont icon-question-circle color-blue mr-1"></i>
            {this.content}
          </div>
          {footer}
        </div>
        <span class="pcq-popconfirm-arrow"></span>
      </div>
    );
  }
};
</script>