<template>
  <div>
    <nz-form label-width="150px" ref="form" :model="form" :rules="rules">
      <template v-for="(receiptItem, receiptkey) in form.details">
        <div class="card-item">
          <nz-button type="text" @click="removeReceipt(receiptItem)" class="card-close-button" v-if="form.details.length > 1 && !disable">
            <i class="nz-icon-close"></i>
          </nz-button>
          <nz-form-item label="针对作物" :prop="'forCrops_'+receiptkey" class="short-form-item">
            <nz-select v-model="receiptItem.forCrops" filterable clearable @change="changeForCrops($event,receiptItem)" :disabled="disable" placeholder="请选择针对作物">
              <nz-option v-for="(item,key) in forCropsList" :key="key" :label="item.name" :value="item.name"></nz-option>
            </nz-select>
          </nz-form-item>
          <nz-form-item label="生长阶段" prop="growthStage" class="short-form-item">
            <nz-select v-model="receiptItem.growthStage" filterable clearable placeholder="请选择生长阶段" :disabled="disable">
              <nz-option v-for="(item,key) in receiptItem.growthStageList" :key="key" :label="item" :value="item"></nz-option>
            </nz-select>
          </nz-form-item>
          <nz-form-item label="针对病虫害" prop="diseasesAndPests" class="short-form-item">
            <nz-select v-model="receiptItem.diseasesAndPests" filterable clearable placeholder="请选择针对病虫害" :disabled="disable">
              <nz-option v-for="(item,key) in receiptItem.diseasesAndPestsList" :key="key" :label="item" :value="item"></nz-option>
            </nz-select>
          </nz-form-item>
          <template v-for="(medicateItem, medicatekey) in receiptItem.medicateList">
            <div class="card-item-medication">
              <nz-button type="text" @click="removeMedicate(receiptkey,medicateItem)" class="card-close-button" v-if="receiptItem.medicateList.length > 1 && !disable ">
                <i class="nz-icon-close"></i>
              </nz-button>
              <nz-form-item label="商品名称" :prop="'productId_'+receiptkey+'_'+medicatekey" class="short-form-item">
                <nz-select v-model="medicateItem.productId" filterable clearable placeholder="请选择农药名称" :disabled="disable" @change="changeProduct($event,medicateItem)">
                  <nz-option v-for="item in productList" :key="item.id" :label="item.name" :value="item.name"></nz-option>
                  <!-- <nz-option v-if="medicateItem.productId" disabled :label="medicateItem.name" :value="medicateItem.productId"></nz-option> -->
                </nz-select>
              </nz-form-item>
              <nz-form-item label="亩用量" prop="templeUsage" class="short-form-item">
                <nz-input v-model="medicateItem.templeUsage" placeholder="请输入亩用量" :disabled="disable"></nz-input>
              </nz-form-item>
              <nz-form-item label="安全间隔期" prop="safetyInterval" class="short-form-item">
                <nz-input v-model="medicateItem.safetyInterval" placeholder="请输入安全间隔期" :disabled="disable">
                  <template slot="append">天</template>
                </nz-input>
              </nz-form-item>
              <nz-form-item label="农药药性" prop="properties" class="short-form-item">
                <!-- <nz-enum-select v-model="medicateItem.properties" :options="$enum('毒性').values" :disabled="disable" placeholder="请选择农药药性"></nz-enum-select> -->
                <nz-input v-model="medicateItem.properties" disabled></nz-input>
              </nz-form-item>
              <nz-form-item label="使用方法" prop="instruction">
                <nz-checkbox-group v-model="medicateItem.instruction" :disabled="disable">
                  <nz-checkbox v-for="instructionsItem in instructions" :label="instructionsItem.name" :key="instructionsItem.value">{{instructionsItem.name}}</nz-checkbox>
                </nz-checkbox-group>
              </nz-form-item>
            </div>
          </template>
          <div style="text-align: center; margin-bottom: 20px; clear: both;" v-if="receiptItem.medicateList.length < 5 && !disable">
            <nz-button type="text" @click="addMedicate(receiptkey)">
              <i class="nz-icon-add2"></i>用药
            </nz-button>
          </div>
          <nz-form-item label="用药注意事项" prop="note">
            <nz-input type="textarea" v-model="receiptItem.note" :disabled="disable"></nz-input>
          </nz-form-item>
        </div>
      </template>
      <!-- <div style="text-align: center; margin-bottom: 20px; clear: both;" v-if="form.details.length < 3 && !disable">
        <nz-button type="text" @click="addReceipt">
          <i class="nz-icon-add2"></i>添加病虫害
        </nz-button>
      </div> -->
      <div style="margin-bottom: 10px;clear: both;width: 100%; text-align: right;" v-if="!disable">
        <nz-checkbox v-model="prescriptionReceiptChecked" :disabled="receiptdisabled ">打印小票</nz-checkbox>
      </div>
    </nz-form>
  </div>
</template>

<script>
export default {
  data() {
    let apiUrl = this.$apiUrl.SALESRECEIPT;
    return {
      apiUrl: apiUrl,
      disable: false,
      form: {},
      note: null,
      prescriptionReceiptChecked: false,
      forCropsList: []
    };
  },
  props: {
    productList: {
      type: Object
    },
    receiptdisabled: {
      type: Boolean
    }
  },
  computed: {
    instructions() {
      return this.$enum('使用方法').values;
    },
    rules() {}
  },
  methods: {
    reset() {
      this.form = {
        details: [
          {
            forCrops: '',
            growthStage: '',
            diseasesAndPests: '',
            note: '',
            diseasesAndPestsList: [],
            growthStageList: [],
            medicateList: [
              {
                productId: '',
                templeUsage: '',
                safetyInterval: '',
                properties: '',
                name: '',
                instruction: []
              }
            ]
          }
        ],
        prescriptionOrderID: '',
        prescriptionOrderCode: '',
        isPrint: 0
      };
    },
    async addForm() {
      this.reset();
      await this.$nextTick();
      let { err, res } = await this.$model('dataManagement').commonfn2(this.apiUrl.AUTO_CROP_LIST);
      if (res.resultCode == 200) {
        this.forCropsList = res.data.rows;
      } else {
        this.$message.showError(err);
      }
    },
    //获取处方单信息
    async editForm(prescriptionOrderID, status) {
      if (status == 'view') {
        this.disable = true;
      } else {
        this.disable = false;
        let { err, res } = await this.$model('dataManagement').commonfn2(this.apiUrl.AUTO_CROP_LIST);
        if (res.resultCode == 200) {
          this.forCropsList = res.data.rows;
        } else {
          this.$message.showError(err);
        }
      }
      let data = {
        id: prescriptionOrderID
      };
      let { err, res } = await this.$model('dataManagement').commonfn2(this.apiUrl.PRESCRIPTION_GET, data);
      if (res.resultCode == 200) {
        this.form.prescriptionOrderID = res.data.prescriptionOrderID;
        this.form.details = res.data.details;
        if (res.data.isPrint == 0) {
          this.prescriptionReceiptChecked = false;
        } else {
          this.prescriptionReceiptChecked = true;
        }
      } else {
        this.$message.showError(err);
      }
    },
    changeForCrops(item, detailsItem) {
      detailsItem.growthStage = '';
      detailsItem.diseasesAndPests = '';
      this.forCropsList.forEach(v => {
        if (v.name == item) {
          detailsItem.growthStageList = v.growthList;
          detailsItem.diseasesAndPestsList = v.pestList;
        }
      });
    },
    //改变产品
    changeProduct(item, medicateItem) {
      medicateItem.properties = '';
      this.productList.forEach(v => {
        if (v.name == item) {
          medicateItem.properties = v.toxicity;
          medicateItem.name = v.name;
        }
      });
    },
    //添加病虫害
    addReceipt() {
      this.form.details.push({
        forCrops: '',
        growthStage: '',
        diseasesAndPests: '',
        note: '',
        medicateList: [
          {
            productId: '',
            templeUsage: '',
            safetyInterval: '',
            properties: '',
            name: '',
            instruction: []
          }
        ]
      });
    },
    //删除病虫害
    removeReceipt(item) {
      this.form.details.remove(item);
    },
    //添加用药
    addMedicate(key) {
      this.form.details[key].medicateList.push({
        productId: '',
        templeUsage: '',
        safetyInterval: '',
        properties: '',
        instruction: []
      });
    },
    //删除用药
    removeMedicate(key, item) {
      this.form.details[key].medicateList.remove(item);
    },
    //保存处方单
    async submit() {
      let params = Object.deepClone(this.form);
      //验证表格内的数据
      if (!this.checkSafetyInterval(params.details)) {
        return false;
      }

      for (let item of this.form.details) {
        item.diseasesAndPestsList = [];
        item.growthStageList = [];
      }
      if (this.prescriptionReceiptChecked) {
        this.form.isPrint = 1;
      } else {
        this.form.isPrint = 0;
      }
      const valid = await this.$validForm(this.$refs.form);
      if (valid && !this.disable) {
        let { err, res } = await this.$model('dataManagement').commonfn(this.apiUrl.PRESCRIPTION_SAVE, this.form);
        this.$emit('getPrescription', this.form.details, this.prescriptionReceiptChecked);
        return { valid, err, res };
      } else {
        return { valid };
      }
    },
    //校验安全间隔期日期
    checkSafetyInterval(details) {
      const reg = /^\-?\d+?$/;
      for (let item of details) {
        for (let index = 0; index < item.medicateList.length; index++) {
          if (item.medicateList[index].safetyInterval != '' && !reg.test(item.medicateList[index].safetyInterval)) {
            this.$message.warning(`安全间隔期请输入大于0的整数`);
            return false;
          }
        }
      }
      return true;
    }
  },
  created() {
    this.reset();
  }
};
</script>

<style scoped rel='stylesheet/less' lang='less'>
.short-form-item {
  width: 50%;
}
.card-item {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding: 20px 40px 20px 0;
  margin-bottom: 10px;
  clear: both;
  //border: 1px solid #ccc;
  // background: @DarkWhite;

  &:after {
    content: '';
    display: block;
    clear: both;
  }

  .card-close-button {
    position: absolute;
    top: 0px;
    right: 0px;
    color: #000000;
    font-size: 18px;
    cursor: pointer;
  }
}
.card-item-medication {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding: 20px 40px 20px 0;
  margin-bottom: 10px;
  clear: both;
  background: #f3f9f8;
  margin-left: 20px;

  &:after {
    content: '';
    display: block;
    clear: both;
  }

  .card-close-button {
    position: absolute;
    top: 0px;
    right: 0px;
    color: #000000;
    font-size: 18px;
    cursor: pointer;
  }
}
</style>
