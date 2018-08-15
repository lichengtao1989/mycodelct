<template>
  <cjm-dialog ref="dialog" :visible.sync="dialogVisible" type="step" :height="780">
    <cjm-steps :active="activeStep">
      <cjm-step title="通知设置"></cjm-step>
      <cjm-step title="通知卡片设置"></cjm-step>
    </cjm-steps>
    <cjm-form ref="formBase"
              v-show="activeStep===0"
              :model="form"
              :rules="rules">
      <cjm-form-item label="通知标题" prop="title" required class="cjm-form-item-long">
        <cjm-input v-model="form.title"></cjm-input>
      </cjm-form-item>
      <cjm-form-item label="通知内容" prop="content" required class="cjm-form-item-long">
        <cjm-editor v-model="form.content" :height="350"></cjm-editor>
      </cjm-form-item>
      <cjm-form-item label="通知范围" prop="range" required class="cjm-form-item-long" v-if="!isAdmin">
        <cjm-radio v-model="form.range" label="10" v-if="isHead">全组织</cjm-radio>
        <cjm-radio v-model="form.range" label="15" v-if="!isHead">所有下级机构</cjm-radio>
        <cjm-radio v-model="form.range" label="20">指定对象</cjm-radio>
      </cjm-form-item>
      <cjm-form-item label="通知机构" prop="target" required class="cjm-form-item-long" v-if="form.range==20">
        <cjm-transfer v-model="form.target"
                      :data="targetData"></cjm-transfer>
      </cjm-form-item>
    </cjm-form>
    <cjm-form ref="formCard"
              v-show="activeStep===1"
              :model="form"
              :rules="rules">
      <cjm-form-item label="卡片时效" prop="validTime" required class="cjm-form-item-long">
        <div class="clear">
          <cjm-radio v-model="validityTimeType" label="0" style="float: left; line-height:36px;">固定时间</cjm-radio>
          <cjm-date-range-picker :begin-time.sync="form.validityBeginTime"
                                 :end-time.sync="form.validityEndTime"
                                 type="datetime"
                                 style="float: left; width: 450px;"></cjm-date-range-picker>
        </div>
        <cjm-radio v-model="validityTimeType" label="1">长期</cjm-radio>
      </cjm-form-item>
      <cjm-form-item label="发布源" prop="showCreater" required class="cjm-form-item-long">
        <cjm-radio v-model="form.showCreater" label="1">显示发布源</cjm-radio>
        <cjm-radio v-model="form.showCreater" label="0">不显示发布源</cjm-radio>
      </cjm-form-item>
      <cjm-form-item label="卡片能否关闭" prop="closable" required class="cjm-form-item-long">
        <cjm-radio v-model="form.closable" label="1">允许关闭</cjm-radio>
        <cjm-radio v-model="form.closable" label="0">不允许关闭</cjm-radio>
      </cjm-form-item>
      <p class="notification-edit-preview-tips">根据上述配置，预览图如下</p>
      <cjm-cards>
        <cjm-card :title="form.title"
                  :sub-title="subTitle"
                  :formatStyle="true"
                  style="margin: 0 auto; float: none;">
          <div class="notification-edit-preview-card" v-html="form.content"></div>
          <template slot="operate">
            <cjm-button type="text"><i class="cjm-icon-detail1"></i>详情</cjm-button>
            <cjm-button type="text" v-if="form.closable=='1'"><i class="cjm-icon-confirm"></i>了解了
            </cjm-button>
          </template>
        </cjm-card>
      </cjm-cards>
    </cjm-form>
    <div slot="footer">
      <cjm-button @click="preStep"
                  v-show="activeStep>0"
                  :disabled="loading">
        <i class="cjm-icon-chevron-down cjm-icon-rotate-90"></i>上一步
      </cjm-button>
      <cjm-button type="primary"
                  @click="nextStep"
                  v-show="activeStep<1"
                  :disabled="loading">
        下一步<i class="cjm-icon-chevron-down cjm-icon-rotate-n90" style="margin-right: 0; margin-left: 6px;"></i>
      </cjm-button>
      <cjm-button type="primary"
                  @click="submit(1)"
                  v-show="activeStep===1"
                  :loading="loading">
        <i class="cjm-icon-confirm"></i>完成并启用
      </cjm-button>
      <cjm-button @click="submit(0)"
                  v-show="activeStep===1"
                  :loading="loading">
        <i class="cjm-icon-confirm"></i>完成并禁用
      </cjm-button>
      <cjm-button @click="cancel" :disabled="loading"><i class="cjm-icon-close"></i>取消</cjm-button>
    </div>
  </cjm-dialog>
</template>

<script>
  import CjmCards from 'framework/components/base/cards'
  import CjmCard from 'framework/components/base/card'
  import CjmEditor from 'framework/components/base/editor'
  export default{
    components: {
      CjmEditor,
      CjmCards,
      CjmCard
    },
    data(){
      return {
        enums: this.$globalData.get('base', 'enums'),
        apiUrl: this.$globalData.get('base', 'apiUrl'),
        activeStep: 0,
        loading: false,
        validityTimeType: '0',
        form: {},
        rules: {
          title: [
            this.$formRules.required,
            this.$formRules.maxLength(30)
          ],
          content: [
            this.$formRules.required
          ],
          target: [
            this.$formRules.required
          ],
          showCreater: [
            this.$formRules.required
          ],
          closable: [
            this.$formRules.required
          ]
        },
        targetData: []
      }
    },
    props: {
      visible: Boolean
    },
    computed: {
      //是否是超级管理员
      isAdmin(){
        return this.$globalData.get('currentUser').isAdmin == '1';
      },
      //是否是总部
      isHead(){
        return this.$globalData.get('currentUser').orgType == this.enums.orgType.HEAD;
      },
      //弹框是否显示
      dialogVisible: {
        get: function () {
          return this.visible;
        },
        set: function (val) {
          this.$emit('update:visible', val);
        }
      },
      //预览卡片副标题
      subTitle(){
        let result = '';
        if (this.form.showCreater == '1') {
          result = this.$globalData.get('currentUser').orgName + '  ';
        }
        result += new Date().toString('yyyy/MM/dd');
        return result;
      }
    },
    watch: {
      validityTimeType: function (val) {
        if (val === '1') {
          this.form.validityBeginTime = '';
          this.form.validityEndTime = '';
        }
      },
      'form.range': function (val) {
        if (val == '20' && this.targetData.length === 0) {
          this.getTargetData();
        }
      }
    },
    methods: {
      addForm(){
        this.reset();
      },
      editForm(id){
        this.reset();
        this.$ajax.post(this.apiUrl.notification.GET, {id: id}).then(r=> {
          if (r.resultCode == '200') {
            this.form = r.data;
            //如果有效起始时间和结束时间都为空，则表示为长期
            if (r.data.validityBeginTime == '' && r.data.validityEndTime == '') {
              this.validityTimeType = '1';
            }
          } else {
            this.$message.error(r.msg);
          }
        }).catch(error=> {
          this.$message.error(error.message);
        });
      },
      reset(){
        this.activeStep = 0;
        this.validityTimeType = '0';
        let range;
        if (this.isAdmin) {
          range = '1';
        } else {
          if (this.isHead) {
            range = '10';
          } else {
            range = '15';
          }
        }
        this.form = {
          id: '',
          title: '',
          range: range,
          target: [],
          content: '',
          validityBeginTime: '',
          validityEndTime: '',
          showCreater: '1',
          closable: '1',
          status: ''
        };
        this.$nextTick(()=> {
          if (this.$refs.formBase) {
            this.$refs.formBase.resetFields();
          }
          if (this.$refs.formCard) {
            this.$refs.formCard.resetFields();
          }
        });
      },
      preStep(){
        this.activeStep--;
      },
      nextStep(){
        this.$refs.formBase.validate(valid=> {
          if (valid) {
            this.activeStep++;
          }
        });
      },
      submit(status){
        this.form.status = status;
        this.$refs.formCard.validate(valid=> {
          if (valid) {
            this.loading = true;
            if (this.form.range != '20') {
              this.form.target = [];
            }
            this.$ajax.post(this.apiUrl.notification.SAVE, this.form).then(r=> {
              if (r.resultCode == '200') {
                this.dialogVisible = false;
                this.$emit('submitSuccess');
              } else {
                this.$message.error(r.msg);
              }
              this.loading = false;
            }).catch(error=> {
              this.$message.error(error.message);
              this.loading = false;
            });
          }
        });
      },
      cancel(){
        this.$confirm('确认取消编辑？', '提示', {type: 'warning'}).then(()=> {
          this.dialogVisible = false;
        }).catch(()=> {});
      },
      getTargetData(){
        this.$ajax.get(this.apiUrl.autoComplete.ORG, {pageSize: 1000000}).then(r=> {
          if (r.resultCode == '200') {
            this.targetData = r.data;
          }
        })
      }
    },
    created(){
      this.reset();
    }
  }
</script>

<style rel='stylesheet/less' lang='less' scoped>
  .notification-edit-preview-tips {
    clear: both;
    font-size: 13px;
    color: #333;
    margin: 20px;
  }

  .notification-edit-preview-card {
    height: 13.5em;
    line-height: 1.5em;
    overflow: hidden;
  }
</style>
