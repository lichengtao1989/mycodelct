<template>
  <nz-dialog customClass="width-800" ref="dialog" title="添加处方单" :okHandler="submit" class="salebilloutlct">
    <nz-scrollbar style="height:450px">
      <nz-form label-width="150px">
        <div class="part">
          <nz-form-item label="针对作物">
            <nz-select v-model="form.crop">
              <nz-option v-for="(item,index) in cropList" :key="index" :label="item" :value="item"></nz-option>
            </nz-select>
          </nz-form-item>
          <nz-form-item label="生长阶段">
            <nz-select v-model="form.growth">
              <nz-option v-for="(item,index) in growthList" :key="index" :label="item" :value="item"></nz-option>
            </nz-select>
          </nz-form-item>
          <nz-form-item label="针对病虫害">
            <nz-select v-model="form.pest">
              <nz-option v-for="(item,index) in pestList" :key="index" :label="item" :value="item"></nz-option>
            </nz-select>
          </nz-form-item>
        </div>
        <!---->
        <div v-for="(item,index) in form.productList" :key="index">
          <div class="part bgg" style="margin-bottom: 10px">
            <div class="bj1" @click="delProduct(item)" v-show="form.productList && form.productList.length>1">
              <i class="nz-icon-close"></i>
            </div>
            <div class="ts ov">
              <nz-form-item label="商品名称">
                <!-- <nz-remote-select v-model="item.productName" :remoteUrl="$apiUrl.COMMON.DROP_DOWN.PESTICIDEINFO"></nz-remote-select> -->
                <nz-select v-model="item.productName">
                  <nz-option v-for="(item,index) in infoVal" :key="index" :label="item.ProductName" :value="item.ProductName"></nz-option>
                </nz-select>
              </nz-form-item>
              <nz-form-item label="亩用量">
                <nz-input v-model="item.num" placeholder="请输入亩用量"></nz-input>
              </nz-form-item>
              <nz-form-item label="安全间隔期" class="short-form-item">
                <nz-input v-model="item.day" placeholder="请输入安全间隔期" :disabled="disable">
                  <template slot="append">天</template>
                </nz-input>
              </nz-form-item>
            </div>
            <div class="ncheck ov">
              <nz-form-item label="使用方法" prop="instruction">
                <nz-checkbox-group v-model="item.type" :disabled="disable">
                  <nz-checkbox v-for="instructionsItem in instructions" :label="instructionsItem.name" :key="instructionsItem.value">{{instructionsItem.name}}</nz-checkbox>
                </nz-checkbox-group>
              </nz-form-item>
            </div>
          </div>
        </div>
        <!---->
        <div class="ann">
          <span @click="addProduct">
            <i class="nz-icon-add2 add-icon"></i>
            <span>用药</span>
          </span>
        </div>
        <div class="ppr">
          <nz-form-item label="用药注意事项">
            <nz-input v-model="form.warnText" type="textarea" :disabled="disable"></nz-input>
          </nz-form-item>
        </div>
      </nz-form>
    </nz-scrollbar>
  </nz-dialog>
</template>
<script>
export default {
  props: ['infoVal'],
  data() {
    return {
      disable: false,
      productModel: { productName: '', day: '', num: '', type: [] },
      formModel: { crop: '', growth: '', pest: '', productList: [], warnText: '' },
      form: {},
      rules: {},
      cropList: [],
      growthList: [],
      pestList: []
    };
  },
  watch: {
    'form.crop': function() {
      this.form.growth = '';
      this.form.pest = '';
      this.loadGrowthList();
      this.loadPestList();
    }
  },
  computed: {
    instructions() {
      return this.$enum('使用方法').values;
    }
  },
  methods: {
    submit(callback) {
      // console.log(Object.jsonClone(this.form));
      this.$emit('save', Object.jsonClone(this.form));
      callback();
    },
    delProduct(item) {
      this.form.productList = this.form.productList.filter(product => product !== item);
    },
    init() {
      this.form = Object.jsonClone(this.formModel);
      this.addProduct();
    },
    initEdit(data) {
      this.form = Object.jsonClone(data);
    },
    show(data) {
      this.init();
      this.$refs.dialog.show();
      if (data) {
        this.initEdit(data);
      }
    },
    hide() {
      this.$refs.dialog.hide();
    },
    addProduct() {
      this.form.productList.push(Object.jsonClone(this.productModel));
    },
    async loadGrowthList() {
      const growthList = await this.$model('diseases').getGrowthList(this.form.crop);
      this.growthList = growthList;
    },
    async loadPestList() {
      const pestList = await this.$model('diseases').getPestList(this.form.crop);
      this.pestList = pestList;
    },
    async loadCropList() {
      const cropList = await this.$model('diseases').getCropList();
      this.cropList = cropList;
    }
  },
  mounted() {
    // console.log(this.infoVal);
  },
  created() {
    this.loadCropList();
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.ann {
  cursor: pointer;
  margin-top: 20px;
  text-align: center;
  color: #00a88a;
}

.ov {
  overflow: hidden;
}

.part {
  overflow: hidden;
  padding-right: 45px;
}

.bgg {
  padding-top: 20px;
  background: #f3f9f8;
  position: relative;
  .bj1 {
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
  }
}

.ppr {
  margin-top: 15px;
}
</style>
<style lang="less" rel="stylesheet/less">
.part {
  .el-form-item {
    width: 50%;
  }
}

.salebilloutlct .ncheck {
  .el-form-item {
    width: 100%;
  }
}
</style>
