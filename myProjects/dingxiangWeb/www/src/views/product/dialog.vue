<template>
  <nz-dialog ref="dialog" customClass="width-800" :title="title" :okHandler="submit" :isNeedOkButton="!readonly" :data-readonly="readonly">
    <nz-form label-width="100px" ref="form" :model="form" :rules="rules">
      <div class="tp">
        <nz-form-item label="名称" prop="ProductName">
          <nz-input v-model="form.ProductName" placeholder="请输入产品名称"></nz-input>
        </nz-form-item>
        <nz-form-item label="品牌">
          <nz-input v-model="form.ProductBrand" placeholder="请输入品牌名称"></nz-input>
        </nz-form-item>
        <nz-form-item label="联系方式">
          <nz-input v-model="form.ContactInfo" placeholder="请输入联系方式"></nz-input>
        </nz-form-item>
        <nz-form-item label="生产企业">
          <nz-input v-model="form.Producer" placeholder="请输入生产企业"></nz-input>
        </nz-form-item>
        <nz-form-item label="保质日期">
          <nz-input v-model="form.ShelfLife" placeholder="请输入保质日期（天）"></nz-input>
        </nz-form-item>
        <nz-form-item label="产品选择">
          <nz-select v-model="form.ProductType">
            <nz-option :label="item.name" :value="item.value" v-for="item of selectAry" :key="item.value"></nz-option>
          </nz-select>
        </nz-form-item>
        <nz-form-item label="微信链接" v-if="form.ProductType!=1">
          <!-- prop="MallUrl"  -->
          <nz-input v-model="form.MallUrl" placeholder="必须以http://或https://开始"></nz-input>
        </nz-form-item>
        <nz-form-item label="溯源链接" v-if="form.ProductType!=2">
          <!-- prop="TraceUrl" -->
          <nz-input v-model="form.TraceUrl" placeholder="必须以http://或https://开始"></nz-input>
        </nz-form-item>
        <nz-form-item label="排序">
          <nz-input v-model="form.SortId" placeholder=""></nz-input>
        </nz-form-item>
        <nz-form-item label="PC链接">
          <!-- prop="PCUrl" -->
          <nz-input v-model="form.PCUrl" placeholder="必须以http://或https://开始"></nz-input>
        </nz-form-item>
      </div>
      <nz-form-item label="上传图片" required>
        <!-- <nz-image-upload v-model="ImagePath"></nz-image-upload> -->
        <nz-image-upload v-model="ImagePathVal" maxNumber="10"></nz-image-upload>
      </nz-form-item>
      <div class="nextfwb">
        <nz-form-item label="自定义字段">
          <!-- <nz-image-upload v-model="ImagePath"></nz-image-upload> -->
          <nz-button type="primary" @click="extAdd">添加</nz-button>
        </nz-form-item>
        <div class="edit" v-for="(item,index) in ext" :key="index">
          <nz-form-item label="标题">
            <nz-input v-model="item.ItemName" placeholder="" class="inmce" style="width:85%;"></nz-input>
            <span class="del nz-icon-close" @click="delMce(index)"></span>
          </nz-form-item>
          <div class="mcepart">
            <nz-form-item label="内容">
              <ue ref="mce" :value="item.ItemValue"></ue>
            </nz-form-item>
          </div>
        </div>
      </div>
    </nz-form>
  </nz-dialog>
</template>
<script>
import ue from '@/components/ue.vue';
export default {
  props: ['typeVal'],
  components: { ue },
  data() {
    let pattern = /^http:\/\/|^https:\/\//;
    var validate = (rule, value, callback) => {
      // if (value === '') {
      //   // callback(new Error('请输入'));
      // } else {

      // }
      if (this.form.MallUrl !== '') {
        if (!pattern.test(value)) {
          callback(new Error('必须以http://或https://开始'));
        }
      }
      callback();
    };
    var validateTraceUrl = (rule, value, callback) => {
      if (this.form.TraceUrl !== '') {
        if (!pattern.test(value)) {
          callback(new Error('必须以http://或https://开始'));
        }
      }
      callback();
      // if (value === '') {
      //   // callback(new Error('请输入'));
      // } else {

      // }
    };
    var validatePcUrl = (rule, value, callback) => {
      if (this.form.PCUrl !== '') {
        if (!pattern.test(value)) {
          callback(new Error('必须以http://或https://开始'));
        }
      }
      callback();
      // if (value === '') {
      //   // callback(new Error('请输入'));
      // } else {

      // }
    };
    return {
      ext: [],
      ImagePathVal: [],
      selectAry: [{ name: '全部', value: 3 }, { name: '溯源产品', value: 1 }, { name: '电商产品', value: 2 }],
      formModel: {
        ProductName: '',
        ContactInfo: '',
        PCUrl: '',
        TraceUrl: '',
        ProductType: '',
        Producer: '',
        ProductBrand: '',
        ProductImg: [],
        SortId: '',
        MallUrl: '',
        ProductID: '',
        ShelfLife: '',
        ProductExt: []
      },
      form: {},
      rules: { ProductName: [{ required: true, message: '请输入名称' }], PCUrl: { validator: validatePcUrl, trigger: 'blur' }, MallUrl: { validator: validate, trigger: 'blur' }, TraceUrl: { validator: validateTraceUrl, trigger: 'blur' } }
    };
  },
  mounted() {},
  methods: {
    delMce(idx) {
      this.ext.splice(idx, 1);
    },
    extAdd() {
      this.ext.push({
        ExtID: '',
        ItemName: '',
        ItemValue: '',
        ProductID: ''
      });
    },
    async submit(callback) {
      const valid = await this.$validForm(this.$refs.form);
      if (valid) {
        let eobj = {};
        let eary = [];
        this.ImagePathVal.forEach(element => {
          eobj = {};
          eobj.ImagePath = element;
          eary.push(eobj);
        });
        if (this.form.ProductType == '') {
          this.form.ProductType = 3;
        }
        this.form.ProductImg = eary;
        this.form.ProductExt = this.ext;
        //ext
        let refAry = this.$refs.mce;
        let refea = [];
        let refeo = {};
        if (refAry && refAry.length > 0) {
          for (let i = 0; i < refAry.length; i++) {
            refeo = {};
            refeo.ItemValue = refAry[i].tinymceHtml;
            refeo.ItemName = this.ext[i].ItemName;
            refeo.ExtID = this.ext[i].ExtID;
            refeo.ProductID = this.ext[i].ProductID;
            //  refea.ItemName=this.ext[i].ItemName;
            refea.push(refeo);
          }
        }
        this.form.ProductExt = refea;
        let apiVal = '';
        if (this.title == '编辑产品') {
          apiVal = this.$apiUrl.PRODUCT.UPDATE;
        } else {
          apiVal = this.$apiUrl.PRODUCT.ADD;
        }
        // let { err, res } = await this.$ajax.post(apiVal, this.form);
        // let { err, res } = await this.$ajax.post(apiVal, this.form, { headers: { 'Content-Type': 'application/json;charset=UTF-8' } });
        // console.log(err, res);
        // if (err) {
        //   this.$message.showError('操作失败');
        // } else {
        //   if (res) {
        //     this.$message.success('操作成功');
        //     this.$emit('save-success');
        //     this.$refs.dialog.hide();
        //   }
        // }
        if (this.form.ProductImg.length > 0) {
          this.$http.post(apiVal, this.form, { emulateJSON: true }).then(
            function(res) {
              // 处理成功的结果
              if (res.body.ResultCode == 200) {
                this.$message.success('操作成功');
                this.$emit('save-success');
                this.$refs.dialog.hide();
              }
            },
            function(err) {
              // 处理失败的结果
              console.log(err);
              this.$message.showError('操作失败');
            }
          );
        } else {
          this.$message.showError('请添加一张图片');
        }
      }

      callback(); //处理loading
    },
    init() {
      this.title = '添加产品';
      this.form = Object.jsonClone(this.formModel);
    },
    ImageInfoParse(img) {
      let imgAry = [];
      if (img) {
        if (typeof img === 'string') {
          imgAry[0] = img;
        } else {
          imgAry = img;
        }
      } else {
      }
      return imgAry;
    },
    initEdit(data) {
      this.title = '编辑产品';
      this.form = Object.jsonClone(data);
      console.log(data.ProductImg.length);
      if (data.ProductImg && data.ProductImg.length > 0) {
        data.ProductImg.forEach(element => {
          this.ImagePathVal.push(element.ImagePath);
        });
      }
      this.ext = data.ProductExt;
      // this.form.SlideID = data.SlideID;
      // this.form.SlideID = data.SlideID;
      // this.form.Note = data.Note;
      // this.form.ApplyType = data.ApplyType;
      // this.form.ImgPath = data.ImgPath;
      // this.form.ImageInfo = this.ImageInfoParse(data.ImgPath);

      // console.log(this.form);
    },
    show(data) {
      this.ImagePathVal = [];
      this.ext = [];
      this.init();
      if (data) {
        this.initEdit(data);
      }
      this.$refs.dialog.show();
    }
  }
};
</script>
<style rel='stylesheet/less' lang='less' scoped>
.sps {
  margin-left: 20px;
}

.left,
.right {
  display: inline-block;
  width: 49%;
  vertical-align: top;
}
.mcepart {
  position: relative;
  // height: 300px;
}
.edit {
  position: relative;
}
.del {
  display: inline-block;
  margin-left: 10px;
  cursor: pointer;
}
</style>
<style rel='stylesheet/less' lang='less' >
.tp .el-form-item {
  display: inline-block;
  width: 49%;
  vertical-align: top;
}
</style>