<template>
  <div>
    <cjm-form ref="form" :model="form" :rules="rules">
      <cjm-form-item label="卡片标题" prop="title" required class="cjm-form-item-long">
        <cjm-input v-model="form.title"></cjm-input>
      </cjm-form-item>
      <cjm-form-item label="卡片分类" prop="category" required class="cjm-form-item-long">
        <cjm-radio-group v-model="form.category">
          <cjm-radio :label="value" v-for="(value,key) in category" :key="value" :disabled="value!=enums.cardCategory.GRAPH">{{key}}
          </cjm-radio>
        </cjm-radio-group>
      </cjm-form-item>
      <cjm-form-item label="二级分类" prop="secondCategory" required class="cjm-form-item-long">
        <cjm-radio-group v-model="form.secondCategory">
          <cjm-radio :label="value" v-for="(value,key) in secondCategory" :key="value">{{key}}
          </cjm-radio>
        </cjm-radio-group>
      </cjm-form-item>
      <cjm-form-item label="尺寸" prop="size" required class="cjm-form-item-long">
        <cjm-radio-group v-model="form.size">
          <cjm-radio :label="value" v-for="(value,key) in size" :key="value">{{key}}
          </cjm-radio>
        </cjm-radio-group>
      </cjm-form-item>
      <cjm-form-item label="产品线" prop="bu" required class="cjm-form-item-long">
        <cjm-radio-group v-model="form.bu">
          <cjm-radio :label="value" v-for="(value,key) in bu" :key="value">{{key}}
          </cjm-radio>
        </cjm-radio-group>
      </cjm-form-item>
      <cjm-form-item label="优先级" prop="priority" required class="cjm-form-item-long">
        <cjm-radio-group v-model="form.priority">
          <cjm-radio :label="value" v-for="(value,key) in priority" :disabled="value!=2" :key="value">{{key}}
          </cjm-radio>
        </cjm-radio-group>
      </cjm-form-item>
      <cjm-form-item label="权限码" prop="powerCode" required class="cjm-form-item-long">
        <cjm-input v-model="form.powerCode"></cjm-input>
      </cjm-form-item>
      <div class="card-edit-powerCode-tips">
        <p>权限码决定以下事项：</p>
        <p>1、此卡片的显示权限。</p>
        <p>2、此卡片"详情"按钮跳转至的功能。</p>
      </div>
    </cjm-form>
    <cjm-form ref="optionForm" :model="optionForm" :rules="optionRules">
      <cjm-form-item label="数据API" prop="dataSource" required class="cjm-form-item-long">
        <cjm-input v-model="optionForm.dataSource"></cjm-input>
      </cjm-form-item>
    </cjm-form>
    <p class="card-edit-preview-tips">根据上述配置与api中的演示数据，预览图如下</p>
    <cjm-cards>
      <cjm-chart-card v-if="form.category==enums.cardCategory.GRAPH && form.secondCategory!=enums.graphCardCategory.NUMBER" :title="form.title" :data="card.data" :size="form.size===enums.cardSize.SIZE2 ? 'large' : 'normal'" :chart-type="chartType" :status.sync="card.status" style="margin: 0 auto; float: none;">
        <template slot="operate">
          <cjm-button type="text">
            <i class="cjm-icon-detail1"></i>详情</cjm-button>
        </template>
      </cjm-chart-card>
      <cjm-number-card v-if="form.category==enums.cardCategory.GRAPH && form.secondCategory==enums.graphCardCategory.NUMBER" :title="form.title" :data="card.data" :size="form.size===enums.cardSize.SIZE2 ? 'large' : 'normal'" :status.sync="card.status" style="margin: 0 auto; float: none;">
        <template slot="operate">
          <cjm-button type="text">
            <i class="cjm-icon-detail1"></i>详情</cjm-button>
        </template>
      </cjm-number-card>
    </cjm-cards>
  </div>
</template>

<script>
import Cards from 'framework/components/base/cards';
import ChartCard from 'framework/components/base/chart-card';
import NumberCard from 'framework/components/base/number-card';
export default {
  components: {
    'cjm-cards': Cards,
    'cjm-chart-card': ChartCard,
    'cjm-number-card': NumberCard
  },
  data() {
    return {
      enums: this.$globalData.get('base', 'enums'),
      apiUrl: this.$globalData.get('base', 'apiUrl'),
      form: {},
      rules: {
        title: [this.$formRules.required, this.$formRules.maxLength(30)],
        category: [this.$formRules.required],
        secondCategory: [this.$formRules.required],
        size: [this.$formRules.required],
        bu: [this.$formRules.required],
        priority: [this.$formRules.required],
        powerCode: [this.$formRules.required, this.$formRules.maxLength(50)]
      },
      optionForm: {},
      optionRules: {
        dataSource: [this.$formRules.required, this.$formRules.maxLength(200)]
      },
      card: {},
      timer: null
    };
  },
  computed: {
    category() {
      return this.enums['卡片分类'];
    },
    secondCategory() {
      if (this.form.category == this.enums.cardCategory.GRAPH) {
        return this.enums['图表卡片分类'];
      }
      return [];
    },
    size() {
      return this.enums['卡片尺寸'];
    },
    bu() {
      return this.enums['产品线'];
    },
    priority() {
      return this.enums['卡片优先级'];
    },
    chartType() {
      switch (this.form.secondCategory) {
        case this.enums.graphCardCategory.LINE:
          return 'line';
        case this.enums.graphCardCategory.BAR:
          return 'bar';
        case this.enums.graphCardCategory.PIE:
          return 'pie';
        case this.enums.graphCardCategory.MAP:
          return 'map';
      }
      return '';
    }
  },
  watch: {
    'form.secondCategory': function() {
      this.refresh();
    },
    'form.size': function() {
      this.refresh();
    },
    'optionForm.dataSource': function() {
      this.refresh();
    }
  },
  methods: {
    addForm() {
      this.reset();
    },
    editForm(id) {
      this.reset();
      this.$ajax
        .get(this.apiUrl.card.GET, { id: id })
        .then(r => {
          if (r.resultCode == '200') {
            this.form = r.data;
            this.optionForm = r.data.options;
          } else {
            this.$message.error(r.msg);
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    reset() {
      this.form = {
        id: '',
        title: '',
        category: this.enums.cardCategory.GRAPH,
        secondCategory: '',
        size: this.enums.cardSize.SIZE1,
        bu: '',
        priority: '2',
        powerCode: '',
        status: '1'
      };
      this.optionForm = {
        dataSource: ''
      };
      this.card = {
        data: {},
        status: 'empty'
      };
      this.$nextTick(() => {
        this.$refs.form.resetFields();
        this.$refs.optionForm.resetFields();
      });
    },
    //提交表单
    submit(status) {
      return this.$refs.form.validate().then(() => {
        return this.$refs.optionForm.validate().then(() => {
          this.form.status = status;
          if (this.form.category == this.enums.cardCategory.GRAPH) {
            this.form.options = {
              dataSource: this.optionForm.dataSource
            };
          }
          return this.$ajax
            .post(this.apiUrl.card.SAVE, this.form)
            .then(r => {
              if (r.resultCode != 200) {
                throw new Error(r.msg);
              }
            });
        });
      });
    },
    //刷新预览图表
    refresh() {
      if (this.form.category == this.enums.cardCategory.GRAPH && this.optionForm.dataSource) {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          this.$ajax
            .get(this.optionForm.dataSource, { _test: '1' })
            .then(r => {
              if (r.resultCode == '200') {
                this.card.data = r.data;
                this.card.status = 'ready';
              } else {
                this.card.data = {};
                this.card.status = 'error';
              }
            })
            .catch(() => {
              this.card.data = {};
              this.card.status = 'error';
            });
        }, 300);
      }
    }
  },
  created() {
    this.reset();
  }
};
</script>

<style rel='stylesheet/less' lang='less' scoped>
.card-edit-powerCode-tips {
  font-size: 13px;
  color: #aaa;
  padding-left: 110px;
  margin-bottom: 20px;
}

.card-edit-preview-tips {
  font-size: 13px;
  color: #333;
  margin: 20px;
}
</style>
