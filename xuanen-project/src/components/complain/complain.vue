<template>
  <div class="complainout">

    <div class="lxwm">投诉举报</div>
    <!--<span>{{form}}</span>-->
    <div class="myform">
      <div class="ppart">
        <div class="left">举报人姓名</div>
        <div class="right"><input type="text" v-model="form.FeedbackModel.OperatePeople" class="istyle" placeholder="举报人姓名(必填)"></div>
      </div>
      <div class="ppart">
        <div class="left">手机号码</div>
        <div class="right">
          <input type="text" class="istyle" v-model="form.FeedbackModel.OperateMobile" placeholder="举报人姓名(必填)">
        </div>
      </div>
      <div class="ppart">
        <div class="left">举报的企业名称</div>
        <div class="right">
          <input type="text" class="istyle" v-model="form.FeedbackModel.CorpName" placeholder="举报人姓名(必填)">
        </div>
      </div>
      <div class="ppart">
        <div class="left">举报的产品名称</div>
        <div class="right"><input type="text" class="istyle" v-model="form.FeedbackModel.ProductName" placeholder="举报人姓名(必填)"></div>
      </div>
      <div class="ppart">
        <div class="left">举报内容</div>
        <div class="right"><textarea name="" v-model="form.FeedbackModel.FeedbackContent" id="textarea"></textarea></div>
      </div>
      <div class="ppart">
        <div class="left">举报的产品图片</div>
        <div class="right">
          <div class="updiv">
            <input type="file" v-if="isRenderFileInput" @change="onFileSelected" class="myfile">
          </div>
          <div class="upsm">(文件不超过2M,格式支持 : *.gif,*.jpg,*.png,*.bmp,*.jpeg)</div>
        </div>
      </div>
      <div class="ppart">
        <div class="left">验证码</div>
        <div class="right">
          <input type="text" v-model="form.vcode" id="yzm" placeholder="请输入验证码">
          <span class="poyzm">
            <img :src="vcodeImageSrc" @click="reloadVcodeImage" class="yzmtp">
          </span>
        </div>
      </div>
      <div class="tijiao" :class="isSubmiting?'loading':''" @click="submit">提交举报</div>
    </div>
  </div>
</template>

<script>
  import apiList from "@/api/api";
  import complainSubmit from '@/api/complainSubmit';
  import uploadPicture from '@/api/uploadPicture';
  export default {
    data() {
      return {
        isSubmiting: false,
        isRenderFileInput: true,
        vcodeNocache: Date.now(),
        formModel: {
          FeedbackModel: {
            OperatePeople: '', //举报人姓名
            OperateMobile: '', //手机号码
            CorpName: '', //举报的企业名称
            ProductName: '', //举报的产品名称
            FeedbackContent: '', //举报内容
            AttatchImg: '', //举报的产品图片
          },
          vcode: '' //验证码
        },
        form: null
      };
    },
    computed: {
      vcodeImageSrc(){
        return `${apiList.VerificationCode}&nocache=${this.vcodeNocache}`;
      }
    },
    components: {
      // top
    },
    methods: {
      sleep(times){
        return new Promise(resolve => setTimeout(resolve, times));
      },
      async submit(){
        if (this.isSubmiting) {
          return;
        }
        const errs = this.checkForm();
        if (errs.length > 0) {
          alert(errs.join('\n'));
        } else {
          this.isSubmiting = true;
          const res = await complainSubmit(apiList.ComplainSubmit, this.form);
          await this.sleep(500);
          this.isSubmiting = false;
          if (res.ResultCode == 200) {
            alert('反馈已提交');
            this.formInit();
          } else if (res.Error) {
            alert(res.Error);
          }
        }
      },
      checkForm(){
        const errs = [];
        const {form} = this;
        const {vcode, FeedbackModel} = form;
        const {OperatePeople, OperateMobile, CorpName, ProductName, FeedbackContent} = FeedbackModel;
        if (!OperatePeople) {
          errs.push('请填写举报人姓名');
        }
        if (!OperateMobile) {
          errs.push('请填写手机号码');
        } else if (!(/^1[3|4|5|7|8]\d{9}$/.test(OperateMobile))) {
          errs.push("请填写正确的手机号");
        }
        if (!CorpName) {
          errs.push('请填写举报的企业名称');
        }
        if (!ProductName) {
          errs.push('请填写举报的产品名称');
        }
        if (!FeedbackContent) {
          errs.push('请填写举报内容');
        }
        if (!vcode) {
          errs.push('请填写验证码');
        }
        return errs;
      },
      async formInit(){
        this.form = {...this.formModel};
        this.form.FeedbackModel = {...this.formModel.FeedbackModel};
        this.isRenderFileInput = false;
        await this.$nextTick();
        this.isRenderFileInput = true;
      },
      reloadVcodeImage(){
        this.vcodeNocache = Date.now();
      },
      async uploadFile(file, onload, onerror){
        const formData = new FormData();
        const filename = 'Filedata';
        formData.append(filename, file);
        try {
          const res = await uploadPicture(apiList.UploadPicture, formData);
          onload(res);
        } catch (err) {
          onerror(err);
        }
      },
      onUploadSuccess(src){
        this.form.FeedbackModel.AttatchImg = src;
      },
      onUploadError(err){
        console.error(err.message);
        alert('图片上传失败');
      },
      onFileSelected(event){
        const files = event.target.files;
        if (files.length > 0) {
          const file = files[0];
          this.uploadFile(file, this.onUploadSuccess, this.onUploadError);
        }
      }
    },
    created() {
      this.formInit();
    },
    mounted() {
    }
  };
</script>

<style lang="scss" scoped="" rel="stylesheet/scss">
  @import "static/style/_var.scss";

  .complainout {
    @include wh(1198px, 787px);
    border: 1px solid #128f40;
    border-top: 4px solid #128f40;
    @include mag;
    @include ba(#fff);
    margin-top: 7px;
    .lxwm {
      @include fo(16px);
      @include co(#128f40);
      padding: 9px 0 29px 19px;
    }
    .left {
      @include float;
      width: 434px;
      text-align: right;
      padding-right: 22px;
      padding-top: 13px;
      @include fo(14px);
      @include co(#2c2c2c);
    }
    .right {
      @include float;
      @include pr;
    }
    .ppart {
      @include ov;
      margin-bottom: 20px;
      input[type="text"] {
        @include block;
        @include wh(396px, 40px);
        line-height: 40px;
        border: 1px solid #d6d9dd;
        padding-left: 17px;
        border-radius: 5px;
        @include fo(12px);
        outline: none;
      }
      #yzm {
        width: 170px;
      }

      .poyzm {
        @include po;
        top: 0;
        left: 210px;
      }
    }
    .yzmtp {
      border: 1px solid #d6d9dd;
      cursor: pointer;
      @include block;
      @include wh(100px, 40px);
    }
    .tijiao {
      @include wh(321px, 44px);
      @include fo(18px);
      @include co(#fff);
      @include te;
      @include li(44px);
      @include ba(#128f40);
      margin-left: 455px;
      cursor: pointer;
      &.loading {
        @include ba(rgba(#128f40, 0.3));
      }
    }
    #textarea {
      @include block;
      @include wh(388px, 172px);
      border: 1px solid #d6d9dd;
      border-radius: 5px;
      outline: none;
      padding: 12px;
    }
    .updiv {
      cursor: pointer;
      @include block;
      @include wh(396px, 30px);
      border-radius: 5px;
      border: 1px solid #d6d9dd;
      padding-top: 10px;
      padding-left: 17px;
    }
    .upsm {
      @include fo(12px);
      @include co(#989898);
      padding-top: 47px;
      border-radius: 5px;
      display: inline-block;
      width: 100%;
      vertical-align: initial;
    }
  }
</style>

