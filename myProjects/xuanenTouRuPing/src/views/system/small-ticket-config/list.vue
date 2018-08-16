<template>
  <div class="nz-list">
    <div class="delete-batch">
      <nz-button @click="setPrint" type="primary">
        <i class="nz-icon-import"></i>设置</nz-button>
    </div>
    <div class="content">
      <nz-form label-width="150px" ref="form" :model="form" :rules="rules">
        <div class="sales-ticket">
          <h2>{{form.title}}</h2>
          <ul class="sales-type">
            <li v-if="form.details.orderType">
              <div class="left-content">单据类型：</div>
              <div class="rigth-content">销售</div>
            </li>
            <li v-if="form.details.orderCode">
              <div class="left-content">销售单号：</div>
              <div class="rigth-content">2018041752522001</div>
            </li>
            <li v-if="form.details.customerName">
              <div class="left-content">客户姓名：</div>
              <div class="rigth-content">张三</div>
            </li>
            <li v-if="form.details.orderDate">
              <div class="left-content">单据日期：</div>
              <div class="rigth-content">2018-04-17 07:52</div>
            </li>
          </ul>
          <div class="dotted-line"></div>
          <ul class="product-type">
            <li>
              <div class="product-name">商品名</div>
              <div class="product-number">数量</div>
              <div class="product-unit-price">单价</div>
              <div class="product-subtotal">小计(元)</div>
            </li>
            <li>
              <div class="product-name">阿维菌素4</div>
            </li>
            <li v-if="form.details.manufacturer">
              <div class="product-name">(生产厂家)</div>
            </li>
            <li>
              <div class="product-number" style="margin-left: 50px;">1.00</div>
              <div class="product-unit-price">0.00</div>
              <div class="product-subtotal">0.00</div>
            </li>
          </ul>
          <div class="dotted-line"></div>
          <ul class="sales-price">
            <li v-if="form.details.waitPaid">
              <div>原价总计(元)：</div>
              <div>0.00</div>
            </li>
            <li v-if="form.details.discount">
              <div>优惠金额(元)：</div>
              <div>0.00</div>
            </li>
            <li v-if="form.details.payment">
              <div>实付金额(元)：</div>
              <div>0.00</div>
            </li>
            <li v-if="form.details.change">
              <div>找零/欠款(元)：</div>
              <div>0.00</div>
            </li>
          </ul>
          <ul class="sales-prescription" v-if="form.details.prescriptionOrder">
            <li>
              <div>针对作物：</div>
              <div>无</div>
            </li>
            <li>
              <div>生长阶段：</div>
              <div>无</div>
            </li>
            <li>
              <div>病/虫/草害：</div>
              <div>无</div>
            </li>
            <li>
              <div>商品名称：</div>
              <div>无</div>
            </li>
            <li>
              <div>农药药性：</div>
              <div>无</div>
            </li>
            <li>
              <div>安全间隔期(天)：</div>
              <div>无</div>
            </li>
            <li>
              <div>用药量（亩）：</div>
              <div>无</div>
            </li>
            <li>
              <div>使用方法：</div>
              <div>无</div>
            </li>
            <li>
              <div>注意事项：</div>
              <div>无</div>
            </li>
          </ul>
          <div class="product-welcome" v-if="form.details.footer1Check">{{form.details.footer1}}</div>
          <div class="product-phone" v-if="form.details.footer2Check">{{form.details.footer2}}</div>
        </div>
      </nz-form>
    </div>
    <nz-dialog title="小票设置" ref="editDialog" :okHandler="editFirm" height="500">
      <edit ref="edit"></edit>
    </nz-dialog>
  </div>
</template>
<script>
import edit from './edit.vue';
export default {
  components: {
    edit
  },
  data() {
    let apiUrl = this.$apiUrl.USER;
    return {
      apiUrl: apiUrl,
      isRegister: false,
      deviceList: [],
      LODOP: '',
      form: {
        title: '',
        smallTicketConfigID: '',
        details: {
          orderType: true,
          orderCode: true,
          orderDate: true,
          customerName: true,
          waitPaid: true,
          discount: true,
          payment: true,
          change: true,
          prescriptionOrder: true,
          footer1: '谢谢光顾，欢迎下次光临！',
          footer2: '服务电话：**********',
          pringNum: 2
        }
      }
    };
  },
  methods: {
    async save() {
      const valid = await this.$validForm(this.$refs.form);
      if (valid) {
        let { err, res } = await this.$model('dataManagement').commonfn(this.apiUrl.SAVE_USER_PRINT_CONFIG, this.form);
        if (res.resultCode == 200) {
          this.$message.success('保存成功');
        } else {
          this.$message.showError(err);
        }
      }
    },
    async getPrint() {
      let data = {
        type: 1
      };
      let { err, res } = await this.$model('dataManagement').commonfn(this.apiUrl.GET_LIST_PRINT_TEMPLET, data);
      if (res.resultCode == 200) {
        this.form = res.data.rows[0];
      } else {
        this.$message.showError(err);
      }
    },
    async setPrint() {
      this.$refs.editDialog.show();
      await this.$nextTick();
      this.$refs.edit.addFrom(this.form.smallTicketConfigID);
    },
    async editFirm(callback) {
      let { valid, err, res } = await this.$refs.edit.save();
      if (valid) {
        if (res.resultCode == 200) {
          this.$refs.editDialog.hide();
          this.getPrint();
        } else {
          this.$message.showError(err);
          await this.$sleep(500);
        }
      }
      callback();
    }
  },
  async mounted() {},
  async created() {
    this.getPrint();
  }
};
</script>
<style rel='stylesheet/less' lang='less' scoped>
body {
  padding: 0;
  margin: 0;
  background-color: #ffffff;
  min-width: 1200px;
}
li {
  list-style-type: none;
}
.content {
  width: 500px;
  display: inline-block;
  margin-top: 40px;
}
.sales-ticket {
  width: 360px;
  border: 1px solid #cccccc;
  float: left;
  padding-bottom: 20px;
  h2 {
    font-size: 20px;
    font-weight: 500;
    text-align: center;
  }
}
.sales-type {
  padding-left: 50px;
  font-size: 14px;
  float: left;
  width: 100%;
  li {
    list-style-type: none;
    padding: 3px 0px;
    float: left;
    width: 100%;
  }
}
.left-content {
  float: left;
}
.right-content {
  float: left;
}
.dotted-line {
  border-bottom: 1px #cccccc dotted;
  width: 80%;
  margin: 0 10%;
  float: left;
}
.product-type {
  padding-left: 50px;
  font-size: 14px;
  float: left;
  li {
    list-style-type: none;
    padding: 3px 0px;
    float: left;
    width: 100%;
  }
}
.product-name {
  float: left;
  margin-right: 10px;
}
.product-number {
  float: left;
  margin-right: 10px;
}
.product-unit-price {
  float: left;
  margin-right: 10px;
}
.product-subtotal {
  float: left;
}
.sales-price {
  padding-left: 50px;
  font-size: 14px;
  float: left;
  li {
    list-style-type: none;
    padding: 3px 0px;
    float: left;
    width: 100%;
    div {
      float: left;
    }
  }
}
.sales-prescription {
  padding-left: 50px;
  font-size: 14px;
  float: left;
  li {
    list-style-type: none;
    padding: 5px 0px;
    float: left;
    width: 100%;
    div {
      float: left;
    }
  }
}
.product-welcome {
  float: left;
  width: 100%;
  text-align: center;
  font-size: 16px;
  margin-bottom: 10px;
}
.product-phone {
  float: left;
  width: 100%;
  text-align: center;
  font-size: 16px;
}
.nz-list {
  min-height: 700px;
  padding: 40px 20px;
  background-color: #fff;
}
</style>