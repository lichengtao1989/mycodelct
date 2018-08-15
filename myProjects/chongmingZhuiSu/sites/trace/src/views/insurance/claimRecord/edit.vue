<template>
  <div class="cjm-view-page">
    <cjm-form ref="form" :model="audit" :rules="rules">
      <div class="cjm-table-row">
        <cjm-form-item label="理赔项目">
          {{compensationContents}}
        </cjm-form-item>
        <cjm-form-item label="报案时间">
          {{lastUpdateTime}}
        </cjm-form-item>
      </div>
      <div class="cjm-table-row">
        <cjm-form-item label="报案人">
          {{policyHoldersName}}
        </cjm-form-item>
        <cjm-form-item label="报案人手机">
          {{policyHoldersMobile}}
        </cjm-form-item>
      </div>
      <div class="cjm-table-row">
        <cjm-form-item label="银行卡">
          {{bankName}}
          <br/>
          {{bankAccount}}
        </cjm-form-item>
        <cjm-form-item label="银行所在">
          {{bankProvince}}-{{bankCity}}-{{bankDistrict}}
        </cjm-form-item>
      </div>
      <cjm-form-item label="证明材料" class="cjm-form-item-long">
        <cjm-image-upload v-model="insuranceClaimsPictureFile" :multiple="true" :maxNumber="5" :disabled="true"
                          v-if="insuranceClaimsPictureFile && insuranceClaimsPictureFile.length>0"></cjm-image-upload>
        <a v-if="insuranceClaimsPictureFile.length>0" href="javascript:void(0);" class="downLoad"
           @click="downLoadImages(insuranceClaimsPictureFile)">下载全部</a>
      </cjm-form-item>
      <cjm-form-item label="产品照" class="cjm-form-item-long">
        <cjm-image-upload v-model="productFileList" :multiple="true" :maxNumber="5" :disabled="true"
                          v-if="productFileList && productFileList.length>0"></cjm-image-upload>
      </cjm-form-item>
      <cjm-form-item label="报案过程" class="cjm-form-item-long">
        {{note}}
      </cjm-form-item>
      <div class="zoom">
        <cjm-form-item label="审核状态" v-if="!isAudit" class="cjm-form-item-long">
          <div v-if="insuranceCompensationAuditRecord && insuranceCompensationAuditRecord.length>0">
            {{insuranceCompensationStatusList[insuranceCompensationAuditRecord[0].auditStatus]}}<br/>
            {{insuranceCompensationAuditRecord[0].failCaus}}
            <cjm-image-upload v-model="successProof" :multiple="true" :disabled="true"
                              v-if="successProof && successProof.length>0"></cjm-image-upload>
          </div>
          <div v-if="!insuranceCompensationAuditRecord || insuranceCompensationAuditRecord.length==0">
            {{insuranceCompensationStatusList[insuranceCompensationStatus]}}
          </div>
        </cjm-form-item>
        <cjm-form-item label="审核状态" v-if="isAudit" prop="insuranceCompensationStatus" class="cjm-form-item-long"
                       required>
          <cjm-radio-group v-model="audit.insuranceCompensationStatus" @change="auditType">
            <cjm-radio label="3" key="3">审核通过</cjm-radio>
            <cjm-radio label="4" key="4">审核失败</cjm-radio>
            <cjm-radio label="5" key="5">赔付成功</cjm-radio>
            <cjm-radio label="6" key="6">赔付失败</cjm-radio>
          </cjm-radio-group>
          <div v-if="audit.insuranceCompensationStatus==5">
            <cjm-image-upload v-model="audit.successProof" :multiple="false"></cjm-image-upload>
          </div>
          <div v-if="audit.insuranceCompensationStatus==4||audit.insuranceCompensationStatus==6">
            <textarea v-model="audit.failCause" :placeholder="placeholder"></textarea>
          </div>
        </cjm-form-item>
        <cjm-form-item label="审核日志" v-if="!isCorp" class="cjm-form-item-long">
          <ul class="audit-table-list">
            <li v-for="record in insuranceCompensationAuditRecord">
              <span>{{record.auditorLoginName || '**'}}({{record.auditorUserName || '**'}})</span>
              <span>{{insuranceCompensationStatusList[record.auditStatus]}}</span>
              <span>{{record.auditTime}}</span>
              <span>{{record.failCause}}</span>
            </li>
          </ul>
        </cjm-form-item>
      </div>
    </cjm-form>
    <div class="cjm-page-bottom-holder"></div>
    <div class="cjm-page-bottom-bar">
      <cjm-button type="default" @click="returnList"><i class="cjm-icon-reset"></i>返回</cjm-button>
      <cjm-button type="primary" v-if="isAudit" @click="submit"><i class="cjm-icon-confirm"></i>确定</cjm-button>
    </div>
  </div>
</template>
<script>
  import pageSwitch from 'framework/mixins/pageSwitch';
  import fileDownload from 'framework/utils/fileDownload';
  export default {
    mixins: [pageSwitch],
    data() {
      return {
        audit: {
          insuranceCompensationID: '',
          successProof: '',
          failCause: '',
          insuranceCompensationStatus: ''
        },
        compensationContents: '',
        lastUpdateTime: '',
        policyHoldersName: '',
        policyHoldersMobile: '',
        bankAccount: '',
        bankName: '',
        bankProvince: '',
        bankCity: '',
        bankDistrict: '',
        note: '',
        successProof: [],
        insuranceClaimsPictureFile: '',
        insuranceCompensationStatus: '',
        productFileList: '',
        insuranceCompensationAuditRecord: '',
        placeholder: '',
        insuranceCompensationStatusList: {
          '1': '已撤销',
          '2': '审核中',
          '3': '审核成功',
          '4': '审核失败',
          '5': '赔付成功',
          '6': '赔付失败'
        },
        isCorp: false,
        rules: {
          insuranceCompensationStatus: [
            {
              validator: (rule, value, callback) => {
                if (value == '') {
                  callback(new Error(`请进行审核操作`));
                } else {
                  callback();
                }
              }, trigger: 'change'
            }
          ]
        }
      }
    },
    methods: {
      //返回列表
      returnList(){
        this.popPage();
      },
      //下载图片
      downLoadImages(pictureUrlList){
        fileDownload(pictureUrlList);
      },
      //初始化记录数据
      initData(d){
        this.compensationContents = d.compensationContents;
        this.lastUpdateTime = d.lastUpdateTime;
        this.policyHoldersName = d.policyHoldersName;
        this.policyHoldersMobile = d.policyHoldersMobile;
        this.bankName = d.bankName;
        this.bankAccount = d.bankAccount;
        this.bankProvince = d.bankProvince;
        this.bankCity = d.bankCity;
        this.bankDistrict = d.bankDistrict;
        this.note = d.note;
        this.insuranceCompensationStatus = d.insuranceCompensationStatus;
        d.successProof && this.successProof.push(d.successProof);
        this.insuranceClaimsPictureFile = d.insuranceClaimsPictureFile.map((item) => {
          return item.pictureType == 0 ? item.pictureUrl : '';
        }).filter((item) => {
          return item;
        });
        if (this.insuranceClaimsPictureFile.length == 0 && d.images) {
          let images = JSON.parse(d.images);
          this.insuranceClaimsPictureFile = images.map((item) => {
            return item.url || '';
          }).filter((item) => {
            return item;
          });
        }
        this.productFileList = d.insuranceClaimsPictureFile.map((item) => {
          return item.pictureType == 1 ? item.pictureUrl : '';
        }).filter((item) => {
          return item;
        });
        this.insuranceCompensationAuditRecord = d.insuranceCompensationAuditRecord;
      },
      //审核类型
      auditType(type){
        this.audit.insuranceCompensationStatus = type;
        this.audit.Note = '';
        if (type == 4) {
          this.placeholder = '请输入审核失败原因';
        }
        if (type == 6) {
          this.placeholder = '请输入理赔失败原因';
        }
      },
      //提交
      submit(){
        this.$refs.form.validate((val) => {
          if (!val) {
            return;
          }
          if (this.audit.insuranceCompensationStatus == '4' && !this.audit.failCause) {
            this.$message.warning('请输入审核未通过原因');
            return;
          }
          if (this.audit.insuranceCompensationStatus == '5' && !this.audit.successProof) {
            this.$message.warning('请上传赔付成功的证明');
            return;
          }
          if (this.audit.insuranceCompensationStatus == '6' && !this.audit.failCause) {
            this.$message.warning('请输入赔付失败原因');
            return;
          }
          let self = this;
          this.$ajax.get(this.$globalData.get('trace', 'apiUrl').insurance.claim.GET_CHECK, {insuranceCompensationID: this.audit.insuranceCompensationID}).then((r) => {
            if (r.resultCode == '200' && r.data && r.data) {
              var result = r.data;
              //状态为撤销时，返回列表页面
              if (result.insuranceCompensationStatus == 1) {
                this.$message({
                  message: '审核无效，理赔申请已被撤销',
                  type: 'warning',
                  duration: '3000',
                  onClose: function () {
                    self.returnList();
                  }
                });
                return
              }
              //新的更新时间大于当前更新时间,则为理赔有更新
              if ((new Date(result.lastUpdateTime.replace(/-/g, '\/'))).getTime() > (new Date(this.lastUpdateTime.replace(/-/g, '\/'))).getTime()) {
                this.$message.warning('理赔申请有更新，请刷新当前页', 3000);
                return
              }
              this.$ajax.post(this.$globalData.get('trace', 'apiUrl').insurance.claim.AUDIT, this.audit).then((r) => {
                if (r.resultCode == '200') {
                  this.returnList();
                } else {
                  this.$message.error('审核失败');
                }
              }).catch(() => {
                this.$message.error('操作失败');
              });
            }
          });
        });
      }
    },
    created(){
      this.audit.insuranceCompensationID = this.getPageParams('view').id;
      this.isAudit = this.getPageParams('view').type == 'audit';
      this.$ajax.get(this.$globalData.get('trace', 'apiUrl').insurance.claim.GET_CHECK, {insuranceCompensationID: this.audit.insuranceCompensationID}).then((r) => {
        if (r.resultCode == '200' && r.data) {
          this.initData(r.data);
        }
      });
      this.$ajax.get(this.$globalData.get('trace', 'apiUrl').insurance.claim.CHECK_LOGIN).then((r) => {
        if (r.resultCode == 200) {
          this.isCorp = r.data == 0;
        }
      });
    }
  }
</script>
<style scoped rel='stylesheet/less' lang='less'>
  .downLoad {
    color: #20a0ff;
  }

  textarea {
    border: 1px solid #eee;
    resize: none;
    outline: none;
    padding: 20px;
    width: 320px;
    height: 45px;
  }

  .audit-table-list {
    max-height: 800px;
    span {
      display: inline-block;
      zoom: 1;
      margin: 5px 10px;
      &:first-child {
        width: 148px;
      }
      &:first-child + span {
        width: 60px;
      }
      &:first-child + span + span {
        width: 148px;
      }
    }
  }
</style>
