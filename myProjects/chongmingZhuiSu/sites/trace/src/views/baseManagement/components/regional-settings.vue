<template>
  <div>
    <cjm-form ref="form">
      <cjm-form-item label="区域用色" class="cjm-form-item-long">
        <color-picker v-model="regionalColor" size="small" @change="changeColor"></color-picker>
      </cjm-form-item>
      <cjm-form-item label="透明度" class="cjm-form-item-long">
        <input-number controls-position="right" size="small" :min="1" :max="100" @change="changeColor" @blur="changeColor" v-model="regionalOpacity"></input-number>
      </cjm-form-item>
    </cjm-form>
  </div>
</template>
<script>
import { inputNumber, ColorPicker } from 'element-ui';
export default {
  components: {
    'input-number': inputNumber,
    'color-picker': ColorPicker
  },
  data() {
    return {
      regionalColor: '#20545f',
      regionalOpacity: 55
    };
  },
  methods: {
    submit() {},
    retSet(){
      this.regionalColor = '#20545f';
      this.regionalOpacity = 55;
    },
    //设置区域颜色
    changeColor() {
      this.$emit('setRegionalColor', this.regionalColor, this.regionalOpacity);
    },
    editForm(fillColor, fillOpacity) {
      this.regionalColor = fillColor;
      this.regionalOpacity = parseInt(fillOpacity * 100);
    }
  }
};
</script>
<style scoped>
.activate {
  color: #20a0ff;
  cursor: pointer;
  text-decoration: underline;
}
p {
  font-size: 14px;
  line-height: 24px;
}
</style>
