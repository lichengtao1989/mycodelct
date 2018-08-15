<template>
  <div>
    <div class="head-notification" @mouseover="mouseOverHandler" @mouseout="mouseOutHandler">
      <p>
        <i class="cjm-icon-news"></i>
        <i class="cjm-icon-circle"></i>
      </p>
      <ul v-show="popVisible">
        <li v-for="item in items" @click="showNotification(item.notificationID)">
          <p class="head-notification-title">{{item.title}}</p>
          <p class="head-notification-time">{{item.createTime}}</p>
        </li>
      </ul>
    </div>
    <cjm-dialog :title="title" :visible.sync="dialogVisible" :showFooter="false">
      <div class="dialog-content">
        <div v-html="content"></div>
        <div class="dialog-content-time">{{time}}</div>
      </div>
    </cjm-dialog>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        popVisible: false,
        items: [],
        dialogVisible: false,
        title: '',
        content: '',
        time: '',
        timer: null
      }
    },
    methods: {
      mouseOverHandler(){
        this.popVisible = true;
        if (this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
        }
      },
      mouseOutHandler(){
        this.timer = setTimeout(()=> {
          this.popVisible = false;
        }, 100);
      },
      //显示弹窗
      showNotification(id){
        this.$ajax.get(this.$globalData.get('root', 'apiUrl').GET_NOTIFICATION, {notificationID: id}).then((r)=> {
          this.title = r.data.title;
          this.content = r.data.content;
          this.time = r.data.createTime;
          this.dialogVisible = true;
        }).catch(()=>{})
      }
    },
    created(){
      this.$ajax.get(this.$globalData.get('root', 'apiUrl').GET_NOTIFICATION_LIST, {pageSize: 5, pageNumber: 1}).then((r)=> {
        if(r.resultCode == '200'){
          this.items = r.data || [];
          if (this.items && this.items.length > 5) {
            this.items.length = 5;
          }
          this.$emit('initFinished', this.items);
        }
        this.$emit('initFinished', null);
      }).catch(()=> {
        this.$emit('initFinished', null);
      })
    }
  }
</script>

<style scoped rel='stylesheet/less' lang='less'>
  .head-notification {
    position: relative;
    display: inline-block;
    width: 37px;

    p {
      i.cjm-icon-news {
        position: relative;
        top: 2px;
        color: #fff;
        font-size: 20px;
      }
      i.cjm-icon-circle {
        position: relative;
        top: -10px;
        left: -4px;
        font-size: 8px;
        color: #ff9900;
      }
    }

    ul {
      position: absolute;
      right: -67px;
      top: 52px;
      width: 320px;
      z-index: 1000;
      border: 1px solid #ccc;
      box-shadow: 2px 2px 3px 0px #DEDDDD;
      background: #fff;
      border-radius: 5px;

      &:before {
        display: block;
        content: ' ';
        width: 0;
        height: 0;
        border-bottom: 10px solid #fff;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        top: -10px;
        position: absolute;
        left: 226px;
      }

      li {
        padding: 5px 10px;
        border-bottom: 1px dashed #ccc;

        &:last-child {
          border-bottom: none;
        }
      }

      li:hover {
        background: #f1f1f1;
      }
    }
  }

  .head-notification-title {
    font-size: 14px;
    line-height: 20px;
    color: #2D64B3;
  }

  .head-notification-time {
    font-size: 12px;
    line-height: 16px;
    color: #aaa;
  }

  .dialog-content {
    position: relative;
    min-height: 300px;
  }

  .dialog-content-time {
    position: absolute;
    right: 0px;
    bottom: 0px;
  }
</style>
