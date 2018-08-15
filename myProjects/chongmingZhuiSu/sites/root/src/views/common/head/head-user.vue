<template>
  <div>
    <div class="cjm-head-user" @mouseover="mouseOverHandler" @mouseout="mouseOutHandler">
      <p>
        <i class="cjm-icon-user"></i>
        <i class="cjm-icon-caret-down"></i>
      </p>
      <ul v-show="popVisible">
        <li class="cjm-head-user-headImg">
          <img src="../../../assets/images/icon-user-head.png"/>
        </li>
        <li class="cjm-head-user-txtItem cjm-head-user-name">
          {{userName}}
        </li>
        <!--<li class="cjm-head-user-txtItem" @click="helpCenter">-->
          <!--<i class="cjm-icon-question"></i>帮助中心-->
        <!--</li>-->
        <li class="cjm-head-user-txtItem" @click="changePasswordDialogVisible=true">
          <i class="cjm-icon-change-password"></i>修改密码
        </li>
        <li class="cjm-head-user-txtItem" @click="logout">
          <i class="cjm-icon-enable"></i>退出登录
        </li>
      </ul>
    </div>

    <cjm-dialog title="修改密码" :visible.sync="changePasswordDialogVisible" :okHandler="changePassword">
      <cjm-form :model="changePasswordForm" :rules="changePasswordRules" ref="changePasswordForm" class="form-nowrap">
        <cjm-form-item label="当前密码" prop="currentPassword" class="float-none">
          <cjm-input type="password" v-model="changePasswordForm.currentPassword"></cjm-input>
        </cjm-form-item>
        <cjm-form-item label="新密码" prop="newPassword" class="cjm-form-item-inline float-none">
          <cjm-input type="password" v-model="changePasswordForm.newPassword"></cjm-input>
        </cjm-form-item>
        <span class="password-alert-text">密码为8～18位字母+数字，必须用字母开头!</span>
        <cjm-form-item label="确认密码" prop="newPasswordConfirm" class="float-none">
          <cjm-input type="password" v-model="changePasswordForm.newPasswordConfirm"></cjm-input>
        </cjm-form-item>
      </cjm-form>
    </cjm-dialog>
  </div>
</template>

<script>
  import logout from '../../../utils/logout'
  export default{
    data(){
      return {
        popVisible: false,
        changePasswordDialogVisible: false,
        changePasswordForm: {
          currentPassword: '',
          newPassword: '',
          newPasswordConfirm: ''
        },
        changePasswordRules: {
          currentPassword: [
            {required: true, message: '请输入当前密码', trigger: 'blur'}
          ],
          newPassword: [
            {required: true, message: '请输入新密码', trigger: 'blur'}
          ],
          newPasswordConfirm: [
            {required: true, message: '请确认新密码', trigger: 'blur'}
          ]
        },
        timer: null
      }
    },
    computed: {
      userName(){
        return this.$globalData.get('currentUser').userName;
      }
    },
    watch: {
      changePasswordDialogVisible(val){
        if (val) {
          this.$nextTick(()=> {
            this.$refs['changePasswordForm'].resetFields();
          });
        }
      }
    },
    methods: {
      mouseOverHandler(){
        this.popVisible = true;
        if (this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
        }
      },
      mouseOutHandler(){
        this.timer = setTimeout(()=> {
          this.popVisible = false;
        }, 100);
      },
      //帮助中心
      helpCenter(){
        window.open(this.$globalData.get('root', 'appConfig').helpCenterUrl);
      },
      //修改密码
      changePassword(callback){
        this.$refs['changePasswordForm'].validate((valid) => {
          if (valid) {
            if (this.changePasswordForm.newPassword != this.changePasswordForm.newPasswordConfirm) {
              this.$message('两次密码输入不同，请重新输入');
              callback();
              return;
            }else if (this.changePasswordForm.newPassword == this.changePasswordForm.currentPassword) {
              this.$message('新旧密码不能相同');
              callback();
              return;
            }
            this.$ajax.post(this.$globalData.get('root', 'apiUrl').CHANGE_PASSWORD, {
              oldPwd: this.changePasswordForm.currentPassword,
              newPwd: this.changePasswordForm.newPassword
            }).then((r)=> {
              if (r.resultCode == 200) {
                this.$message.success('修改成功');
                this.changePasswordDialogVisible = false;
                // if(localStorage.getItem('submitOnOff')){
                //   localStorage.setItem('submitOnOff',false);
                // }
                logout()
              } else {
                this.$message.error(r.msg);
              }
              callback();
            })
          } else {
            callback();
          }
        });
      },
      //退出登录
      logout(){
        logout();
      }
    }
  }
</script>

<style rel='stylesheet/less' lang='less'>
  .cjm-head-user {
    position: relative;
    display: inline-block;
    color: #666;
    width: 41px;

    p {
      i.cjm-icon-user {
        position: relative;
        top: 2px;
        font-size: 20px;
        color: #fff;
      }
      i.cjm-icon-caret-down {
        position: relative;
        left: -2px;
        font-size: 13px;
        color: #fff;
      }
    }

    ul {
      position: absolute;
      right: -6px;
      top: 52px;
      width: 186px;
      z-index: 1000;
      border: 1px solid #ccc;
      padding: 15px 0;
      box-shadow: 2px 2px 3px 0px #DEDDDD;
      background: #fff;
      border-radius: 5px;

      &:before {
        display: block;
        content: ' ';
        width: 0;
        height: 0;
        border-bottom: 10px solid #fff;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        top: -10px;
        position: absolute;
        left: 150px;
      }

      li {
        i {
          font-size: 16px;
          margin-right: 8px;
          font-weight: bold;
        }
      }
    }
  }

  .cjm-head-user-txtItem {
    padding: 0 28px;
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    text-align: center;
    cursor: pointer;
  }

  .cjm-head-user-txtItem:hover {
    background: #eee;
  }

  .cjm-head-user-name:hover {
    background: none;
  }

  .cjm-head-user-headImg {
    text-align: center;

    img {
      width: 60px;
      height: 60px;
      vertical-align: bottom;
    }
  }

  .cjm-dialog-body .el-form .float-none {
    float: none;
  }

  .cjm-dialog-body-panel .form-nowrap {
    white-space: nowrap;
  }
  .cjm-form-item-inline {
    display: inline-block;
  }
  .password-alert-text {
    display: inline-block;
    font: 14px/34px  "微软雅黑";
    color: #a7a7a1;
    margin-left: 20px;
  }
</style>
