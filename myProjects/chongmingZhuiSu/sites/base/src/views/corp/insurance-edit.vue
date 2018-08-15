<template>
  <div>
    <cjm-form ref="form" :model="form" :rules="rules">
      <cjm-tabs v-model="activeName">
        <cjm-tab-pane label="险种信息" name="1">
          <div v-for="(value1,index1) in form.configList" :key="index1">
            <h1 class="cjm-h1">{{value1.insureTypeName}}设置</h1>
            <cjm-form-item label="有效期" prop="validity" required>
              <cjm-input v-model="value1.validity" :maxlength="50"></cjm-input>
            </cjm-form-item>
            <cjm-form-item label="码单价" prop="singleCharge"  required>
              <cjm-input v-model="value1.singleCharge" :maxlength="50"></cjm-input>
            </cjm-form-item>
          </div>
        </cjm-tab-pane>
        <cjm-tab-pane label="邮件模板" name="2">
          <div  v-for="(value2,index2) in form.contentList" :key="index2">
           <cjm-form-item :label="value2.name" prop="recipients" required v-if="value2.typeName =='InsureEmailAddress'" class="cjm-form-item-long">
              <cjm-tag :key="tag"
                type="primary"
                v-for="tag in recipients"
                closable
                :disable-transitions="false"
                class="email-tag"
                @close="handleClose(tag)">
                {{tag}}
              </cjm-tag>
              <cjm-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model.trim="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"></cjm-input>
              <cjm-button v-else size="small" @click="showInput"><i class="cjm-icon-add"></i>添加收件人</cjm-button>
             </cjm-form-item>
             <cjm-form-item :label="value2.name"  required v-else-if="value2.typeName =='Hotline'" class="cjm-form-item-long" style="padding:0px 0 20px 0;">
                <cjm-input v-model="value2.content" :maxlength="50"></cjm-input>
              </cjm-form-item>
             <cjm-form-item :label="value2.name"  required v-else class="cjm-form-item-long" style="padding:0px 0 20px 0;">
                <cjm-input v-model="value2.title" :placeholder="value2.placeholder" v-if="value2.typeName !='BankAccount'" style="padding:0px 0 20px 0;"></cjm-input>
                <cjm-editor v-model="value2.content" :height="150"></cjm-editor>
              </cjm-form-item>
              </div>
        </cjm-tab-pane>
      </cjm-tabs>
    </cjm-form>
  </div>
</template>

<script>
import { Tag } from 'element-ui';
import CjmEditor from 'framework/components/base/editor';
export default {
  components: {
    'cjm-tag': Tag,
    CjmEditor
  },
  data() {
    return {
      form: {},
      inputVisible: false,
      inputValue: '',
      activeName: '1',
      recipients: [],
      rules: {}
    };
  },
  computed: {
    insurance() {
      return this.$globalData.get('base', 'enums')['保险类型'];
    }
  },
  methods: {
    handleClose(tag) {
      this.recipients.splice(this.recipients.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput[0].$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        if (this.verifyEmail(inputValue)) {
          this.recipients.push(inputValue);
          this.inputVisible = false;
          this.inputValue = '';
        } else {
          this.$message.error('请输入正确邮箱格式');
          this.inputVisible = true;
          this.inputValue = '';
        }
      } else {
        this.inputVisible = false;
        this.inputValue = '';
      }
    },
    verifyEmail(strEmail) {
      if (strEmail && strEmail.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1) {
        return true;
      } else {
        return false;
      }
    },
    reset() {
      this.recipients = [];
      this.form = {
        insureCorpID: '',
        recipients: [],
        configList: [
          {
            insureType: '1',
            insureTypeName: '综合险',
            validity: '',
            singleCharge: ''
          },
          {
            insureType: '2',
            insureTypeName: '基础险',
            validity: '',
            singleCharge: ''
          }
        ],
        contentList: [
          {
            typeName: 'InsureEmailAddress',
            title: '',
            content: '',
            name: '邮箱设置'
          },
          {
            typeName: 'Hotline',
            title: '',
            content: '',
            name: '热线电话'
          },
          {
            typeName: 'BankAccount',
            title: '',
            content: '',
            name: '银行账号',
            placeholder: '审核中邮件标题'
          },
          {
            typeName: 'Auditing',
            title: '',
            content: '',
            name: '审核中',
            placeholder: '审核中邮件标题'
          },
          {
            typeName: 'AuditFailed',
            title: '',
            content: '',
            name: '审核未通过',
            placeholder: '审核未通过邮件标题'
          },
          {
            typeName: 'AuditApproved',
            title: '',
            content: '',
            name: '审核通过',
            placeholder: '审核通过邮件标题'
          },
          {
            typeName: 'AlreadyInsured',
            title: '',
            content: '',
            name: '已承保',
            placeholder: '已承保邮件标题'
          },
          {
            typeName: 'UnderwritingFailed',
            title: '',
            content: '',
            name: '承保失败',
            placeholder: '承保失败邮件标题'
          },
          {
            typeName: 'CustomerClaims',
            title: '',
            content: '',
            name: '消费者理赔',
            placeholder: '消费者理赔邮件标题'
          }
        ]
      };
      this.activeName = '1';
      this.$nextTick(() => {
        this.$refs.form.resetFields();
      });
    },
    editForm(id) {
      this.reset();
      this.form.insureCorpID = id;
      this.$ajax
        .get(this.$globalData.get('base', 'apiUrl').corp.GET_CONFIG, { insureCorpID: id })
        .then(r => {
          if (r.resultCode == 200) {
            let self = this;
            if (r.data.configList.length > 0) {
              r.data.configList.map(function(x, index) {
                self.form.configList.map(o => {
                  if (o.insureType == x.insureType) {
                    o.validity = x.validity;
                    o.singleCharge = x.singleCharge;
                  }
                });
              });
            }
            if (r.data.contentList.length > 0) {
              r.data.contentList.map(function(x, index) {
                self.form.contentList.map(o => {
                  if (o.typeName == x.typeName) {
                    o.content = x.content;
                    o.title = x.title;
                  }
                });
                if (x.typeName == 'InsureEmailAddress') {
                  self.recipients = x.content ? x.content.split(',') : [];
                }
              });
            }
          } else {
            this.$message.error(r.msg);
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    submit() {
      let valid = true;
      return new Promise((resolve, reject) => {
        this.form.configList.map(o => {
          if (o.validity == '' || o.validity < 0 || o.validity % 1 != 0) {
            reject(new Error('请输入正确的有效期'));
            valid = false;
          } else if (o.singleCharge == '' || !/^\d+(\.\d{1,2})?$/.test(o.singleCharge)) {
            reject(new Error('请输入正确的码单价'));
            valid = false;
          }
        });
        this.form.contentList.map(o => {
          if (o.content == '' && o.typeName != 'InsureEmailAddress') {
            reject(new Error('请输入正确邮件模板'));
            valid = false;
          }
        });
        if (valid) {
          this.form.contentList[0].content = this.recipients.join(',');
          this.$ajax
            .post(this.$globalData.get('base', 'apiUrl').corp.SAVE_CONFIG, this.form)
            .then(r => {
              if (r.resultCode == 200) {
                resolve();
              } else {
                reject(new Error('保存失败'));
              }
            })
            .catch(() => {
              reject(new Error('请设置正确的信息'));
            });
        } else {
          reject(new Error('请设置正确的信息'));
        }
      });
    }
  }
};
</script>

<style scoped>
.email-tag {
  height: 28px !important;
  line-height: 26px !important;
}
.email-tag + .email-tag {
  margin-left: 5px;
}
.input-new-tag {
  width: 190px;
}
.email-title {
  width: 220px;
}
.email-title-remarks {
  color: #aaa;
  font-size: 13px;
}
.el-tag {
  height: 32px;
  line-height: 30px;
}
</style>
