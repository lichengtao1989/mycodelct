<template>
  <div class="cjm-edit-page">
    <div class="node-steps">
      <cjm-steps :active="active">
        <cjm-step title="审批内容"></cjm-step>
        <cjm-step title="审批结果"></cjm-step>
      </cjm-steps>
    </div>
    <cjm-form class="product-select" :model="form" :rules="rules">
      <div v-show="active == 0">
        <cjm-form-item label="上市时间" class="cjm-form-item-long" v-if="form.marketTime != ''" prop="marketTime">
          <cjm-input v-model="form.marketTime" disabled></cjm-input>
        </cjm-form-item>
        <cjm-form-item label="申请人" class="cjm-form-item-long" prop="applyByName">
          <cjm-input v-model="form.applyByName" disabled></cjm-input>
        </cjm-form-item>
        <cjm-form-item label="申请企业" class="cjm-form-item-long" prop="applyCorpName">
          <cjm-input v-model="form.applyCorpName" disabled></cjm-input>
        </cjm-form-item>
        <cjm-form-item label="审批模块" class="cjm-form-item-long" prop="reviewModule">
          <cjm-radio-group v-model="form.reviewModule" disabled>
            <cjm-radio :label="value" v-for="(value,key) in approvalModule" :key="value">{{key}}</cjm-radio>
          </cjm-radio-group>
        </cjm-form-item>
        <cjm-form-item label="审批优先级" class="cjm-form-item-long" prop="level">
          <cjm-radio-group v-model="form.level" disabled>
            <cjm-radio :label="value" v-for="(value,key) in levelItem" :key="value">{{key}}</cjm-radio>
          </cjm-radio-group>
        </cjm-form-item>
        <cjm-form-item label="溯源信息" class="cjm-form-item-long">
          <div class="node-details node-details-list">
            <div class="node-detail-item" v-for="(item, index) in form.reviewContent" :key="item.traceNodeID">
              <div class="item-title">
                <div class="title-name">
                  <span>{{index + 1}}</span>
                  <span>{{item.nodeName}}</span>
                </div>
              </div>
              <div class="item-info">
                <ul>
                  <li>
                    <label>{{item.operateTimeName}}</label>
                    <span class="field-value">{{item.operateTime}}{{item.operateTimeEnd ? (' ~ ' + item.operateTimeEnd) : ''}}</span>
                  </li>
                  <li v-for="info in item.nodeExt" :key="info.extID" v-show="info.fieldValue&&info.fieldValue.length>0">
                    <label>{{info.fieldName}}</label>
                    <div class="imgs-box" v-html="imgDataFormatter(info.fieldValue)" v-if="info.fieldType==2"></div>
                    <span class="field-value" v-if="info.fieldType!=2">{{info.fieldValue}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </cjm-form-item>
        <div class="cjm-page-bottom-holder" style="float: left;"></div>
        <div class="cjm-page-bottom-bar">
          <cjm-button @click="next" type="primary">下一步
            <i class="cjm-icon-chevron-down cjm-icon-rotate-n90"></i>
          </cjm-button>
          <cjm-button @click="cancel">取消</cjm-button>
        </div>
      </div>
      <div v-if="active == 1">
        <cjm-form-item label="审批结果" class="cjm-form-item-long" prop="reviewResult" required>
          <cjm-radio-group v-model="form.reviewResult">
            <cjm-radio :label="value" v-for="(value,key) in approvalResultsItem" :disabled="disabled" :key="value">{{key}}</cjm-radio>
          </cjm-radio-group>
        </cjm-form-item>
        <cjm-form-item label="审批意见" prop="reviewOpinion" class="cjm-form-item-long">
          <cjm-input type="textarea" :rows="3" v-model="form.reviewOpinion" :disabled="disabled">
          </cjm-input>
        </cjm-form-item>
        <div class="cjm-page-bottom-holder" style="float: left;"></div>
        <div class="cjm-page-bottom-bar">
          <cjm-button type="primary" @click="prev">
            <i class="cjm-icon-chevron-down cjm-icon-rotate-90"></i>上一步</cjm-button>
          <cjm-button @click="cancel" v-if="disabled">
            <i class="cjm-icon-chevron-down cjm-icon-rotate-90"></i>返回</cjm-button>
          <cjm-button v-if="!disabled" @click="saveApproval" :loading="submitLoading" type="primary">
            <i class="cjm-icon-confirm"></i>确定</cjm-button>
          <cjm-button v-if="!disabled" @click="cancel">取消</cjm-button>
        </div>
      </div>
    </cjm-form>
  </div>
</template>
<script>
import pageSwitch from 'framework/mixins/pageSwitch';
export default {
  mixins: [pageSwitch],
  data() {
    return {
      active: 0,
      productID: '',
      submitLoading: false,
      disabled: false,
      nodesInfo: [],
      form: {
        reviewApplyID: '',
        applyBy: '',
        applyByName: '',
        applyCorp: '',
        applyCorpName: '',
        reviewModule: '1',
        reviewEntityID: '',
        level: '1',
        note: '',
        reviewResult: '',
        reviewOpinion: '',
        reviewBy: '',
        reviewTime: '',
        marketTime: '',
        reviewContent: []
      },
      rules: {
        note: [this.$formRules.maxLength(60)],
        reviewEntityID: [this.$formRules.required]
      }
    };
  },
  computed: {
    approvalModule() {
      return this.$globalData.get('trace', 'enums')['审批模块'];
    },
    approvalResultsItem() {
      return this.$globalData.get('trace', 'enums')['审批结果'];
    },
    levelItem() {
      return this.$globalData.get('trace', 'enums')['优先级'];
    }
  },
  methods: {
    next() {
      this.active = 1;
    },
    cancel() {
      this.popPage();
    },
    prev() {
      this.active = 0;
    },
    fetchDataProductBatch(query, callback) {
      this.$ajax
        .post(this.$globalData.get('trace', 'apiUrl').autoComplete.PRODUCT_BATCH, {
          pageSize: 50,
          keyWord: query,
          productid: this.productID
        })
        .then(r => {
          if (r.resultCode == '200') {
            callback(r.data);
          }
        });
    },
    saveApproval() {
      if (this.form.reviewOpinion != '' && this.form.reviewOpinion.length > 60) {
        this.$message.error('请输入小于60个字符的描述');
        return;
      }
      if (this.form.reviewResult == '') {
        this.$message.error('请选择审批结果');
        return;
      }
      this.submitLoading = true;
      this.$ajax.post(this.$globalData.get('trace', 'apiUrl').approval.REVIEW_APPLY, this.form).then(data => {
        if (data.resultCode != 200) {
          this.submitLoading = false;
          this.$message.error(data.msg);
        } else {
          this.popPage();
        }
      });
    },
    //获取批次上市时间
    getProductBatch(id) {
      this.$ajax
        .get(this.$globalData.get('base', 'apiUrl').productBatch.GET_PRODUCT_BATCH_INFO, { productBatchID: id })
        .then(r => {
          if (r.resultCode == '200') {
            //this.form = r.data;
            this.form.marketTime = r.data.marketTime;
          } else {
            this.$message.error(r.msg);
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    //获取溯源信息GET_DETAIL_LIST
    getDetailList(id) {
      this.$ajax
        .get(this.$globalData.get('trace', 'apiUrl').traceRecord.GET_DETAIL_LIST, { batchID: id })
        .then(r => {
          if (r.resultCode == '200') {
            this.form.reviewContent = r.data.rows;
          } else {
            this.$message.error(r.msg);
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    //查看获取溯源信息GET_DETAIL_LIST
    getApply(id) {
      this.$ajax
        .get(this.$globalData.get('trace', 'apiUrl').approval.GET_APPLY, { reviewApplyID: id })
        .then(r => {
          if (r.resultCode == '200') {
            if (r.data.reviewContent != '') {
              this.form.reviewContent = JSON.parse(r.data.reviewContent);
            }
          } else {
            this.$message.error(r.msg);
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    imgDataFormatter: function(val) {
      let imgs = val ? JSON.parse(val) : [];
      //console.log(imgs);
      let htl = '<ul>';
      for (let i = 0; i < imgs.length; i++) {
        if (imgs[i].url) {
          htl = htl + '<li>';
          htl = htl + '<img style="width:100%;" src="' + imgs[i].url + '"/>';

          if (imgs[i].title) {
            htl = htl + '<p>' + imgs[i].title + '</p>';
          }
          htl = htl + '</li>';
        }
      }
      htl = htl + '</ul>';
      return htl;
    }
  },
  created() {
    console.log(this.getPageParams('pending').row);
    if (this.getPageParams('pending') && this.getPageParams('pending').row) {
      let form = this.getPageParams('pending').row;
      form.reviewContent = [];
      form.marketTime = '';
      this.form = form;
      let reviewEntityID = this.getPageParams('pending').row.reviewEntityID;
      this.$nextTick(function() {
        this.getProductBatch(reviewEntityID);
        if (this.getPageParams('pending').type == 'view') {
          this.disabled = true;
          this.getApply(this.getPageParams('pending').row.reviewApplyID);
        } else {
          this.getDetailList(reviewEntityID);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.node-steps {
  margin-bottom: 20px;
}

.product-select {
  width: 500px;
  margin: 100px auto 80px;
  position: relative;
  left: -30px;
}
img {
  width: 100%;
}
@import '../../../../assets/css/config';
.node-details.node-details-list {
  max-width: 800px;
  min-width: 400px;
  .fl {
    float: left;
  }

  .fr {
    float: right;
  }

  .clearfix:after {
    display: block;
    content: '.';
    clear: both;
    height: 0;
    visibility: hidden;
  }
  .node-detail-item {
    background: @DarkWhite;
    border: 1px @LightGray solid;
    margin-bottom: 20px;
    font-size: 14px;
    color: @Silver;
    .item-title {
      .block-button .icon-passed {
        color: #057748;
      }
      .block-button .icon-error {
        color: #f44336;
      }
      border-bottom: 1px @ExtraLightGray solid;
      height: 45px;
      line-height: 45px;
      .title-name {
        /*margin-right: 520px;*/
        & :first-child {
          display: inline-block;
          padding: 0px 20px;
          height: 26px;
          border-right: 1px @LightGray solid;
          line-height: 26px;
          margin-right: 15px;
        }
      }
      .item-operates {
        float: right;
        /*width: 515px;*/
        margin: -45px 0 0 0;
        i {
          cursor: pointer;
          color: @primaryColor;
        }
        .icon-text {
          font-size: 14px;
          color: @primaryColor;
        }
        .cjm-icon-caret-down {
          color: #bfcbd9;
          margin: 0 15px;
        }
        .switch-toggle {
          border-left: 1px solid #f0f0f0;
          line-height: 35px;
          display: inline-block;
          cursor: pointer;
        }
        .rt-box {
          margin-right: 20px;
          cursor: pointer;
        }
      }
    }
    .item-info {
      margin: 20px 20px 0 20px;
      & > ul > li {
        margin-bottom: 20px;
      }
      label {
        display: inline-block;
        width: 135px;
        text-align: right;
        margin-right: 25px;
        vertical-align: top;
      }
      .imgs-box {
        display: inline-block;
        width: ~'calc(100% - 170px)';
      }
      .field-value {
        white-space: nowrap;
        max-width: 360px;
        overflow: hidden;
        display: inline-block;
        text-overflow: ellipsis;
      }
    }
  }

  .item-operates .el-radio {
    color: @Silver;
  }

  .imgs-box {
    margin-bottom: -10px;
    li {
      position: relative;
      margin: 0 10px 10px 0;
      float: left;
      width: 130px;
      height: 130px;
      line-height: 130px;
      text-align: center;
      border: 1px solid #c2c2c2;
      background-color: #fff;
      img {
        max-width: 130px;
        max-height: 130px;
        width: 130px;
        vertical-align: middle;
      }
      p {
        position: absolute;
        width: 100%;
        height: 25px;
        line-height: 25px;
        font-size: 17px;
        bottom: 0;
        left: 0;
        color: #fff;
        background: rgba(0, 0, 0, 0.4);
        text-indent: 5px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
      }
    }
  }
}
</style>
