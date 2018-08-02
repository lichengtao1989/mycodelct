<template>
  <div class="warehousRecordout">
    <list v-if="page=='list'"></list>
    <detail v-if="page=='deliver'"></detail>

  </div>
</template>
<script>
import list from './list';
import detail from './detail';

export default {
  components: { list, detail },
  data() {
    return {
      page: 'list'
    };
  },
  watch: {
    $route: function() {
      this.setViewPage();
    }
  },
  methods: {
    setViewPage() {
      const { id } = this.$route.query;
      if (id) {
        this.page = 'deliver';
      } else {
        this.page = 'list';
      }
    }
  },
  mounted() {
    this.setViewPage();
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.warehousRecordout {
  position: relative;
}
.p20 {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 4;
}
.ustatus {
  color: #128f40;
  span {
    margin-right: 5px;
    display: inline-block;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    vertical-align: middle;
    background: #128f40;
  }
}
.status0,
.status2 {
  color: #fe5500;
  span {
    background: #fe5500;
  }
}
</style>
