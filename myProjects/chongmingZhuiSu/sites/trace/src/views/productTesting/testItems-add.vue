<template>
  <div>
    <cjm-form ref="cItems">
      <div class="clear cjm-item-area" v-for="(item, k) in cItems" :key="item.testingItemID">
        <div class="clear cjm--delete-panel">
          <div class="cjm-item-delete" @click="deleteTestItem(k)" v-if="!disabled">
            <i class="cjm-icon-close"></i>
          </div>
        </div>
        <cjm-form :rules="rules" :model="item">
          <cjm-form-item label="检测项" prop="testingItemID" required>
            <cjm-select v-model="item.testingItemID" placeholder="请选择" v-if="!disabled" :label="item.testingTypeName">
              <cjm-option v-for="item in testingItemArray" :key="item.id" :label="item.name" :value="item.id">
              </cjm-option>
            </cjm-select>
            <cjm-input v-model="item.testingTypeName" v-else :disabled="true"></cjm-input>
          </cjm-form-item>
          <cjm-form-item label="检测标准" prop="standard" required>
            <cjm-select v-model="item.standard" placeholder="请选择" :disabled="disabled">
              <cjm-option v-for="item in standardArray" :key="item.id" :label="item.name" :value="item.id">
              </cjm-option>
            </cjm-select>
          </cjm-form-item>
          <cjm-form-item label="检测人" prop="jcr">
            <cjm-input v-model="item.inspector" :disabled="disabled"></cjm-input>
          </cjm-form-item>
          <cjm-form-item label="检测时间">
            <cjm-date-picker placeholder="检测时间" type="datetime" :disabled="disabled" v-model="item.detectionTime"></cjm-date-picker>
          </cjm-form-item>
          <cjm-form-item label="结果" prop="result" class="cjm-form-item-long" required>
            <cjm-radio-group v-model="item.result" :disabled="disabled">
              <cjm-radio label="1" key="1">合格</cjm-radio>
              <cjm-radio label="0" key="0">不合格</cjm-radio>
            </cjm-radio-group>
          </cjm-form-item>
          <div class="clear ">
            <cjm-form-item label="上传图片">
              <upload v-model="item.imgs" acceptType="image" :maxNumber="20" :multiple="true" tips="（可多选，建议上传图片大小500*700）" :disabled="disabled"></upload>
            </cjm-form-item>
          </div>
          <cjm-form-item label="上传PDF">
            <upload v-model="item.pdfs" acceptType="pdf" :maxNumber="20" :multiple="true" :disabled="disabled"></upload>
          </cjm-form-item>
          <cjm-form-item label="备注" class="cjm-form-item-long">
            <cjm-input v-model="item.note" type="textarea" :disabled="disabled"></cjm-input>
          </cjm-form-item>
        </cjm-form>
      </div>
    </cjm-form>
    <div class="add-item-btn-panel" v-if="!disabled">
      <cjm-button @click="addTestItem" type="text">
        <i class="cjm-icon-add2"></i>新增检测项</cjm-button>
    </div>
  </div>
</template>
<script>
import Upload from './components/file-upload.vue';
export default {
  components: {
    Upload
  },
  data() {
    return {
      cItems: this.items,
      standardArray: [],
      testingItemArray: [],
      rules: {
        testingItemID: [this.$formRules.required],
        standard: [this.$formRules.required],
        result: [
          {
            validator: (rule, value, callback) => {
              if (value == '') {
                callback(new Error(`该项为必填项`));
              } else {
                callback();
              }
            },
            trigger: 'change'
          }
        ]
      }
    };
  },
  props: {
    testingRecordID: {
      type: String
    },
    items: {
      type: Array
    },
    edit: {
      type: Boolean
    },
    disabled: {
      type: Boolean
    }
  },
  watch: {
    cItems: {
      handler() {
        this.$emit('resetTestItems', this.cItems);
      },
      deep: true
    },
    items: {
      handler() {
        this.cItems = this.items;
      },
      deep: true
    }
  },
  methods: {
    //添加检测项
    addTestItem() {
      this.cItems.push({
        testingItemID: '',
        TestingTypeName: '',
        standard: '',
        result: '1',
        note: '',
        imgs: [],
        pdfs: [],
        inspector: '',
        detectionTime: ''
      });
    },
    //删除检测项
    deleteTestItem(k) {
      if (this.cItems.length > 1) {
        this.cItems.splice(k, 1);
      } else {
        this.$message.warning('必须存在一个检测项');
      }
    },
    checkData(callback) {
      let self = this;
      if (this.cItems.length == 0) {
        this.$message.warning('必须存在一个检测项');
        return;
      }
      let hasError = false;
      this.cItems.forEach((d, k) => {
        self.$refs['cItems'].$children[k].validate(val => {
          if (!val) {
            hasError = true;
          }
          if (k == self.cItems.length - 1 && !hasError) {
            callback && callback();
          }
        });
      });
    }
  },
  created() {
    if (this.cItems.length == 0) {
      this.addTestItem();
    }
    let listTypeParams = {};
    this.testingRecordID &&
      (listTypeParams = {
        object: 2,
        testingRecordID: this.testingRecordID
      });
    this.$ajax.get(this.$globalData.get('trace', 'apiUrl').productTesting.GET_TEST_TYPE, listTypeParams).then(r => {
      if (r.resultCode == 200) {
        this.testingItemArray = r.data;
      }
    });
    this.$ajax.get(this.$globalData.get('trace', 'apiUrl').productTesting.GET_TEST_STANDARD).then(r => {
      if (r.resultCode == 200) {
        this.standardArray = r.data;
      }
    });
  }
};
</script>
<style scoped rel='stylesheet/less' lang='less'>
.add-item-btn-panel {
  text-align: center;
  margin-bottom: 30px;
}
</style>
