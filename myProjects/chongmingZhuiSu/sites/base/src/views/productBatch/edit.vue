<template>
  <cjm-form ref="form" :model="form" :rules="rules">
    <cjm-tabs v-model="activeName">
      <cjm-tab-pane label="基本信息" name="basicData">
        <cjm-form-item label="批次名称" prop="productBatchCode" required>
          <cjm-input v-model="form.productBatchCode" :maxlength="50"></cjm-input>
        </cjm-form-item>
        <cjm-form-item label="批次号" prop="productBatchNo">
          <cjm-input v-model="form.productBatchNo" :maxlength="40"></cjm-input>
        </cjm-form-item>
        <cjm-form-item label="所属产品" prop="productID" required class="cjm-form-item-long">
          <cjm-remote-select :remote-url="requestUrl" :label="form.productName" :disabled="operation==='edit'" v-model="form.productID" @select="getProductOrg">
            <template slot-scope="scope">{{scope.item.name}}
              <span class="cjm-option-subtitle">(编号:{{scope.item.productCode}})</span>
            </template>
          </cjm-remote-select>
        </cjm-form-item>
        <cjm-form-item label="上市时间" prop="marketTime">
          <cjm-date-picker v-model="form.marketTime"></cjm-date-picker>
        </cjm-form-item>
        <cjm-form-item label="所属机构" prop="orgID" required class="cjm-form-item-long">
          <cjm-remote-select :remote-url="$globalData.get('base', 'apiUrl').autoComplete.ORG" @clear="clearOrgID" :label="form.orgName" v-model="form.orgID">
          </cjm-remote-select>
        </cjm-form-item>
        <cjm-form-item label="所属基地" prop="baseID" class="cjm-form-item-long">
          <cjm-remote-select :remote-url="$globalData.get('base', 'apiUrl').autoComplete.LOOK_BASE" :params="{orgID: orgID}" :label="form.baseName" v-model="form.baseID" :maxLabelLength="35">
          </cjm-remote-select>
        </cjm-form-item>
        <cjm-form-item label="所属分区" prop="baseAreaID" v-show="isBaseArea" class="cjm-form-item-long">
          <cjm-remote-select :fetch-data="fetchData" :label="form.baseAreaName" v-model="form.baseAreaID">
          </cjm-remote-select>
        </cjm-form-item>
        <cjm-form-item label="信息展示" prop="traceType" required>
          <cjm-radio-group v-model="form.traceType">
            <cjm-radio :label="value" v-for="(value,key) in informationDisplay" :key="value">{{key}}</cjm-radio>
          </cjm-radio-group>
        </cjm-form-item>
        <cjm-form-item label="H5溯源页" prop="h5Mode" required v-show="h5ModeFlag" class="cjm-form-item-long">
          <cjm-radio-group v-model="form.h5Mode">
            <cjm-radio :label="value" v-for="(value,key) in h5Trace" :key="value">{{key}}</cjm-radio>
          </cjm-radio-group>
        </cjm-form-item>
        <cjm-form-item label="颜色" prop="h5ColorMode" required v-show="form.h5Mode === '2'">
          <cjm-radio-group v-model="form.h5ColorMode" @change="handleChange">
            <cjm-radio :label="value" v-for="(value,key) in h5Color" :key="value">{{key}}</cjm-radio>
          </cjm-radio-group>
        </cjm-form-item>
        <cjm-form-item label="视频监控地址" prop="videoUrl" class="cjm-form-item-long">
          <cjm-input v-model="form.videoUrl" placeholder="H5溯源页选'模板一'的时候,请确保视频监控地址不要为实时监控地址~"></cjm-input>
        </cjm-form-item>
        <cjm-form-item label="企业视频" prop="enterpriseVideoUrl" class="cjm-form-item-long" v-show="form.h5Mode === '2'">
          <cjm-input v-model="form.enterpriseVideoUrl" placeholder="企业视频"></cjm-input>
        </cjm-form-item>
         <cjm-form-item label="店铺视频" prop="onlineShopVideoUrl" class="cjm-form-item-long" v-show="form.h5Mode === '2'">
          <cjm-input v-model="form.onlineShopVideoUrl" placeholder="店铺视频"></cjm-input>
        </cjm-form-item>
         <cjm-form-item label="VR视频" prop="vrVideoUrl" class="cjm-form-item-long" v-show="form.h5Mode === '2'">
          <cjm-input v-model="form.vrVideoUrl" placeholder="VR视频"></cjm-input>
        </cjm-form-item>
        <cjm-form-item label="备注" prop="note" class="cjm-form-item-long">
          <cjm-input type="textarea" :rows="3" v-model="form.note">
          </cjm-input>
        </cjm-form-item>
      </cjm-tab-pane>
      <cjm-tab-pane label="节点溯源信息" name="nodeTrace">
        <template v-for="item in form.traceNodes">
          <div class="card-item">
            <cjm-button type="text" @click="removeNodeTrace(item)" class="card-close-button">
              <i class="cjm-icon-close"></i>
            </cjm-button>
            <cjm-form-item label="节点名称" prop="traceNodeName" required>
              <cjm-input v-model="item.traceNodeName"></cjm-input>
            </cjm-form-item>
            <cjm-form-item label="节点内容" prop="traceNodeContent" required class="cjm-form-item-long">
              <cjm-input v-model="item.traceNodeContent"></cjm-input>
            </cjm-form-item>
            <cjm-form-item label="卡片图标" prop="nodeImage" class="cjm-form-item-long">
              <cjm-image-upload v-model="item.nodeImage"></cjm-image-upload>
            </cjm-form-item>
          </div>
        </template>
        <div style="text-align: center; margin-bottom: 20px; clear: both;">
          <cjm-button type="text" @click="addNodeTrace">
            <i class="cjm-icon-add2"></i>添加溯源信息
          </cjm-button>
        </div>
      </cjm-tab-pane>
      <cjm-tab-pane label="卡片溯源信息" name="nodeCards">
        <template v-for="item in form.cards">
          <div class="card-item">
            <cjm-button type="text" @click="removeCard(item)" class="card-close-button" v-if="operation!=='approve' && operation!=='view'">
              <i class="cjm-icon-close"></i>
            </cjm-button>
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
      </cjm-tab-pane>
    </cjm-tabs>
  </cjm-form>
</template>

<script>
import CjmEditor from 'framework/components/base/editor';
//验证批次名称不能含有英文单引号
const productBatchCodeRule = function(vue) {
  return {
    validator: (rule, value, callback) => {
      if (vue.form.productBatchCode.indexOf("'") >= 0) {
        return callback(new Error('批次名称含有无效字符单引号'));
      }
      return callback();
    },
    trigger: 'blur'
  };
};
export default {
  components: {
    CjmEditor
  },
  data() {
    return {
      //表单对象
      form: {},
      //当前表单的所处的操作，add、edit、copy
      operation: '',
      activeName: 'basicData',
      h5ModeFlag: true,
      oldOrg: true,
      oldProductId: '',
      oldProductName: '',
      orgID: '',
      requestUrl: this.$globalData.get('base', 'apiUrl').autoComplete.PRODUCT_EX,
      rules: {
        productBatchCode: [this.$formRules.required, this.$formRules.maxLength(50), productBatchCodeRule(this)],
        productBatchNo: [this.$formRules.maxLength(40)],
        productID: [this.$formRules.required],
        orgID: [this.$formRules.required]
      },
      isBaseArea: false
    };
  },
  watch: {
    'form.traceType': function(val) {
      if (val == '1') {
        this.h5ModeFlag = false;
      } else {
        this.h5ModeFlag = true;
      }
    },
    'form.orgID': function() {
      if (this.form.orgID == '') {
        this.orgID = this.$globalData.get('currentUser').orgID;
      } else {
        this.orgID = this.form.orgID;
        if (this.oldOrg) {
          this.oldOrg = false;
        } else{
          this.form.baseID = '';
          this.form.baseName = '';
          this.form.baseAreaID = '';
          this.form.baseAreaName = '';
        }
      }
    },
    'form.baseID': function() {
      if (this.form.baseID != '') {
        this.getBaseArea();
      } else {
        this.isBaseArea = false;
      }
    }
  },
  computed: {
    informationDisplay() {
      return this.$globalData.get('base', 'enums')['信息展示'];
    },
    h5Trace() {
      return this.$globalData.get('base', 'enums')['H5溯源页'];
    },
    h5Color() {
      return this.$globalData.get('base', 'enums')['H5颜色'];
    }
  },
  methods: {
    //新增
    reset() {
      this.form = {
        productBatchCode: '',
        productBatchNo: '',
        productID: '',
        productName: '',
        marketTime: '',
        orgID: '',
        orgName: '',
        baseID: '',
        baseName: '',
        baseAreaID: '',
        baseAreaName: '',
        plotsID: '',
        plotsName: '',
        videoUrl: '',
        enterpriseVideoUrl: '',
        onlineShopVideoUrl: '',
        vrVideoUrl: '',
        traceType: '0',
        h5Mode: '1',
        h5ColorMode: '1',
        note: '',
        traceNodes: [],
        cards: [],
        isCopy: '0',
        productBatchID: '',
        fromProductBatchID: ''
      };
      this.isBaseArea = false;
      this.oldOrg = true;
      //必须调用此方法，否则上次验证的结果还会保留
      this.$nextTick(() => {
        this.$refs.form.resetFields();
      });
      this.activeName = 'basicData';
    },
    handleChange (value){
      console.log(value);
    },
    //新增
    addForm() {
      this.reset();
      this.operation = 'add';
      this.$ajax
        .get(this.$globalData.get('base', 'apiUrl').productBatch.GET_H5_MODEL, { isCopy: '0' })
        .then(r => {
          if (r.resultCode == '200') {
            this.form.traceType = r.data.traceType;
            this.form.h5Model = r.data.h5Model;
            if (r.data.isAudit == 1) {
              this.requestUrl = this.$globalData.get('base', 'apiUrl').autoComplete.AUDIT_PRODUCT_EX;
            } else {
              this.requestUrl = this.$globalData.get('base', 'apiUrl').autoComplete.PRODUCT_EX;
            }
          } else {
            this.$message.error(r.msg);
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    //编辑
    editForm(id, isCopy) {
      this.reset();
      this.operation = 'edit';
      this.$ajax
        .get(this.$globalData.get('base', 'apiUrl').productBatch.GET_H5_MODEL, { isCopy: '1' })
        .then(r => {
          if (r.resultCode == '200') {
            if (r.data.isAudit == 1) {
              this.requestUrl = this.$globalData.get('base', 'apiUrl').autoComplete.AUDIT_PRODUCT_EX;
            } else {
              this.requestUrl = this.$globalData.get('base', 'apiUrl').autoComplete.PRODUCT_EX;
            }
          } else {
            this.$message.error(r.msg);
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
      this.$ajax
        .get(this.$globalData.get('base', 'apiUrl').productBatch.GET_PRODUCT_BATCH_INFO, { productBatchID: id, isCopy: isCopy })
        .then(r => {
          if (r.resultCode == '200') {
            if (r.data.h5Mode.length > 1) {
              let h5Info = r.data.h5Mode.split('');
              r.data.h5ColorMode = h5Info[1];
              r.data.h5Mode = h5Info[0];
            } else {
              r.data.h5ColorMode = '1';
            }
            this.form = r.data;
            if (r.data.productID != '') {
              this.oldProductId = r.data.productID;
              this.oldProductName = r.data.productName;
            } else {
              this.operation = 'edit_noproduct'; //没有产品的情况下要选择产品兼容最初新建批次的时候产品不是必填
            }
            if (isCopy == '1') {
              this.operation = 'copy';
              this.form.productBatchID = '';
              this.form.fromProductBatchID = id;
              this.form.productBatchCode = '';
              this.form.isCopy = '1';
            }
          } else {
            this.$message.error(r.msg);
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    //提交
    submit() {
      return this.$refs.form.validate().then(() => {
        if (this.form.cards && this.form.cards.length > 0) {
          for (let card of this.form.cards) {
            if (!card.cardName || !card.cardContent) {
              throw new Error('卡片信息不全');
            }
          }
        }
        if (this.form.traceNodes && this.form.traceNodes.length > 0) {
          for (let traceNode of this.form.traceNodes) {
            if (!traceNode.traceNodeName || !traceNode.traceNodeContent) {
              throw new Error('节点信息不全');
            }
          }
        }

        const { h5Mode, h5ColorMode } = this.form;
        this.form.h5Mode = `${h5Mode}${h5ColorMode}`;

        return this.$ajax.post(this.$globalData.get('base', 'apiUrl').productBatch.SAVE, this.form).then(r => {
          if (r.resultCode != '200') {
            throw new Error(r.msg);
          }
        });
      });
    },
    //添加卡片
    addCard() {
      this.form.cards.push({
        cardID: '',
        cardName: '',
        cardImage: '',
        cardContent: ''
      });
    },
    //删除卡片
    removeCard(item) {
      this.form.cards.remove(item);
    },
    //添加溯源信息
    addNodeTrace() {
      this.form.traceNodes.push({
        traceNodeID: '',
        traceNodeName: '',
        traceNodeContent: '',
        nodeImage: ''
      });
    },
    //删除溯源信息
    removeNodeTrace(item) {
      this.form.traceNodes.remove(item);
    },
    //根据产品获取所属机构（政府企业）
    getProductOrg(item) {
      if (item && item.id != '') {
        this.$ajax
          .get(this.$globalData.get('base', 'apiUrl').productBatch.GET_PRODUCT_ORG, { productID: item.id, isCopy: this.form.isCopy })
          .then(r => {
            if (r.resultCode == '200') {
              if (this.form.isCopy == '1' && this.oldProductId.toUpperCase() != item.id.toUpperCase()) {
                let message = '';
                if (r.data.nodeCount && r.data.nodeCount != null && r.data.nodeCount > 0) {
                  message = `${item.name}节点配置信息将被系统彻底删除并使用${this.oldProductName}的节点配置，同时${this.oldProductName}对应批次信息复制到${item.name}对应新建批次上，请知晓并谨慎操作`;
                } else {
                  message = `系统将${this.oldProductName}的节点信息复制到${item.name}对应新建批次上，请知晓并谨慎操作！`;
                }
                this.$confirm(message, '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                })
                  .then(() => {
                    if (r.data.orgID != null) {
                      this.form.orgID = r.data.orgID;
                    } else {
                      this.form.orgID = '';
                    }
                    if (r.data.orgName != null) {
                      this.form.orgName = r.data.orgName;
                    } else {
                      this.form.orgName = '';
                    }
                    this.form.productBatchNo = r.data.productBatchNo;
                  })
                  .catch(() => {
                    this.form.productID = this.oldProductId;
                    this.form.productName = this.oldProductName;
                  });
              } else {
                if (r.data.orgID != null) {
                  this.form.orgID = r.data.orgID;
                } else {
                  this.form.orgID = '';
                }
                if (r.data.orgName != null) {
                  this.form.orgName = r.data.orgName;
                } else {
                  this.form.orgName = '';
                }
                this.form.productBatchNo = r.data.productBatchNo;
              }
            } else {
              this.$message.error(r.msg);
            }
          })
          .catch(error => {
            this.$message.error(error.message);
          });
      }
    },
    getBaseArea() {
      this.$ajax
        .post(this.$globalData.get('base', 'apiUrl').autoComplete.LOOK_BASE_AREA, {
          pageSize: 50,
          baseID: this.form.baseID
        })
        .then(r => {
          if (r.resultCode == '200') {
            if (r.data.length > 0) {
              this.isBaseArea = true;
            } else {
              this.isBaseArea = false;
            }
          }
        });
    },
    fetchData(query, callback) {
      this.$ajax
        .post(this.$globalData.get('base', 'apiUrl').autoComplete.LOOK_BASE_AREA, {
          pageSize: 50,
          keyWord: query,
          baseID: this.form.baseID
        })
        .then(r => {
          if (r.resultCode == '200') {
            if (r.data.length > 0) {
              this.isBaseArea = true;
            }
            callback(r.data);
          }
        });
    },
    clearOrgID(val) {
      if (val == undefined) {
        this.form.baseID = '';
        this.form.baseName = '';
        this.form.baseAreaID = '';
        this.form.baseAreaName = '';
      }
    }
  },
  created() {
    this.reset();
    this.orgID = this.$globalData.get('currentUser').orgID;
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
