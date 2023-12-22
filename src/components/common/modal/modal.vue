
<script>
export default {
  name: 'qf-Modal',
  data() {
    return {
      el: null
    };
  },
  model: {
    prop: ['visible']
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Title'
    },
    okText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    title: {
      type: Object | Function
    },
    body: {
      type: Object | Function
    },
    footer: {
      type: Object | Function
    },
    onOk: {
      type: Function
    },
    onCancel: {
      type: Function
    }
  },
  created() {
    // 这个为true说明是通过this.$modal()方式调用的
    if (this.isPluginCall) {
      document.addEventListener('keydown', this.escEvent);
    }
  },
  methods: {
    ok() {
      this.$emit('ok');
    },
    cancel() {
      // 标签调用组件必须要监听cancel事件，否则不予操作
      if (this.$listeners.hasOwnProperty('cancel') || this.isPluginCall) {
        this.close();
      }
    },
    // el 整个modal
    close(el) {
      const element = el && el instanceof HTMLElement ? el : this.$el;

      // 突然不需要这个函数了
      // const getElement = () => {
      //   if (el && el instanceof HTMLElement) {
      //     return el;
      //   } else if (this.$el.nodeName == '#comment') {
      //     return this.el;
      //   } else {
      //     return this.$el;
      //   }
      // };
      // let element = getElement();

      const modalShade = element.firstElementChild;
      const modalContent = element.lastElementChild;

      modalShade.classList.replace('modal-shade-fadeIn', 'modal-shade-fadeOut');
      modalContent.classList.replace('modal-content-in', 'modal-content-out');

      document.removeEventListener('keydown', this.escEvent);

      setTimeout(() => {
        this.$emit('cancel', !this.visible);
        // 这个为true说明是通过this.$modal()方式调用的
        if (this.isPluginCall) {
          this.$destroy();
        }
      }, 400); // 400ms,比渐入渐出的动画多100ms，等动画执行完毕才销毁
    },
    escEvent(e) {
      if (e.key == 'Escape') {
        this.cancel();
      }
    }
  },
  watch: {
    visible: function(val) {
      if (val) {
        document.addEventListener('keydown', this.escEvent);
      } else {
        document.removeEventListener('keydown', this.escEvent);
        // this.$el 这个动画不知道要不要做
        const element = this.$el;

        const modalShade = element.firstElementChild;
        const modalContent = element.lastElementChild;

        modalShade.classList.replace(
          'modal-shade-fadeIn',
          'modal-shade-fadeOut'
        );
        modalContent.classList.replace('modal-content-in', 'modal-content-out');
      }
    }
  },
  destroyed() {
    this.$el.remove();
  },
  render: function(h, context) {
    const vm = this;
    const {
      ok,
      cancel,
      okText,
      cancelText,
      close,
      $slots,
      onOk,
      onCancel
    } = this;

    let title, body, footer;

    const ModalHeader = () => {
      return (
        <div class="modal-header">
          {title}
          <span
            class="iconfont icon-times modal-close-btn"
            onClick={cancel}
          ></span>
        </div>
      );
    };

    const ModalBody = () => {
      const maxHeight = window.innerHeight - 200 + 'px';
      const style = {
        'max-height': maxHeight
      };

      return (
        <div style={style} class="modal-body">
          {body}
        </div>
      );
    };

    const ModalFooter = () => {
      return <div class="modal-footer">{footer}</div>;
    };

    const ModalFooterBtns = (
      <div>
        <button v-pcq-button onClick={onCancel || cancel}>
          {cancelText}
        </button>
        &nbsp;
        <button v-pcq-button btnType="primary" onClick={onOk || ok}>
          {okText}
        </button>
      </div>
    );

    title = getContent(this.title, 'title');
    body = getContent(this.body, 'default');
    footer = getContent(this.footer, 'footer');

    function getContent(obj, slotName) {
      if (isVNode(obj)) {
        return obj;
      } else if (typeof obj === 'function') {
        return obj();
      } else if (typeof obj === 'string') {
        return obj;
      } else if (typeof obj === 'undefined') {
        // 没有任何参数的情况下
        if ($slots[slotName]) {
          return $slots[slotName];
        } else if (slotName == 'footer') {
          return ModalFooterBtns;
        }
      }
    }

    function isVNode(obj) {
      let vnode = vm.$createElement('div', '');
      let VNode = vnode.constructor;
      const isVNode = obj => obj instanceof VNode;
      return isVNode(obj);
    }

    /**
     * 这里this输出是 Proxy [[Handler]]: Object [[Target]]: VueComponent [[IsRevoked]]: false
     * 但是 this.$data this.$slot 这些还是指向当前的Vue实例
     */
    // console.log(this);

    const Modal = () => {
      return (
        <div class="modal">
          <div
            class="modal-shade modal-shade-fadeIn"
            onClick={() => cancel(this.$el)}
          ></div>
          <div class="modal-content modal-content-in" style="min-height:50px;">
            {title ? <ModalHeader /> : null}
            <ModalBody />
            {footer ? <ModalFooter /> : null}
          </div>
        </div>
      );
    };

    if (this.visible) {
      return <Modal />;
    }
  }
};
</script>