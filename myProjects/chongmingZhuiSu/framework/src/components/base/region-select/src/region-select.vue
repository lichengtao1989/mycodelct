<template>
  <cjm-cascader :options="regionData" placeholder="请选择省市区" :props="props" :value="values" :change-on-select="requireLevel!==3" @input="inputHandler">
  </cjm-cascader>
</template>

<script>
import { storage } from '../../../../utils/storage';
import { ajax } from '../../../../utils/ajax';
import apiUrl from '../../../../config/apiUrl';
export default {
  name: 'cjm-region-select',
  data() {
    return {
      regionData: [],
      props: {
        value: 'RegionCode',
        label: 'RegionName',
        children: 'SubItems'
      }
    };
  },
  props: {
    value: String,
    //数据需要精确到哪级，1：”省“必填 2：“省市”必填 3：“省市区”必填
    requireLevel: {
      type: Number,
      default: 3
    }
  },
  computed: {
    values() {
      let result = [];
      if (!this.value || this.value.length !== 6) {
        return result;
      }
      result.push(this.value.substr(0, 2) + '0000');
      if (this.value.substr(2, 4) !== '0000') {
        result.push(this.value.substr(0, 4) + '00');
      }
      if (this.value.substr(4, 2) !== '00') {
        result.push(this.value);
      }
      return result;
    }
  },
  methods: {
    inputHandler(val) {
      if (val.length >= this.requireLevel) {
        this.$emit('input', val[val.length - 1]);
      } else {
        if (this.value === '') {
          this.$emit('input', ' ');
        } else {
          this.$emit('input', '');
        }
      }
    }
  },
  created() {
    getRegionData().then(data => {
      this.regionData = data;
    });
  }
};

//获取行政区数据，数据来源可能是缓存或者后台
function getRegionData() {
  storage.remove('regionData');
  return new Promise(resolve => {
    let regionData = storage.get('regionData2');
    if (!regionData) {
      ajax.get(apiUrl.REGION).then(r => {
        storage.set('regionData2', r);
        resolve(r);
      });
    } else {
      resolve(regionData);
    }
  });
}
</script>
