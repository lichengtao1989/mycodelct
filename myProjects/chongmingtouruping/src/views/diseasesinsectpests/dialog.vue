<template>
  <nz-dialog customClass="width-800" ref="dialog" title="病虫害查询" :okHandler="submit">
    <nz-scrollbar style="height:600px">
      <nz-form label-width="100px" ref="form" :model="form" :rules="rules">
        <nz-form-item label="作物" prop="ProductName">
          <nz-input v-model="form.crop" readonly="readonly"></nz-input>
        </nz-form-item>
        <nz-form-item label="病害" prop="ProductName">
          <nz-input v-model="form.pest" readonly="readonly"></nz-input>
        </nz-form-item>
        <nz-form-item label="生长阶段" prop="ProductName">
          <!-- <nz-input v-model="form.ProductName" readonly="readonly"></nz-input> -->
          <div class="bdr">全周期</div>
        </nz-form-item>
        <nz-form-item label="详细介绍" prop="ProductName">
          <!-- <nz-input v-model="form.introduction" type="textarea" row="3"  readonly="readonly"></nz-input> -->
          <div class="bdr">{{form.introduction}}</div>
        </nz-form-item>
        <nz-form-item label="危害症状" prop="ProductName">
          <!-- <nz-input type="textarea" row="4" v-model="form.morphologicalProperties" readonly="readonly"></nz-input> -->
          <div class="bdr">{{form.damageSymptoms}}</div>
        </nz-form-item>
        <nz-form-item label="发病规律" prop="ProductName">
          <div class="bdr">{{form.occurrenceRegularity}}</div>
          <!-- <nz-input type="textarea" row="4" v-model="form.occurrenceRegularity" readonly="readonly"></nz-input> -->
        </nz-form-item>
        <nz-form-item label="防治" prop="ProductName">
          <!-- <nz-input v-model="form.ProductName" readonly="readonly"></nz-input> -->
          <div class="bdr">{{form.control}}</div>
        </nz-form-item>
        <nz-form-item label="推荐用药" prop="ProductName">
          <!-- <nz-input v-model="form.ProductName" readonly="readonly"></nz-input> -->
          <div class="bdr">空</div>
        </nz-form-item>
        <nz-form-item label="图片" prop="ProductName">
          <img :src="item" class="imgs" v-for="item in imgList" :key="item">
        </nz-form-item>
      </nz-form>
    </nz-scrollbar>
  </nz-dialog>
</template>
<script>
export default {
  data() {
    return {
      title: '',
      formModel: {},
      form: {},
      rules: {},
      imgList: []
    };
  },
  computed: {},
  methods: {
    spec(row) {
      const { SpecQuantity, SpecUnit, SpecType } = row;
      if (SpecQuantity && SpecUnit && SpecType) {
        return `${SpecQuantity}${SpecUnit}/${SpecType}`;
      }
      return '';
    },
    async submit(callback) {
      const valid = await this.$validForm(this.$refs.form);
      if (valid) {
      }
      callback();
    },
    async init(data) {
      // this.form = Object.jsonClone(this.formModel);
      let apiUrl = this.$apiUrl.COMMONAPI.GetPestinfoDetailList + '/' + data.id;
      let { res } = await this.$ajax.post(apiUrl);

      this.form = res.data;
      this.imgList = res.data.imgList.split(',');
    },
    show(data) {
      this.imgList = [];
      this.init(data);
      this.$refs.dialog.show();
    }
  }
};
</script>
<style rel="stylesheet/less" lang="less" scoped>
.normal-item {
  margin-bottom: 0;
}
.imgs {
  display: inline-block;
  width: 116px;
  height: 116px;
  border-radius: 5px;
  margin-right: 10px;
}
.bdr {
  padding: 0 14px;
  border-radius: 5px;
  box-sizing: border-box;
  border: 1px solid #ddd;
}
</style>
