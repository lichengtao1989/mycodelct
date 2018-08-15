<template>
  <nz-dialog customClass="width-800" ref="dialog" title="添加回收" :okHandler="submit" class="dialoglctwrap">
    <nz-scrollbar style="height:500px">
      <nz-form ref="form" :model="form" :rules="rules">
        <div class="pp1 pplct">
          <nz-form-item label="废弃物来源" label-width="105px" prop="FarmerID">
            <nz-remote-select v-model="form.FarmerID" class="cusotmer-input" :remote-url="$apiUrl.COMMON.DROP_DOWN.FARMER" placeholder="请选择废弃物来源" @select="clickItemFarmer">
            </nz-remote-select>
          </nz-form-item>
          <nz-form-item label="回收点" label-width="105px" prop="FarmCapitalStoreID">
            <nz-remote-select v-model="form.FarmCapitalStoreID" class="cusotmer-input" :remote-url="$apiUrl.COMMON.DROP_DOWN.AGRICULTURALMATERIALS" placeholder="请选择回收点" @select="clickItem">
            </nz-remote-select>
          </nz-form-item>

        </div>
        <div class="pp2 pplct" v-for="(item,index) in form.sonList" :key="item" :data-str="'domains.' + index + '.value'">
          <span class="bj1" @click="delFn(index)">
            <i class="nz-icon-close"></i>
          </span>
          <nz-form-item label="类型" label-width="105px" :prop="'sonList.'+index+'.WasteType'" :rules="{required: true, message: '类型不能为空', trigger: 'blur'}">
            <nz-select v-model="item.WasteType">
              <!--<nz-option label="绿色农药" value="5"></nz-option>-->
              <nz-option label="塑料袋" value="1"></nz-option>
              <nz-option label="塑料瓶" value="2"></nz-option>
              <nz-option label="玻璃瓶" value="3"></nz-option>
              <nz-option label="其它" value="4"></nz-option>
            </nz-select>
          </nz-form-item>
          <nz-form-item label="废弃物名称" label-width="105px" :prop="'sonList.'+index+'.NameOfWaste'" :rules="{required: true, message: '废弃物名称不能为空', trigger: 'blur'}">
            <nz-input type="text" placeholder="废弃物名称" v-model="item.NameOfWaste"></nz-input>
          </nz-form-item>

          <nz-form-item label="数量" label-width="105px" :prop="'sonList.'+index+'.Number'" :rules="[{ required: true, message: '数量不能为空'},numberValidate(index)]">
            <nz-input type="text" placeholder="数量" v-model="item.Number"></nz-input>
          </nz-form-item>
          <nz-form-item label="重量" label-width="105px" :prop="'sonList.'+index+'.Weight'" :rules="[{ required: true, message: '重量不能为空'}]">
            <nz-input type="text" placeholder="重量" v-model="item.Weight"></nz-input>
          </nz-form-item>
        </div>
        <div class="ann" @click="addFn">
          <span>
            <i class="nz-icon-add2 add-icon"></i>废弃物</span>
        </div>
        <div class="pp3">
          <nz-form-item label="预警类型" label-width="105px" prop="EarlyWarningType">
            <nz-select v-model="form.EarlyWarningType">
              <nz-option label="无" value="0"></nz-option>
              <nz-option label="含违禁药品包装" value="1"></nz-option>
              <nz-option label="含非绿色农药包装" value="2"></nz-option>
            </nz-select>
          </nz-form-item>
          <nz-form-item label="经手人" label-width="105px" prop="HandMan">
            <nz-input type="text" placeholder="经手人" v-model="form.HandMan"></nz-input>
          </nz-form-item>
          <nz-form-item label="备注" prop="iDNumber" label-width="105px">
            <nz-input placeholder="备注" type="textarea" :rows="2" v-model="form.Note"></nz-input>
          </nz-form-item>
        </div>
      </nz-form>
    </nz-scrollbar>
  </nz-dialog>
</template>
<script>
  export default {
    data() {
      return {
        v1: '',
        v2: '',
        title: '',
        formModel: {},
        form: {
          sonList: [
            {
              PesticidesWasteID: '',
              NameOfWaste: '',
              WasteType: '',
              Number: '',
              Weight: ''
            }
          ]
        },
        rules: {
          // FarmerID: [{ required: true, message: '请选择废弃物来源', trigger: 'blur' }, { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }]
          FarmerID: [{required: true, message: '请选择废弃物来源', trigger: 'blur'}],
          FarmCapitalStoreID: [{required: true, message: '请选择回收点', trigger: 'blur'}],
          EarlyWarningType: [{required: true, message: '请选择预警类型', trigger: 'blur'}],
          HandMan: [{required: true, message: '请输入经手人', trigger: 'blur'}]
        },
        sonList: [
          {
            PesticidesWasteID: '',
            NameOfWaste: '',
            WasteType: '',
            Number: '',
            Weight: ''
          }
        ],
        orderData: [{}, {}, {}, {}, {}],
        goodsDetails: [{}, {}, {}, {}, {}]
      };
    },
    methods: {
      numberValidate(index){
        return {
          validator: (rule, value, callback) => {
            if (isNaN(this.form.sonList[index].Number)) {
              callback(new Error('请输入数字'))
            } else {
              callback();
            }
          }, trigger: 'change, blur'
        }
      },
      delFn(idx) {
        console.log(idx);
        this.form.sonList.splice(idx, 1);
      },
      clickItemFarmer(val) {
        // console.log(val);
      },
      clickItem(val) {
        // console.log(val);
      },
      async submit(callback) {
        const valid = await this.$validForm(this.$refs.form);
        // console.log(valid);
        if (valid) {
          let {err, res} = await this.$ajax.post(this.$apiUrl.RECYCLING.ADD, this.form);
          if (err) {
            this.$message.showError(err);
          } else {
            this.$emit('save-success');
            this.$refs.dialog.hide();
            this.$message.success(res.msg);
          }
          // console.log(err, res);
        }

        callback();
      },
      async addFn() {
        this.form.sonList.push({
          PesticidesWasteID: '',
          NameOfWaste: '',
          WasteType: '',
          Number: '',
          Weight: ''
        });
      },
      init() {
        this.title = '添加';
        this.form = Object.jsonClone(this.formModel);
        this.form = {
          sonList: [
            {
              PesticidesWasteID: '',
              NameOfWaste: '',
              WasteType: '',
              Number: '',
              Weight: ''
            }
          ]
        };
        this.sonList = [
          {
            PesticidesWasteID: '',
            NameOfWaste: '',
            WasteType: '',
            Number: '',
            Weight: ''
          }
        ];
      },
      initEdit(data) {
        this.title = '编辑';
        this.form.key1 = data.key1 || '';
        this.form.key2 = data.key2 || '';
        this.form.key3 = data.key3 || '';
      },
      show(data) {
        this.init();

        if (data) {
          this.initEdit(data);
        }
        this.$refs.dialog.show();
      }
    }
  };
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .ann {
    cursor: pointer;
    margin-top: 20px;
    text-align: center;
    color: #00a88a;
    margin-bottom: 20px;
  }

  .pplct {
    padding-right: 35px;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }

  .pp2 {
    background: #f3f9f8;
    padding-top: 35px;
    height: 160px;
    .bj1 {
      position: absolute;
      top: 11px;
      right: 13px;
      z-index: 2;
      cursor: pointer;
    }
  }

  h3.title {
    font-size: 16px;
    color: #333333;
    padding: 0;
    margin: 0;
    margin-bottom: 13px;
    margin-top: 35px;
    &:first-child {
      margin-top: 0;
    }
  }
</style>
<style rel="stylesheet/less" lang="less">
  .dialoglctwrap {
    .pplct {
      .el-form-item {
        width: 50%;
      }
    }
  }
</style>
