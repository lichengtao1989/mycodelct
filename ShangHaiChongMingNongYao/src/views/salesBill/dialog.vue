<template>
  <nz-dialog ref="dialog" :title="title" :okHandler="submit" class="salebilloutlct">
    <nz-scrollbar style="height:450px">
      <nz-form label-width="150px" ref="form" :model="form" :rules="rules">
        <div class="part">
          <nz-form-item label="针对作物">
            <nz-select>
              <nz-option label="作物1" value="作物1"></nz-option>
              <nz-option label="作物11" value="作物111"></nz-option>
            </nz-select>
          </nz-form-item>
          <nz-form-item label="生长阶段">
            <nz-select>
              <nz-option label="作物1" value="作物1"></nz-option>
              <nz-option label="作物11" value="作物111"></nz-option>
            </nz-select>
          </nz-form-item>
          <nz-form-item label="针对病虫害">
            <nz-select>
              <nz-option label="作物1" value="作物1"></nz-option>
              <nz-option label="作物11" value="作物111"></nz-option>
            </nz-select>
          </nz-form-item>
        </div>
        <div class="part bgg">
          <div class="bj1">
            <i class="nz-icon-close"></i>
          </div>
          <div class="ts ov">
            <nz-form-item label="商品名称">
              <nz-select>
                <nz-option label="作物1" value="作物1"></nz-option>
                <nz-option label="作物11" value="作物111"></nz-option>
              </nz-select>
            </nz-form-item>
            <nz-form-item label="亩用量">
              <nz-input placeholder="请输入亩用量"></nz-input>
            </nz-form-item>
            <nz-form-item label="安全间隔期" class="short-form-item">
              <nz-input placeholder="请输入安全间隔期" :disabled="disable">
                <template slot="append">天</template>
              </nz-input>
            </nz-form-item>
            <nz-form-item label="农药药性" class="short-form-item">
              <nz-input disabled></nz-input>
            </nz-form-item>
          </div>
          <div class="ncheck ov">
            <nz-form-item label="使用方法" prop="instruction">
              <nz-checkbox-group v-model="medicateVal" :disabled="disable">
                <nz-checkbox v-for="instructionsItem in instructions" :label="instructionsItem.name" :key="instructionsItem.value">{{instructionsItem.name}}</nz-checkbox>
              </nz-checkbox-group>
            </nz-form-item>
          </div>
        </div>
        <div class="ann">
          <span>
            <i class="nz-icon-add2 add-icon"></i>用药</span>
        </div>
        <div class="ppr">
          <nz-form-item label="用药注意事项">
            <nz-input type="textarea" :disabled="disable"></nz-input>
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
      medicateVal: [],
      disable: false,
      title: '',
      formModel: { key1: '', key2: '', key3: '', key4: '', key5: '' },
      form: {},
      rules: {}
    };
  },
  props: {},
  computed: {
    instructions() {
      return this.$enum('使用方法').values;
    }
  },
  methods: {
    init() {
      this.title = '添加';
      this.form = Object.jsonClone(this.formModel);
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
  },
  created() {}
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
.ppr{margin-top: 15px;}
</style>
<style lang="less" rel="stylesheet/less" >
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
