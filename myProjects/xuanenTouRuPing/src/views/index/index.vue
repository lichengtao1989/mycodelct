<template>
  <div v-if="!isRole">
    <div class="left-list">
      <ul class="icon-list">
        <template v-for="item in menuList">
          <li :key="item.name" :style="'margin-bottom:'+imageMarginBottom+'px'">
            <img :src="item.icon" @click="checkMenu(item)" :style="'width:'+imageWidth+'px;height:'+imageHeight+'px;margin-top:'+imageMarginTop+'px;'" alt="">
            <span>{{item.name}}</span>
          </li>
        </template>
      </ul>
    </div>
    <div class="rigth-list">
      <nz-cards theme="theme1" style="padding: 0px 0px 0px 10px;">
        <nz-card title="系统通知" :style="'margin-bottom: 15px;width:100%;margin-top: -24px;height:'+cardHeight+'px'" @setup="setup">
          <div v-if="notification.length===0" style="text-align: center;font-size: 15px"><img src="../../../static/img/nodata.png" /></div>
          <div class="notification" v-for="(item,index) in notification" :key="item.newID" v-if="index < 10" @click="editBnt(item.newID,'1')">
            <div class="content-title" :style="'width:'+titleWidth+'px'">
              <a>{{item.title}}</a>
            </div>
            <div class="content-time">{{getlastUpdateTime(item.lastUpdateTime)}}</div>
          </div>
        </nz-card>
        <div class="nz-normal-card-wrap nz-card-wrap small" :style="'overflow: hidden;width:100%;height:'+cardHeight+'px'">
          <div class="nz-card">
            <div class="nz-card-mask nz-card-mask-hover">
              <nz-switch active-text="显示" inactive-text="隐藏" active-color="#13ce66" value="true" class="nz-card-mask-btn"></nz-switch>
            </div>
            <div class="nz-card-head clear" style="margin-bottom: 10px;">
              <div class="nz-card-head-title" style="width:100%;">
                <div class="new-title" :class="{'active':type== 2} " @click="setNewsype(2)">
                  <p title="农技知识">农技知识</p>
                </div>
                <div class="new-title" :class="{'active':type== 3} " @click="setNewsype(3)">
                  <p title="农技新闻">农技新闻</p>
                </div>
              </div>
            </div>
            <div class="nz-card-content">
              <div class="notification" v-for="(item,index) in information" :key="item.newID" v-if="type== 2 && index < 10" @click="detailsBnt(item.newID,'2')">
                <div class="content-title" :style="'width:'+titleWidth+'px'">
                  <a>{{item.title}}</a>
                </div>
                <div class="content-time">{{getlastUpdateTime(item.lastUpdateTime)}}</div>
              </div>
              <div class="notification" v-for="(item,index) in news" :key="item.newID" v-if="type== 3  && index < 10" @click="detailsBnt(item.newID,'3')">
                <div class="content-title" :style="'width:'+titleWidth+'px'">
                  <a>{{item.title}}</a>
                </div>
                <div class="content-time">{{getlastUpdateTime(item.lastUpdateTime)}}</div>
              </div>
            </div>
            <div class="nz-card-footer clear">
              <div style="float: left; box-sizing: border-box;"></div>
              <div style="float: right; box-sizing: border-box;">
                <button type="button" class="el-button el-button--text" @click="detailList">
                  <span>
                    <i class="nz-icon-more"></i>详情
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nz-cards>
    </div>
    <nz-dialog title="消息通知" ref="notificationDialog" :showFooter="false" :okHandler="editCustomerFirm" height="500">
      <notification ref="notification"></notification>
      <slot name="footer">
        <div class="footer">
          <nz-button @click="hide" style="margin-top: 20px;">
            <i class="nz-icon-close"></i>取 消
          </nz-button>
        </div>
      </slot>
    </nz-dialog>
  </div>
  <div v-else>
    <div class="default-home"><img src="/static/img/home.png" alt=""></div>
  </div>
</template>
<script>
import Cards from 'framework/components/base/cards';
import Card from 'framework/components/base/card';
import StackCard from 'framework/components/base/stack-card';
import NumberCard from 'framework/components/base/number-card';
import notification from './details.vue';
export default {
  components: {
    'nz-cards': Cards,
    'nz-card': Card,
    'nz-stack-card': StackCard,
    'nz-number-card': NumberCard,
    notification
  },
  data() {
    return {
      isRole: false,
      editable: false,
      boxWidth: 0,
      menuList: [
        { name: '销售', icon: '/static/img/home/sales.png', url: 'salesReceipt' },
        { name: '进货', icon: '/static/img/home/purchase.png', url: 'purchasePurchase' },
        { name: '添加商品', icon: '/static/img/home/add-commodity.png', url: 'productEdit' },
        { name: '库存', icon: '/static/img/home/instock.png', url: 'inventoryTable' },
        { name: '客户管理', icon: '/static/img/home/customer.png', url: 'customerList' },
        { name: '供应商', icon: '/static/img/home/supplier.png', url: 'supplierList' },
        { name: '销售查询', icon: '/static/img/home/sales-inquiry.png', url: 'salesAccount' },
        { name: '进货查询', icon: '/static/img/home/purchase-inquiry.png', url: 'purchaseAccount' },
        { name: '统计分析', icon: '/static/img/home/statistical-analysis.png', url: 'stayTuned' }
      ],
      type: 2,
      notification: [],
      information: [],
      news: []
    };
  },
  computed: {
    //图片宽
    imageWidth() {
      let fz = 30;
      fz = fz * (this.boxWidth / 400);
      fz = parseInt(fz);
      return fz;
    },
    //图片高
    imageHeight() {
      let fz = this.imageWidth;
      fz = parseInt(fz);
      return fz;
    },
    //偏移上
    imageMarginTop() {
      let fz = this.imageWidth / 3;
      fz = parseInt(fz);
      return fz;
    },
    //偏移下
    imageMarginBottom() {
      let fz = this.imageWidth / 3;
      fz = parseInt(fz);
      return fz;
    },
    cardHeight() {
      let fz = this.imageWidth * 3.24;
      fz = parseInt(fz);
      return fz;
    },
    titleWidth() {
      let fz = this.imageWidth * 2.5;
      fz = parseInt(fz);
      return fz;
    }
  },
  methods: {
    setNewsype(type) {
      this.type = type;
    },
    detailList() {
      if (this.type == 2) {
        this.$router.push(`/main/businessEntityInfoList`);
      } else if (this.type == 3) {
        this.$router.push(`/main/businessEntityNewsList`);
      }
    },
    async checkMenu(item) {
      this.$eventBus.$emit('toggleItemActive', item);
      this.$router.push(`/main/${item.url}`);
    },
    hide() {
      this.$refs.notificationDialog.hide();
    },
    resize() {
      if (this.$el) {
        this.boxWidth = this.$el.offsetWidth;
      }
    },
    async detailsBnt(id, type) {
      window.open(`index.html#/details?id=${id}&module=${type}`);
    },
    async editBnt(Id) {
      this.$refs.notificationDialog.show();
      await this.$nextTick();
      this.$refs.notification.editFrom(Id);
    },
    bindResize() {
      window.addEventListener('resize', this.resize);
    },
    unBindResize() {
      window.removeEventListener('resize', this.resize);
    },
    async listView(type) {
      let { err, res } = await this.$model('dataManagement').commonfn2(this.$apiUrl.NEWMANAGEMENT.GET_LIST + '?module=' + type);
      if (res.resultCode == 200) {
        if (type == 1) {
          this.notification = res.data.rows;
        }
        if (type == 2) {
          this.information = res.data.rows;
        }
        if (type == 3) {
          this.news = res.data.rows;
        }
      } else {
        this.$message.showError(err);
      }
    },
    getlastUpdateTime(time) {
      return time.split(' ')[0];
    }
  },
  async mounted() {
    if (this.$storage.get('userInfo').role == 2) {
      this.isRole = false;
    } else {
      this.isRole = true;
    }

    this.bindResize();
    this.resize();
  },
  beforeDestroy() {
    this.unBindResize();
  },
  created() {
    this.listView(1);
    this.listView(2);
    this.listView(3);
  }
};
</script>
<style rel='stylesheet/less' lang='less' scoped>
.left-list {
  width: 70%;
  border-radius: 4px;
  box-shadow: 0 0 8px #bbb;
  z-index: 5;
  transition: box-shadow 0.3s ease;
  float: left;
}
.icon-list {
  text-align: center;
  background-color: #ffffff;
  width: 100%;
  margin: 0;
  padding: 3% 0;
  float: left;
  li {
    box-sizing: border-box;
    position: relative;
    width: 33.3%;
    float: left;
    cursor: pointer;
    list-style-type: none;
    img {
      width: 130px;
      height: 120px;
    }
    span {
      text-align: center;
      width: 100%;
      line-height: 30px;
      display: inline-block;
    }
  }
}
.rigth-list {
  width: 30%;
  float: left;
}
.notification {
  height: 2em;
  line-height: 2em;
  overflow: hidden;
  text-align: center;
  float: left;
  width: 100%;
  cursor: pointer;
  img {
    display: inline-block;
    height: 100%;
  }
}
.default-home {
  width: 100%;
  text-align: center;
  padding-top: 10%;
}
.content-title {
  float: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
}
.content-title :hover {
  color: #00a88a;
}
.content-time {
  float: right;
  font-size: 12px;
  color: #999999;
}

.new-title {
  float: left;
  width: 70px;
  margin: 0 20px 0 10px;
  cursor: pointer;
}
.new-title.active {
  color: #00a88a;
  border-bottom: 2px solid #00a88a;
}
.footer {
  width: 100%;
  text-align: right;
}
</style>