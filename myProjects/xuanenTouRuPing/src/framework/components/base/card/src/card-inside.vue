<template>
  <div class="nz-card" :class="[editable ? 'nz-editable-card' : '']">
    <!--遮罩-->
    <div class="nz-card-mask nz-card-mask-hover">
      <nz-switch class="nz-card-mask-btn"
                  active-text="显示"
                  inactive-text="隐藏"
                  active-color="#13ce66"
                  :value="visible"
                  @input="visibleChange"></nz-switch>
    </div>
    <div class="nz-card-mask" v-if="editable && !visible"></div>
    <!--头部-->
    <div class="nz-card-head clear">
      <!--标题-->
      <div class="nz-card-head-title">
        <p class="nz-card-head-title-main" :title="title" :style="{lineHeight: subTitle ? '35px' : '50px'}">{{title}}</p>
        <p class="nz-card-head-title-sub" :title="subTitle" v-if="subTitle!=''">{{subTitle}}</p>
      </div>
      <!--右上方操作区-->
      <div class="nz-card-head-operate" v-if="headOperates">
        <nz-dropdown trigger="click"
                      @command="handleDropdownCommand"
                      style="display: inline">
          <i class="nz-icon-operate"></i>
          <nz-dropdown-menu slot="dropdown" class="nz-card-dropdown-menu">
            <nz-dropdown-item v-for="(value, key) in headOperates" :key="key" :command="key">{{key}}
            </nz-dropdown-item>
          </nz-dropdown-menu>
        </nz-dropdown>
      </div>
    </div>
    <!--内容区-->
    <div class="nz-card-content" :class="formatStyle ? 'nz-card-format' : ''"
         v-loading="status === 'loading'"
         element-loading-text="数据加载中...">
      <slot></slot>
    </div>
    <!--底部操作区-->
    <div class="nz-card-footer clear">
      <!--左侧操作区-->
      <div style="float: left; box-sizing: border-box;">
        <slot name="bottomLeftOperate"></slot>
      </div>
      <!--右侧操作区-->
      <div style="float: right; box-sizing: border-box;">
        <slot name="bottomRightOperate"></slot>
      </div>
    </div>
    <div v-show="status==='empty'" class="nz-card-status">
      <div class="nz-img-nodata nz-card-status-img"></div>
      <p>暂无数据</p>
    </div>
    <div v-show="status==='error'" class="nz-card-status">
      <div class="nz-img-error nz-card-status-img"></div>
      <p>数据异常</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      /**
       * 标题
       */
      title: {
        type: String
      },
      /**
       * 副标题
       */
      subTitle: {
        type: String
      },
      /**
       * 是否可编辑
       */
      editable: {
        type: Boolean
      },
      /**
       * 状态 可选值：loading、ready、empty、error
       */
      status: String,
      /**
       * 格式化样式
       */
      formatStyle: Boolean,
      /**
       * 右上角操作项
       */
      headOperates: Object,
      /**
       * 是否显示
       */
      visible: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      //处理下拉框事件
      handleDropdownCommand(command){
        if (this.headOperates && this.headOperates[command] && typeof this.headOperates[command] === 'function') {
          this.headOperates[command]();
        }
      },
      //显示/隐藏 切换
      visibleChange(val){
        this.$emit('visibleChange', val);
      }
    }
  };
</script>

<style rel='stylesheet/less' lang='less'>
  @import "../../../../assets/css/config";

  @cardColor: #00a88a;
  @cardHeight: 100%;
  .nz-card {
    height: @cardHeight;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 0 8px #bbb;
    box-sizing: border-box;
    // border-top: 3px solid @cardColor;
    z-index: 5;
    transition: box-shadow 0.3s ease;
    position: relative;

    &:hover {
      box-shadow: 2px 2px 16px #bbb;
    }
  }

  .nz-card-mask {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: rgba(230, 230, 230, 0.5);
    z-index: 6;
  }

  .nz-card-mask-hover {
    display: none;
    z-index: 7;
    background: rgba(255, 255, 255, 0.5);

    .nz-card-mask-btn {
      position: absolute;
      right: 12px;
      top: 12px;
    }
  }

  .nz-card-head {
    position: relative;
    height: 50px;
    color: #333;
    font-size: 16px;
    padding: 0 15px;
    box-sizing: border-box;
    user-select: none;
  }

  .nz-card-head-title {
    width: 100%;
    box-sizing: border-box;
    padding-right: 35px;

    .nz-card-head-title-main {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      &:before {
        content: '';
        display: inline-block;
        width: 6px;
        height: 6px;
        background: @cardColor;
        border-radius: 50%;
        margin-right: 10px;
      }
    }

    .nz-card-head-title-sub {
      font-size: 13px;
      color: #aaa;
      line-height: 15px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .nz-card-head-operate {
    position: absolute;
    top: 0;
    right: 15px;
    line-height: 50px;

    i {
      font-size: 19px;
      color: #aaa;
      cursor: pointer;
    }

    i:hover {
      color: @primaryColor;
    }
  }

  .nz-card-dropdown-menu {
    min-width: 80px;
    text-align: center;
    border-radius: 3px;
    padding: 2px 0;
    border: 1px solid #ddd;
    color: #666;
  }

  .nz-card-content {
    position: relative;
    height: @cardHeight - 50 - 40 - 4;
    width: 100%;
    padding: 10px 15px;
    box-sizing: border-box;
    font-size: 14px;
    color: #333;
  }

  .nz-card-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40px;
    line-height: 40px;
    background: #f9f9f9;
    border-top: 1px solid #eee;
    box-sizing: border-box;
    border-radius: 0 0 4px 4px;
    padding: 0 15px;
    user-select: none;
  }

  .nz-card-status {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 40px;
    top: 50px;
    z-index: 4;
    text-align: center;
    color: #aaa;
    background: #fff;
  }

  .nz-card-status-img {
    width: 150px;
    height: 150px;
    margin: 0 auto 0 auto;
  }

  .nz-card-format {
    * {
      font-size: 14px !important;
      color: #333 !important;
      background-color: transparent !important;
      font-weight: normal !important;
      font-style: normal !important;
    }

    img {
      display: none !important;
    }
  }

  .nz-editable-card {
    border-left: 1px dashed @primaryColor;
    border-right: 1px dashed @primaryColor;
    border-bottom: 1px dashed @primaryColor;

    &:hover{
      .nz-card-mask-hover {
        display: block;
      }
    }
  }
</style>
