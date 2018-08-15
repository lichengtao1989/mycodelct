<template>
  <div :id="dialogId" class="cjm-dialog-wrap" v-if="rendered" v-show="visible" @mouseup="onMouseUp" :class="[size]">
    <div class="dialogContent" :style="[dialogStyle,dialogMoveStyle]" ref="dialogContent" :class="[dialogClass, {'cjm-tabDialog':type==='tab'}, {'cjm-stepDialog':type==='step'}]">
      <span class="el-icon-close cjm-dialog-close" @click.stop="handleClose()" :style="closeBtnStyle"></span>
      <div class="cjm-dialog-head" ref="dialogHead" v-if="type!='tab'" @mousedown="onMouseDown">
        <span class="cjm-dialog-head-title" v-if="type!='step'">{{title}}</span>
      </div>
      <div class="cjm-dialog-body-panel" :style="bodyPanelStyle">
        <div class="cjm-dialog-body" :style="bodyStyle" ref="dialogBody" @mousedown="onMouseDown">
          <slot></slot>
        </div>
      </div>
      <div class="cjm-dialog-footer" v-if="showFooter" ref="dialogFooter">
        <slot name="footer">
          <cjm-button type="primary" @click="okButtonClick()" :loading="okButtonLoading">
            <i class="cjm-icon-confirm"></i>确定
          </cjm-button>
          <cjm-button @click="cancelHandler()" :disabled="okButtonLoading">
            <i class="cjm-icon-close"></i>取消</cjm-button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import Popup from 'element-ui/lib/utils/popup';
import { on, off, once } from 'framework/utils/dom';

let dialogId = 1;
/**
 * 弹框组件
 */
export default {
  name: 'cjm-dialog',
  mixins: [Popup],
  data() {
    return {
      dialogId: '',
      fitWindow: false,
      dialogClass: 'cjm-dialog-content-pop',
      minDialogHeight: 400,
      dialogHeight: 0,
      headHeight: 60,
      bodyHeight: 0,
      footerHeight: 60,
      dialogStyle: {},
      bodyPanelStyle: {},
      bodyStyle: {},
      dialogMoveStyle: {},
      closeBtnStyle: {},
      timer: null,
      //确认按钮等待状态
      okButtonLoading: false,
      //是否正在拖动
      isDragging: false,
      mx: 0,
      my: 0,
      dx: 0,
      dy: 0
    };
  },
  props: {
    /**
     * 是否需要遮罩 默认:true
     */
    modal: {
      default: true
    },
    /**
     * 弹框宽度 默认:middle
     */
    size: { type: String, default: 'middle' },
    /**
     * 弹框标题
     */
    title: {
      type: String
    },
    /**
     * 弹框高度，如果不设置，默认按照内容自适应。（Tab弹框必须指定高度）
     */
    height: {
      type: Number
    },
    /**
     * 确认按钮处理函数
     */
    okHandler: {
      type: Function,
      default: function(callback) {
        this.hide();
        callback();
      }
    },
    /**
     * 取消按钮处理函数
     */
    cancelHandler: {
      type: Function,
      default: function() {
        this.hide();
      }
    },
    /**
     * 是否显示footer 默认：true
     */
    showFooter: {
      type: Boolean,
      default: true
    },
    /**
     * 弹框类型，normal、tab、step
     */
    type: {
      type: String,
      default: 'normal'
    },
    /**
     * 关闭前触发，入参：callback，调用callback可关闭弹框
     */
    beforeClose: Function
  },
  watch: {
    visible(val) {
      this.$emit('update:visible', val);
      if (val) {
        this.$nextTick(() => {
          this.init();
          this.resetStyle();
          this.scrollToTop();
        });
      }
    }
  },
  methods: {
    init() {
      if (this.type === 'step') {
        this.$refs.dialogHead.appendChild(document.querySelector(`#${this.dialogId} .el-steps`));
        this.headHeight = 80;
      }
      if (this.height) {
        this.dialogHeight = this.height < this.minDialogHeight ? this.minDialogHeight : this.height;
        this.bodyHeight = this.dialogHeight - (this.type === 'tab' ? 0 : this.headHeight) - (this.showFooter ? this.footerHeight : 0);
      }
    },
    resetStyle() {
      if (!this.visible) {
        return;
      }
      if (!this.height) {
        this.bodyHeight = this.$refs.dialogBody.offsetHeight;
        this.dialogHeight = (this.type === 'tab' ? 0 : this.headHeight) + this.bodyHeight + (this.showFooter ? this.footerHeight : 0);
        this.dialogHeight = this.dialogHeight < this.minDialogHeight ? this.minDialogHeight : this.dialogHeight;
      }
      let bodyClientHeight = Math.max(document.body.clientHeight, window.innerHeight);
      if (this.dialogHeight < bodyClientHeight) {
        // 当弹窗高度<body可视高度时
        this.fitWindow = false;
        this.dialogClass = 'cjm-dialog-content-pop';
        this.dialogStyle = { height: this.dialogHeight + 'px' };
        this.bodyPanelStyle = {};
        this.bodyStyle = {};
        if (this.height) {
          this.bodyStyle.overflowY = 'auto';
          if (this.type === 'tab') {
            let tabContent = document.querySelector(`#${this.dialogId} .el-tabs__content`);
            if (tabContent) {
              tabContent.style.height = this.height - this.headHeight - this.footerHeight + 'px';
              tabContent.style.minHeight = 'auto';
            }
          } else {
            this.bodyStyle.height = this.bodyHeight + 'px';
          }
        }
        this.closeBtnStyle = {};
      } else {
        this.fitWindow = true;
        this.dialogClass = 'cjm-dialog-content';
        this.dialogMoveStyle = {}; //窗口默认位置居中
        let margin = (window.innerWidth - this.$refs.dialogBody.offsetWidth) / 2;
        this.dialogStyle = {margin: '0 ' + margin + 'px', overflow: 'hidden'};
        this.bodyPanelStyle = {
          top: this.headHeight + 'px',
          bottom: this.footerHeight + 'px',
          position: 'absolute',
          overflow: 'auto'
        };
        this.bodyStyle = {
          paddingTop: 20 + 'px',
          paddingBottom: 20 + 'px'
        };
        if (this.type === 'tab') {
          this.bodyStyle.paddingTop = '0';
          this.bodyStyle.paddingBottom = '0';
          document.querySelector(`#${this.dialogId} .el-tabs__content`).style.height = 'auto';
          document.querySelector(`#${this.dialogId} .el-tabs__content`).style.minHeight = '100%';
        }
        this.closeBtnStyle = {
          marginRight: margin + 'px'
        };
      }
    },
    /**
     * 滚动到页面顶部
     */
    scrollToTop() {
      this.$refs.dialogContent.scrollTop = 0;
      this.$refs.dialogBody.scrollTop = 0;
    },
    handleClose() {
      if (typeof this.beforeClose === 'function') {
        this.beforeClose(() => {
          this.hide();
          this.$emit('close');
        });
      } else {
        this.hide();
        this.$emit('close');
      }
    },
    hide() {
      this.dialogMoveStyle = {}; //窗口默认位置居中
      this.dialogClass = 'cjm-dialog-content-pop';
      this.dialogHeight = 0;
      this.$emit('update:visible', false);
      this.$emit('visible-change', false);
    },
    /**
     * 确认按钮点击事件
     */
    okButtonClick() {
      this.okButtonLoading = true;
      this.okHandler(() => {
        this.okButtonLoading = false;
      });
    },
    /**
     * 鼠标按下
     */
    onMouseDown(event) {
      if (this.dialogClass !== 'cjm-dialog-content-pop') {
        return;
      }

      var e = event || window.event;
      if (
        e.target.className.indexOf('el-tabs__nav-scroll') >= 0 ||
        e.target.className.indexOf('el-tabs__nav') >= 0 ||
        e.target.className.indexOf('cjm-dialog-head') >= 0 ||
        e.target.className.indexOf('cjm-dialog-head-title') >= 0 ||
        e.target.className.indexOf('el-step__title') >= 0 ||
        e.target.className.indexOf('el-step__head') >= 0
      ) {
        this.mx = e.pageX; //点击时鼠标X坐标
        this.my = e.pageY; //点击时鼠标Y坐标
        this.dx = this.$el.getElementsByClassName('dialogContent')[0].offsetLeft;
        this.dy = this.$el.getElementsByClassName('dialogContent')[0].offsetTop;

        on(document, 'mousemove', this.onMouseMove);
        once(document, 'mouseup', this.onMouseUp);

        this.isDragging = true; //标记对话框可拖动，最小高度不可拖动
      }
    },
    /**
     * 鼠标移动
     */
    onMouseMove(event) {
      if (!this.isDragging) {
        return;
      }

      let e = event || window.event;
      let x = e.pageX; //移动时鼠标X坐标
      let y = e.pageY; //移动时鼠标Y坐标
      let moveX = this.dx + x - this.mx; //移动后对话框新的left值
      let moveY = this.dy + y - this.my; //移动后对话框新的top值

      moveX = moveX < -600 ? -600 : moveX;
      let maxX = window.innerWidth - 100;
      moveX = moveX > maxX ? maxX : moveX;

      moveY = moveY < 0 ? 0 : moveY;
      let maxY = window.innerHeight - this.headHeight;
      moveY = moveY > maxY ? maxY : moveY;

      this.dialogMoveStyle = {
        left: moveX + 'px', //重新设置对话框的left
        top: moveY + 'px', //重新设置对话框的top
        bottom: 'auto',
        right: 'auto'
      };
    },
    /**
     * 鼠标离开
     */
    onMouseUp() {
      off(document, 'mousemove', this.onMouseMove);
      this.isDragging = false;
    }
  },
  created() {
    this.dialogId = 'cjm_dialog_' + dialogId++;
  },
  mounted() {
    this.$el = document.body.appendChild(this.$el);

    this.timer = setInterval(() => {
      this.resetStyle();
    }, 100);
    on(window, 'resize', this.resetStyle);
  },
  beforeDestroy() {
    if (this.$el.parentNode == document.body) {
      document.body.removeChild(this.$el);
    }
    clearInterval(this.timer);
    off(window, 'resize', this.resetStyle);
  }
};
</script>

<style rel='stylesheet/less' lang='less'>
@import '../../../../assets/css/config';

@dialogBackground: #fff;
@dialogWidth: 700px;
@smallDialogWidth: 400px;
@dialogHeadHeight: 60px;
@dialogHeadHeight_step: 80px;
@dialogPaddingLR: 20px;
.cjm-dialog-wrap {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  box-sizing: border-box;
  overflow:hidden;
}

.cjm-dialog-content {
  position: relative;
  overflow: auto;
  height: 100%;
  box-sizing: border-box;

  .cjm-dialog-close {
    position: fixed;
  }

  .cjm-dialog-head {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }

  .cjm-dialog-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .cjm-dialog-body {
    min-height: 100%;
  }
}

.cjm-dialog-content-pop {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  box-sizing: border-box;
  width: @dialogWidth;
  margin: auto;
  box-sizing: border-box;

  .cjm-dialog-close {
    position: absolute;
  }

  .cjm-dialog-head {
    position: static;
    cursor: move;
  }

  .cjm-dialog-footer {
    position: static;
  }
}
.small .cjm-dialog-content-pop {
  width: @smallDialogWidth;
}
.cjm-dialog-head {
  width: @dialogWidth;
  margin: auto;
  height: @dialogHeadHeight;
  line-height: @dialogHeadHeight - 20;
  padding: 10px @dialogPaddingLR;
  background: #fff;
  z-index: 10;
  box-sizing: border-box;
  border-radius: 3px 3px 0 0;
  border-bottom: 1px solid #ddd;
  user-select: none;
}
.small .cjm-dialog-head {
  width: @smallDialogWidth;
}
.cjm-dialog-close {
  right: @dialogPaddingLR;
  top: 0;
  font-size: 22px;
  cursor: pointer;
  line-height: @dialogHeadHeight;
  z-index: 11;
  color: @ExtraLightBlack;

  &:hover {
    color: @primaryColor;
  }
}

.cjm-dialog-body {
  background: @dialogBackground;
  width: @dialogWidth;
  padding: 20px @dialogPaddingLR;
  box-sizing: border-box;
  margin: auto;
  overflow-x: hidden;
}
.small .cjm-dialog-body {
  width: @smallDialogWidth;
}
.cjm-dialog-footer {
  width: @dialogWidth;
  margin: auto;
  padding: 12px @dialogPaddingLR;
  z-index: 10;
  text-align: right;
  background: @ExtraLightGray;
  box-sizing: border-box;
  border-radius: 0 0 3px 3px;

  .el-button {
    padding-left: 25px;
    padding-right: 25px;
  }
}
.small .cjm-dialog-footer {
  width: @smallDialogWidth;
}
.cjm-tabDialog {
  .cjm-dialog-body {
    padding: 0;
    border-radius: 3px 3px 0 0;
    box-sizing: border-box;
  }

  .el-tabs__header {
    height: @dialogHeadHeight;
    line-height: @dialogHeadHeight;
    margin: 0;
    background: #fff;
    box-sizing: border-box;
    cursor: move;

    .el-tabs__nav-scroll {
      padding-left: 15px;
    }
  }

  .el-tabs__content {
    padding: 20px @dialogPaddingLR;
    box-sizing: border-box;
    overflow: auto;
    background: #fff;
  }
}
.cjm-dialog-body-panel{
  width:100%;
}
.cjm-tabDialog.cjm-dialog-content {
  .el-tabs__header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: @dialogWidth;
    margin: 0 auto;
    z-index: 10;

    .el-tabs__nav-scroll {
      padding-left: 15px;
    }
  }

  .el-tabs__content {
    padding-top: 80px;
    padding-bottom: 80px;
    overflow: hidden;
  }
}
.small .cjm-dialog-content {
  .el-tabs__header {
    width: @smallDialogWidth;
  }
}
.cjm-stepDialog {
  .cjm-dialog-head {
    padding-top: 15px;
    padding-bottom: 15px;
    height: @dialogHeadHeight_step;
    line-height: 0;
  }

  .cjm-dialog-close {
    line-height: @dialogHeadHeight_step;
  }
}
</style>
