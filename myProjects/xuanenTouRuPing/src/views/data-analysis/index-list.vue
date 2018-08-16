<template>
  <div>
    <div style="margin-left: 25px;margin-top: -20px;">
      <nz-enum-select v-model="categorys.category" isRadioBtn :options="$enum('类别').values"></nz-enum-select>
    </div>
    <div style="padding: 0px 22px 20px 22px;height: 286px">
      <table class="index-list">
        <thead>
          <tr>
            <th v-for="(item,index) in config.columns" :key="index" :style="item.style">{{item.name}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(dataItem,dataIndex) in config.data" :key="dataIndex">
            <td v-for="(col,index) in config.columns" :key="index" :style="col.style">
              <span v-if="!col.key">{{ dataIndex+1 }}</span>
              <span>{{ dataItem[col.key] }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    config: Object,
    categorys: Object
  },
  data() {
    return {};
  },
  watch: {},
  methods: {},
  async created() {}
};
</script>
<style rel="stylesheet/less" lang="less" scoped>
@import '~@/assets/css/config';

.index-list {
  width: 100%;
  text-align: left;
  font-size: 14px;
  tr,
  td,
  th {
    height: 43px;
    border-bottom: 1px solid #ededed;
  }
  th {
    color: #999999 !important;
  }
  td {
    color: #666666;
  }
}

.more {
  height: 40px;
  background-color: #f9f9f9;
  text-align: right;
  color: @primaryColor;
  line-height: 40px;
  a {
    margin-right: 20px;
    cursor: pointer;
  }
}
</style>
