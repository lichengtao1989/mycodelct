<template>
  <div class="index-wrap">
    <!-- <div class="toast" @click="jumpUrlFn">
      有待审核码
    </div> -->
    <cjm-scrollbar v-if="status==='normal' && (editable || hasCard)">
      <cjm-cards theme="theme2" style="padding: 10px;">
        <template v-for="card in cards">
          <cjm-card v-if="card._cardType==='list'" :key="card.id" id="listLct" title="待处理任务(码分配)">
            <div class="dclrw">
              <cjm-table :data="card.listInfo.rows" style="width: 100%">
                <cjm-table-column prop="DesOrgName" label="申请机构">
                </cjm-table-column>
                <cjm-table-column prop="ApplyCount" label="申请数量">
                </cjm-table-column>
                <cjm-table-column prop="StatusName" label="订单状态">
                  <template slot-scope="scope">
                    <div class="colct1">{{scope.row.StatusName}}</div>

                  </template>
                </cjm-table-column>
                <cjm-table-column prop="ApplyTime" label="申请时间">
                </cjm-table-column>
                <cjm-table-column label="操作">
                  <template slot-scope="scope">
                    <cjm-button @click="jumpUrlFn" type="text" size="small">处理</cjm-button>

                  </template>
                </cjm-table-column>
              </cjm-table>
            </div>
            <template slot="operate" slot-scope="scope">
              <div class="gjt">共{{card.listInfo.total}}条</div>
            </template>
          </cjm-card>
          <cjm-stack-card v-if="card._cardType==='stack'" :key="card.key" :data="card.value" :editable="false" :format-style="true" :head-operates="notificationCardHeadOperates" :ref="card.key" @setup="setup">
            <div slot-scope="scope" class="notification" v-html="scope.item.options.content"></div>
            <template slot="operate" slot-scope="scope">
              <cjm-button type="text" @click="viewNotification(scope.item, card.key)" :disabled="editable">
                <i class="cjm-icon-detail1"></i>详情
              </cjm-button>
              <cjm-button type="text" @click="readNotification(scope.item, card.key)" :disabled="editable">
                <i class="cjm-icon-confirm"></i>了解了
              </cjm-button>
            </template>
          </cjm-stack-card>
          <cjm-card v-if="card._cardType==='normal'" :key="card.id" :title="card.title" :sub-title="card.subTitle" :editable="false" :format-style="true" :head-operates="notificationCardHeadOperates" @setup="setup">
            <div class="notification" v-html="card.options.content"></div>
            <template slot="operate" slot-scope="scope">
              <cjm-button type="text" @click="viewNotification(card)" :disabled="editable">
                <i class="cjm-icon-detail1"></i>详情
              </cjm-button>
              <cjm-button type="text" v-if="card.closable=='1'" @click="readNotification(card)" :disabled="editable">
                <i class="cjm-icon-confirm"></i>了解了
              </cjm-button>
            </template>
          </cjm-card>
          <cjm-chart-card v-if="card._cardType==='chart' && card.secondCategory!==enums.graphCardCategory.NUMBER" :key="card.id" :title="card.title" :size="card.size==enums.cardSize.SIZE2 ? 'middle' : 'small'" :editable="editable" :data="card.data" :chart-type="getChartType(card.secondCategory)" :status.sync="card.status" :head-operates="getChartCardHeadOperates(card)" :visible="card.visible=='1'" @visibleChange="visibleChange(arguments[0],card)" @setup="setup">
            <template slot="operate" slot-scope="scope">
              <cjm-button type="text" @click="viewDetail(card.powerCode)" :disabled="editable">
                <i class="cjm-icon-detail1"></i>详情
              </cjm-button>
            </template>
          </cjm-chart-card>
          <cjm-number-card v-if="card._cardType==='chart' && card.secondCategory===enums.graphCardCategory.NUMBER" :key="card.id" :title="card.title" :size="card.size==enums.cardSize.SIZE2 ? 'middle' : 'small'" :editable="editable" :data="card.data" :status.sync="card.status" :head-operates="getChartCardHeadOperates(card)" :visible="card.visible=='1'" @visibleChange="visibleChange(arguments[0],card)" @setup="setup">
            <template slot="operate" slot-scope="scope">
              <cjm-button type="text" @click="viewDetail(card.powerCode)" :disabled="editable">
                <i class="cjm-icon-detail1"></i>详情
              </cjm-button>
            </template>
          </cjm-number-card>
        </template>
      </cjm-cards>

      <transition name="bottom-operate-bar-holder">
        <div class="bottom-operate-bar-holder" v-if="editable"></div>
      </transition>
    </cjm-scrollbar>
    <transition name="bottom-operate-bar">
      <div class="bottom-operate-bar" v-if="editable">
        <cjm-button type="primary" @click="finishEdit">
          <i class="cjm-icon-confirm"></i>完成设置</cjm-button>
      </div>
    </transition>

    <cjm-dialog :title="notification.title" :visible.sync="dialogVisible">
      <p class="dialog-creater" v-if="notification.options && notification.options.showCreater == '1'">
        {{notification.options ? notification.options.orgName : ''}}</p>
      <p class="dialog-create-time">{{notification.createTime}}</p>
      <div v-html="notification.options ? notification.options.content : ''" class="index-notification-dialog-content"></div>
      <div slot="footer">
        <cjm-button type="primary" @click="readNotification2(notification, stackCardKey)">
          <i class="cjm-icon-confirm"></i>了解了
        </cjm-button>
      </div>
    </cjm-dialog>

    <div class="index-status" v-if="!editable && status==='normal' && !hasCard">
      <div class="cjm-img-nodata index-status-img"></div>
      <p>当前没有新的卡片</p>
      <cjm-button type="text" @click="setup">点击设置</cjm-button>
    </div>
    <div class="index-status" v-if="status==='error'">
      <div class="cjm-img-error index-status-img"></div>
      <p>数据获取失败</p>
    </div>
    <div class="index-status" v-if="status==='empty'">
      <div class="cjm-img-nodata index-status-img"></div>
      <p>当前没有可用的卡片</p>
    </div>

    <!-- <transition name="slide-fade">
      <div class="judge-weakCode" v-if="weakCodeStatus">
        <p>密码过于简单，请及时修改初始密码！</p>
      </div>
    </transition> -->

  </div>

</template>

<script>
import Cards from 'framework/components/base/cards';
import Card from 'framework/components/base/card';
import StackCard from 'framework/components/base/stack-card';
import ChartCard from 'framework/components/base/chart-card';
import NumberCard from 'framework/components/base/number-card';
import routerUtil from 'framework/utils/router';

export default {
  components: {
    'cjm-cards': Cards,
    'cjm-card': Card,
    'cjm-stack-card': StackCard,
    'cjm-chart-card': ChartCard,
    'cjm-number-card': NumberCard
  },
  data() {
    return {
      enums: this.$globalData.get('root', 'enums'),
      apiUrl: this.$globalData.get('root', 'apiUrl'),
      cards: [],
      cardList: [],
      notification: {},
      stackCardKey: '',
      editable: false,
      dialogVisible: false,
      weakCodeStatus: false,
      //状态
      status: ''
    };
  },
  computed: {
    //通知卡片的右上角操作项
    notificationCardHeadOperates() {
      if (!this.editable) {
        return {
          设置: () => {
            this.setup();
          }
        };
      } else {
        return null;
      }
    },
    filteredStackCards() {
      return this.cards.filter(item => {
        return item._cardType === 'stack' && item.value.length > 0;
      });
    },
    //是否有显示的卡片
    hasCard() {
      let visibleCard = this.cards.find(card => {
        return card.category == this.enums.cardCategory.NOTIFICATION || card.visible == '1';
      });
      if (visibleCard) {
        return true;
      }

      visibleCard = this.cards.find(card => {
        return card._cardType == 'stack' && card.value.length > 0;
      });
      if (visibleCard) {
        return true;
      }
      return false;
    }
  },
  methods: {
    jumpUrlFn() {
      this.$router.push({
        path: '/JiChuShuJu/MaGuanLi/MaFenPei/MaFenPei'
      });
    },
    getChartCardHeadOperates(card) {
      if (!this.editable) {
        return {
          设置: () => {
            this.setup();
          },
          关闭: () => {
            this.visibleChange(false, card);
          }
        };
      } else {
        return null;
      }
    },
    //右下角'详情'按钮
    viewDetail(code) {
      routerUtil.push(code);
    },
    //查看通知
    viewNotification(card, stackCardKey) {
      this.notification = card;
      this.stackCardKey = stackCardKey;
      this.dialogVisible = true;
    },
    //读取通知（卡片）
    readNotification(card, stackCardKey, callback) {
      //设置通知为已读
      this.$ajax
        .get(this.apiUrl.notification.READ, {
          ids: [card.options.notificationID],
          read: 1
        })
        .then(r => {
          if (r.resultCode == '200') {
            //允许关闭的卡片在读取通知之后关闭
            if (card.closable == '1') {
              if (this.cards.indexOf(card) >= 0) {
                this.cards.remove(card);
              } else if (stackCardKey) {
                this.$refs[stackCardKey][0].close(card);
              }
            }
          } else {
            this.$message.error(r.msg);
          }
          if (callback) {
            callback();
          }
        })
        .catch(error => {
          this.$message.error(error.message);
          if (callback) {
            callback();
          }
        });
    },
    //读取通知(弹框)
    readNotification2(card, stackCardKey) {
      this.readNotification(card, stackCardKey, () => {
        this.dialogVisible = false;
      });
    },
    //设置
    setup() {
      this.editable = true;
    },
    //完成设置
    finishEdit() {
      this.editable = false;
    },
    getChartType(category) {
      switch (category) {
        case this.enums.graphCardCategory.LINE:
          return 'line';
        case this.enums.graphCardCategory.BAR:
          return 'bar';
        case this.enums.graphCardCategory.PIE:
          return 'pie';
        case this.enums.graphCardCategory.MAP:
          return 'map';
      }
      return 'custom';
    },
    //显示/隐藏切换
    visibleChange(val, card) {
      let visible = val ? '1' : '0';
      this.$ajax
        .post(this.apiUrl.card.SET_VISIBLE, { id: card.id, visible: visible })
        .then(r => {
          if (r.resultCode == '200') {
            card.visible = visible;
            //如果是隐藏切换到显示，切之前卡片无数据，则获取数据
            if (val && card.category === this.enums.cardCategory.GRAPH) {
              if (!card.data) {
                this.$ajax.get(card.options.dataSource).then(r => {
                  this.$set(card, 'data', r.data);
                  this.$set(card, 'status', 'ready');
                });
              } else {
                card.data = Object.deepClone(card.data);
              }
            }
          } else {
            this.$message.error(r.msg);
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    //设置通知卡片
    getNotificationCards(allCards) {
      //得到通知卡片，按时间倒序排列
      const notiCards = allCards.filter(row => {
        return row.category == this.enums.cardCategory.NOTIFICATION;
      });
      const closableCards = {};
      const result = [];
      notiCards.forEach(item => {
        item.subTitle = (item.options.showCreater == '1' ? item.options.orgName : '') + '   ' + item.createTime;
        if (item.closable == '0') {
          //不可关闭的卡片都是普通图文卡片，不堆叠
          result.push({ _cardType: 'normal', ...item });
        } else {
          if (closableCards[item.title]) {
            closableCards[item.title].push(item);
          } else {
            closableCards[item.title] = [item];
          }
        }
      });

      for (let item in closableCards) {
        let len = closableCards[item].length;
        if (len === 1) {
          result.push({ _cardType: 'normal', ...closableCards[item][0] });
        } else {
          closableCards[item].sort((card1, card2) => {
            return new Date(card1.createTime) > new Date(card2.createTime) ? -1 : 1;
          });
          for (let i = 0; i < len; i += 5) {
            let end = i + 5 < len ? i + 5 : len;
            result.push({
              _cardType: 'stack',
              createTime: closableCards[item][i].createTime,
              priority: closableCards[item][i].priority,
              key: 'stackCard_' + Math.random(),
              value: closableCards[item].slice(i, end)
            });
          }
        }
      }
      return result;
    },
    //设置图表卡片
    getChartCards(allCards) {
      //得到图标卡片、按优先级排序
      const chartCards = allCards.filter(card => {
        return card.category == this.enums.cardCategory.GRAPH;
      });
      //根据数据接口获取数据、设置卡片状态
      chartCards.forEach(card => {
        card._cardType = 'chart';
        card.status = 'loading';
        if (card.visible == '1') {
          this.$ajax
            .get(card.options.dataSource)
            .then(r2 => {
              if (r2.resultCode == '200' && r2.data) {
                this.$set(card, 'data', r2.data);
                card.status = 'ready';
              } else {
                card.status = 'error';
              }
            })
            .catch(() => {
              card.status = 'error';
            });
        } else {
          card.status = 'empty';
        }
      });
      return chartCards;
    },
    changeWeakCode() {
      this.$ajax.post(this.apiUrl.GET_WEAKCODE).then(r2 => {
        if (r2.resultCode == '600') {
          this.$message(r2.msg);
        }
      });
    }
  },
  mounted() {
    this.changeWeakCode();
  },
  created() {
    let systemId = this.$storage.get('systemId') || '';
    //卡片列表

    this.$ajax
      .get(this.apiUrl.card.GET_LIST, { systemID: systemId })
      .then(r => {
        if (r.resultCode == '200') {
          if (!r.data.rows || r.data.rows.length === 0) {
            this.status = 'empty';
            return;
          }
          this.status = 'normal';
          this.cards = [...this.getNotificationCards(r.data.rows), ...this.getChartCards(r.data.rows)].sort((card1, card2) => {
            if (card1.priority > card2.priority) {
              return 1;
            } else if (card1.priority == card2.priority) {
              return new Date(card1.createTime) > new Date(card2.createTime) ? -1 : 1;
            } else {
              return -1;
            }
          });
        } else {
          this.status = 'error';
        }
      })
      .then(res => {
        console.log(res);
        this.$ajax
          .get(this.apiUrl.card.CodeOrgAssignList, {})
          .then(res => {
            if (res.success) {
              if (res.total > 0) {
                let obj = { _cardType: 'list', id: new Date().getTime(), listInfo: res };
                this.cards.unshift(obj);
                console.log(this.cards);
              }
            } else {
            }
          })
          .catch(() => {});
      })
      .catch(() => {
        this.status = 'error';
      });
  }
};
</script>
<style rel='stylesheet/less' lang='less' >
#listLct {
  width: 60% !important;
  .dclrw{
    height: 197px;
    overflow: hidden;
  }
}
</style>
<style rel='stylesheet/less' lang='less' scoped>
.colct1 {
  color: #fca402;
}
.gjt {
  color: #409eff;
  font-size: 14px;
}
.toast {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
}
.index-wrap {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.notification {
  height: 13.5em;
  line-height: 1.5em;
  overflow: hidden;
}

.bottom-operate-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  line-height: 80px;
  background: #fff;
  text-align: center;
  box-shadow: 8px 1px 8px #ccc;
  z-index: 220;
}

.bottom-operate-bar-holder {
  height: 80px;
}

.index-status {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -150px;
  margin-top: -280px;
  width: 300px;
  height: 350px;
  text-align: center;
  color: #666;

  p {
    margin: 5px 0;
  }
}

.index-status-img {
  width: 300px;
  height: 300px;
}

.dialog-creater {
  font-size: 13px;
  color: #666;
  margin-bottom: 10px;
}

.dialog-create-time {
  font-size: 12px;
  color: #aaa;
  margin-bottom: 10px;
}

.judge-weakCode {
  background: #fff;
  font: 16px/40px '微软雅黑';
  color: #b3b4ac;
  width: 400px;
  position: fixed;
  left: 50%;
  margin-left: -200px;
  top: 10px;
  border-radius: 10px;
  text-align: center;
}

.judge-weakCode p {
  display: inline-block;
}

/*****************动画******************/
.bottom-operate-bar-holder-enter {
  height: 0;
}

.bottom-operate-bar-holder-enter-active {
  transition: all 0.2s ease-out;
}

.bottom-operate-bar-holder-leave-active {
  height: 0;
  transition: all 0.2s ease-in;
}

.bottom-operate-bar-enter {
  bottom: -80px;
}

.bottom-operate-bar-enter-active {
  transition: all 0.2s ease-out;
}

.bottom-operate-bar-leave-active {
  bottom: -80px;
  transition: all 0.2s ease-in;
}

// .slide-fade-enter-active {
//   top: 10px;
//   transition: all 1s;
// }
// .slide-fade-leave-active {
//   transition: all 1s;
// }
// .slide-fade-enter, .slide-fade-leave-to {
//   top: -50px;
//   opacity: 0;
// }
</style>

<style rel='stylesheet/less' lang='less'>
.index-notification-dialog-content {
  img {
    max-width: 100% !important;
  }
}
</style>
