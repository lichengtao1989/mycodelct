<template>
  <cjm-form ref="form" :model="form" :rules="rules">
    <cjm-form-item label="网站查询结果" prop="internetQueryText" class="cjm-form-item-long" required>
      <cjm-input type="textarea" v-model="form.internetQueryText"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="短信查询结果" prop="smsQueryText" class="cjm-form-item-long" required>
      <cjm-input type="textarea" v-model="form.smsQueryText"></cjm-input>
    </cjm-form-item>
    <h1 class="cjm-h1">防伪卡片配置</h1>
    <cjm-form-item label="企业名称" prop="userCorpName" required>
      <cjm-input v-model="form.userCorpName"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="品牌名称" prop="brandName">
      <cjm-input v-model="form.brandName"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="产品名称" prop="productName">
      <cjm-input v-model="form.productName"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="产品价格" prop="productPrice">
      <cjm-input v-model="form.productPrice"></cjm-input>
    </cjm-form-item>
    <h1 class="cjm-h1">自定义卡片配置</h1>
    <template v-for="item in form.cards">
      <div class="card-item">
        <i class="cjm-icon-close" @click="removeCard(item)"></i>
        <cjm-form-item label="卡片标题" prop="cardName" required class="cjm-form-item-long">
          <cjm-input v-model="item.cardName"></cjm-input>
        </cjm-form-item>
        <cjm-form-item label="卡片图标" prop="cardImage" class="cjm-form-item-long">
          <cjm-image-upload v-model="item.cardImage"></cjm-image-upload>
        </cjm-form-item>
        <cjm-form-item label="卡片内容" prop="cardContent" required class="cjm-form-item-long">
          <cjm-editor v-model="item.cardContent"></cjm-editor>
        </cjm-form-item>
      </div>
    </template>
    <div style="text-align: center; margin-bottom: 20px; clear: both;">
      <cjm-button type="text" @click="addCard">
        <i class="cjm-icon-add2"></i>添加卡片
      </cjm-button>
    </div>
  </cjm-form>
</template>

<script>
import CjmEditor from 'framework/components/base/editor';
export default {
  components: {
    CjmEditor
  },
  data() {
    return {
      enums: this.$globalData.get('code', 'enums'),
      apiUrl: this.$globalData.get('code', 'apiUrl'),
      form: {},
      rules: {
        internetQueryText: [this.$formRules.required, this.$formRules.maxLength(250)],
        smsQueryText: [this.$formRules.required, this.$formRules.maxLength(250)],
        userCorpName: [this.$formRules.required, this.$formRules.maxLength(64)],
        brandName: [this.$formRules.maxLength(30)],
        productName: [this.$formRules.maxLength(64)],
        productPrice: [this.$formRules.numberRange(0)]
      }
    };
  },
  methods: {
    editForm(id) {
      this.reset();

      this.$ajax
        .get(this.apiUrl.codeGeneration.GET_FOR_CORP, { id: id })
        .then(r => {
          if (r.resultCode == '200') {
            Object.transfer(r.data, this.form);
          } else {
            this.$message.error(r.msg);
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    reset() {
      this.form = {
        id: '',
        internetQueryText: '',
        smsQueryText: '',
        userCorpName: '',
        brandName: '',
        productName: '',
        productPrice: '',
        cards: []
      };
      this.$nextTick(() => {
        this.$refs.form.resetFields();
      });
    },
    submit() {
      return this.$refs.form.validate().then(() => {
        for (let card of this.form.cards) {
          if (!card.cardName || !card.cardContent) {
            throw new Error('自定义卡片信息不全');
          }
        }
        return this.$ajax.post(this.apiUrl.codeGeneration.SAVE_FOR_CORP, this.form).then(r => {
          if (r.resultCode != '200') {
            throw new Error(r.msg);
          }
        });
      });
    },
    addCard() {
      this.form.cards.push({
        cardID: '',
        cardName: '',
        cardImage: '',
        cardContent: ''
      });
    },
    //删除防伪卡片
    removeCard(item) {
      this.form.cards.remove(item);
    }
  },
  created() {
    this.reset();
  }
};
</script>

<style rel='stylesheet/less' lang='less' scoped>
@import '../../assets/css/config';

.card-item {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding: 20px 40px 20px 0;
  margin-bottom: 10px;
  clear: both;
  background: @DarkWhite;

  &:after {
    content: '';
    display: block;
    clear: both;
  }

  .cjm-icon-close {
    position: absolute;
    top: 10px;
    right: 10px;
    color: @Black;
    font-size: 18px;
    cursor: pointer;
  }
}
</style>
