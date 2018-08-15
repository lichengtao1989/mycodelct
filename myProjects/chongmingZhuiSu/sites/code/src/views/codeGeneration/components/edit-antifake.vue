<template>
  <cjm-form ref="form" :model="form" :rules="rules">
      <cjm-form-item label="按号段激活" prop="isActiveBySegment" required class="cjm-form-item-long">
        <cjm-radio-group v-model="form.isActiveBySegment">
          <cjm-radio :label="value" v-for="(value,key) in yesOrNo" :key="value"
                     :disabled="operation==='approve' || operation==='view'">{{key}}
          </cjm-radio>
        </cjm-radio-group>
      </cjm-form-item>
      <cjm-form-item label="码上淘" prop="isMST" required class="cjm-form-item-long">
        <cjm-radio-group v-model="form.isMST">
          <cjm-radio :label="value" v-for="(value,key) in yesOrNo" :key="value"
                     :disabled="operation==='approve' || operation==='view'">{{key}}
          </cjm-radio>
        </cjm-radio-group>
      </cjm-form-item>
      <template v-if="form.isMST==enums.yesOrNo.YES">
        <cjm-form-item label="码上淘批次" prop="mstBatchID" required>
          <cjm-input v-model="form.mstBatchID" :disabled="operation==='approve' || operation==='view'"></cjm-input>
        </cjm-form-item>
        <cjm-form-item label="码上淘密码" prop="mstPassword" required>
          <cjm-input v-model="form.mstPassword" :disabled="operation==='approve' || operation==='view'"></cjm-input>
        </cjm-form-item>
      </template>
      <cjm-form-item label="排版编辑" prop="antiFakeTextPosition" required class="cjm-form-item-long">
        <cjm-radio-group v-model="form.antiFakeTextPosition">
          <cjm-radio :label="value" v-for="(value,key) in bianPai" :key="value"
                     :disabled="operation==='approve' || operation==='view' || (status>=1 && isApprove!=0)">{{key}}
          </cjm-radio>
        </cjm-radio-group>
      </cjm-form-item>
      <cjm-form-item label="文本内容" prop="antiFakeText" required class="cjm-form-item-long codeUrl">
        <cjm-radio-group v-model="antiFakeTextRadio">
          <cjm-radio :label="value" v-for="(value,key) in antiFakeCodeUrl" :key="value"
                     :disabled="operation==='approve' || operation==='view' || (status>=1 && isApprove!=0)">{{key}}
          </cjm-radio>
        </cjm-radio-group>
        <cjm-input v-model="form.antiFakeText" v-show="antiFakeTextRadio==-1"
                   :disabled="operation==='approve' || operation==='view' || (status>=1 && isApprove!=0)"></cjm-input>
      </cjm-form-item>
      <cjm-form-item label="允许防伪查询" prop="allowAntiFakeQuery" required class="cjm-form-item-long">
        <cjm-radio-group v-model="form.allowAntiFakeQuery">
          <cjm-radio :label="value" v-for="(value,key) in yesOrNo" :key="value"
                     :disabled="operation==='approve' || operation==='view'">{{key}}
          </cjm-radio>
        </cjm-radio-group>
      </cjm-form-item>
      <cjm-form-item label="允许查询次数" prop="allowAntiFakeQueryTimes" required>
        <cjm-select v-model="form.allowAntiFakeQueryTimes" :disabled="operation==='approve' || operation==='view'">
          <cjm-option v-for="(value,key) in allowAntiFakeQueryTimes" :label="key" :value="value"
                      :key="value"></cjm-option>
        </cjm-select>
      </cjm-form-item>
      <cjm-form-item label="技术特征" prop="techCharacteristics" required class="cjm-form-item-long">
        <cjm-checkbox-group v-model="form.techCharacteristics">
          <cjm-checkbox v-for="(value,key) in techCharacteristicsSample" :label="value"
                        :key="value" :disabled="operation==='approve' || operation==='view'">{{key}}
          </cjm-checkbox>
          <cjm-button type="text" v-if="hideMoreTechCharacteristics" @click="hideMoreTechCharacteristics=false">
            更多...
          </cjm-button>
          <template v-else>
            <cjm-checkbox v-for="(value,key) in techCharacteristicsMore" :label="value"
                          :key="value" :disabled="operation==='approve' || operation==='view'">{{key}}
            </cjm-checkbox>
            <cjm-button type="text" @click="hideMoreTechCharacteristics=true">收起</cjm-button>
          </template>
        </cjm-checkbox-group>
      </cjm-form-item>
      <cjm-form-item label="其他技术特征" prop="otherTechCharacteristics" class="cjm-form-item-long">
        <cjm-input v-model="form.otherTechCharacteristics"
                   :disabled="operation==='approve' || operation==='view'"></cjm-input>
      </cjm-form-item>
      <cjm-form-item label="网站查询结果" prop="internetQueryText" class="cjm-form-item-long" required
                     v-if="form.allowAntiFakeQuery==1">
        <cjm-input type="textarea" v-model="form.internetQueryText"
                   :disabled="operation==='approve' || operation==='view'"></cjm-input>
      </cjm-form-item>
      <cjm-form-item label="短信查询结果" prop="smsQueryText" class="cjm-form-item-long" required
                     v-if="form.allowAntiFakeQuery==1">
        <cjm-input type="textarea" v-model="form.smsQueryText"
                   :disabled="operation==='approve' || operation==='view'"></cjm-input>
      </cjm-form-item>
      <cjm-form-item label="禁止查询结果" prop="notAllowAntiFakeQueryText" class="cjm-form-item-long" required
                     v-if="form.allowAntiFakeQuery!=1">
        <cjm-input type="textarea" v-model="form.notAllowAntiFakeQueryText"
                   :disabled="operation==='approve' || operation==='view'"></cjm-input>
      </cjm-form-item>
      <h1 class="cjm-h1">防伪卡片配置</h1>
      <cjm-form-item label="卡片标题" prop="antiFakeCardName" required>
        <cjm-input v-model="form.antiFakeCardName" :disabled="operation==='approve' || operation==='view'"></cjm-input>
      </cjm-form-item>
      <cjm-form-item label="标签图片" prop="tagImage" class="cjm-form-item-long">
        <cjm-image-upload v-model="form.tagImage"
                          :disabled="operation==='approve' || operation==='view'"></cjm-image-upload>
      </cjm-form-item>
      <cjm-form-item label="标签显示样式" prop="tagCardStyle" class="cjm-form-item-long">
        <cjm-radio-group v-model="form.tagCardStyle">
          <cjm-radio :label="value" v-for="(value,key) in tagCardStyle" :key="value"
                     :disabled="operation==='approve' || operation==='view'">{{key}}
          </cjm-radio>
        </cjm-radio-group>
      </cjm-form-item>
      <cjm-form-item label="企业名称" prop="userCorpName" required>
        <cjm-input v-model="form.userCorpName" :disabled="operation==='approve' || operation==='view'"></cjm-input>
      </cjm-form-item>
      <cjm-form-item label="品牌名称" prop="brandName">
        <cjm-input v-model="form.brandName" :disabled="operation==='approve' || operation==='view'"></cjm-input>
      </cjm-form-item>
      <cjm-form-item label="产品名称" prop="productName">
        <cjm-input v-model="form.productName" :disabled="operation==='approve' || operation==='view'"></cjm-input>
      </cjm-form-item>
      <cjm-form-item label="产品价格" prop="productPrice">
        <cjm-input v-model="form.productPrice" :disabled="operation==='approve' || operation==='view'"></cjm-input>
      </cjm-form-item>
      <cjm-form-item label="产品图片" prop="productImage" class="cjm-form-item-long">
        <cjm-image-upload v-model="form.productImage"
                          :disabled="operation==='approve' || operation==='view'"></cjm-image-upload>
      </cjm-form-item>
      <h1 class="cjm-h1">自定义卡片配置</h1>
      <template v-for="item in form.cards">
        <div class="card-item">
          <cjm-button type="text" @click="removeCard(item)" class="card-close-button"
                      v-if="operation!=='approve' && operation!=='view'">
            <i class="cjm-icon-close"></i>
          </cjm-button>
          <cjm-form-item label="卡片标题" prop="cardName" required class="cjm-form-item-long">
            <cjm-input v-model="item.cardName" :disabled="operation==='approve' || operation==='view'"></cjm-input>
          </cjm-form-item>
          <cjm-form-item label="卡片图标" prop="cardImage" class="cjm-form-item-long">
            <cjm-image-upload v-model="item.cardImage"
                              :disabled="operation==='approve' || operation==='view'"></cjm-image-upload>
          </cjm-form-item>
          <cjm-form-item label="卡片内容" prop="cardContent" required class="cjm-form-item-long">
            <cjm-editor v-model="item.cardContent" :disabled="operation==='approve' || operation==='view'"></cjm-editor>
          </cjm-form-item>
        </div>
      </template>
      <div style="text-align: center; margin-bottom: 20px; clear: both;">
        <cjm-button type="text" @click="addCard" :disabled="operation==='approve' || operation==='view'"><i
          class="cjm-icon-add2"></i>添加卡片
        </cjm-button>
      </div>
      <h1 class="cjm-h1">其他卡片配置</h1>
      <cjm-form-item label="客服信息卡片" prop="enabledServiceCardInfo">
        <cjm-radio-group v-model="form.enabledServiceCardInfo">
          <cjm-radio :label="value" v-for="(value,key) in onOrOff" :key="value"
                     :disabled="operation==='approve' || operation==='view'">{{key}}
          </cjm-radio>
        </cjm-radio-group>
      </cjm-form-item>
      <cjm-form-item label="客服电话" prop="customerServicePhone">
        <cjm-input v-model="form.customerServicePhone"
                   :disabled="operation==='approve' || operation==='view'"></cjm-input>
      </cjm-form-item>
      <cjm-form-item label="猜你喜欢卡片" prop="enabledLikeCardInfo" class="cjm-form-item-long">
        <cjm-radio-group v-model="form.enabledLikeCardInfo">
          <cjm-radio :label="value" v-for="(value,key) in onOrOff" :key="value"
                     :disabled="operation==='approve' || operation==='view'">{{key}}
          </cjm-radio>
        </cjm-radio-group>
      </cjm-form-item>
    </cjm-form>
</template>

<script>
  import CjmEditor from 'framework/components/base/editor'
  export default{
    components: {
      CjmEditor
    },
    props: {
      form: Object,
      status: Number,
      isApprove: Number,
      operation: String
    },
    data() {
      return {
        enums: this.$globalData.get('code', 'enums'),
        apiUrl: this.$globalData.get('code', 'apiUrl'),
        rules: {
          mstBatchID: [
            this.$formRules.required
          ],
          mstPassword: [
            this.$formRules.required
          ],
          antiFakeText: [
            this.$formRules.maxLength(100)
          ],
          otherTechCharacteristics: [
            this.$formRules.maxLength(64)
          ],
          internetQueryText: [
            this.$formRules.required,
            this.$formRules.maxLength(250)
          ],
          smsQueryText: [
            this.$formRules.required,
            this.$formRules.maxLength(250)
          ],
          notAllowAntiFakeQueryText: [
            this.$formRules.required,
            this.$formRules.maxLength(250)
          ],
          antiFakeCardName: [
            this.$formRules.required,
            this.$formRules.maxLength(30)
          ],
          userCorpName: [
            this.$formRules.required,
            this.$formRules.maxLength(64)
          ],
          brandName: [
            this.$formRules.maxLength(30)
          ],
          productName: [
            this.$formRules.maxLength(64)
          ],
          productPrice: [
            this.$formRules.numberRange(0)
          ],
          customerServicePhone: [
            // this.$formRules.phoneOrMobile //陈泳要求去掉此验证，因为号码的特殊性
          ]
        },
        //隐藏更多的技术特征
        hideMoreTechCharacteristics: true
      }
    },
    computed: {
      yesOrNo(){
        return this.enums['是否'];
      },
      onOrOff(){
        return this.enums['启用禁用'];
      },
      bianPai(){
        return this.enums['码排版'];
      },
      antiFakeCodeUrl(){
        return this.enums['防伪码网址'];
      },
      allowAntiFakeQueryTimes(){
        return this.enums['允许防伪查询次数'];
      },
      techCharacteristicsSample(){
        const result = {};
        const keys = Object.keys(this.enums['防伪技术特征']);
        for (let i = 0; i < 5; i++) {
          let key = keys[i];
          result[key] = this.enums['防伪技术特征'][key];
        }
        return result;
      },
      techCharacteristicsMore(){
        const result = {};
        const keys = Object.keys(this.enums['防伪技术特征']);
        for (let i = 5; i < keys.length; i++) {
          let key = keys[i];
          result[key] = this.enums['防伪技术特征'][key];
        }
        return result;
      },
      tagCardStyle(){
        return this.enums['标签显示样式'];
      },
      antiFakeTextRadio: {
        get: function () {
          for (let value in this.antiFakeCodeUrl) {
            if (this.form.antiFakeText === this.antiFakeCodeUrl[value]) {
              return this.form.antiFakeText;
            }
          }
          return '-1';
        },
        set: function (val) {
          if (val != '-1') {
            this.form.antiFakeText = val;
          } else {
            this.form.antiFakeText = '';
          }
        }
      }
    },
    methods: {
      //添加防伪卡片
      addCard(){
        this.form.cards.push({
          cardID: '',
          cardName: '',
          cardImage: '',
          cardContent: ''
        });
      },
      //删除防伪卡片
      removeCard(item){
        this.form.cards.remove(item);
      },
      validate(callback){
        this.$refs.form.validate((valid) => {
          if(valid && this.form.cards && this.form.cards.length > 0){
            for (let card of this.form.cards) {
              if (!card.cardName || !card.cardContent) {
                valid = false;
                this.$message.warning('自定义卡片信息不全');
                break;
              }
            }
          }

          callback(valid);
        });
      },
      resetFields(){
        this.$refs.form.resetFields();
      }
    }
  }
</script>

<style rel='stylesheet/less' lang='less' scoped>
  @import "../../../assets/css/config";
  .codeUrl {
    .el-radio-group {
      width: 250px;
    }
    .el-radio {
      display: block;
      margin: 10px 0;

      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-radio-group + .el-input {
      margin-top: 10px;
    }
  }

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

    .card-close-button {
      position: absolute;
      top: 0px;
      right: 0px;
      color: @Black;
      font-size: 18px;
      cursor: pointer;
    }
  }
</style>
