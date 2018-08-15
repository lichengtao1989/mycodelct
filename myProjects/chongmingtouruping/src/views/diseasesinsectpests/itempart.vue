<template>
  <div class="itemout">
    <div class="itempart" @click="itemClick(index,item.id)" :class="{active:myindex==index}" v-for="(item,index) in datalist" :key="item.id">
      <div class="bg">
        <div class="pob">
          <i class="nz-icon-confirm"></i>
        </div>
        <img :src="item.imgurl" class="imgstyle">
      </div>
      <div class="wz">{{item.name}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['datalist'],
  data() {
    return {
      myindex: 0
    };
  },
  components: {},
  computed: {},
  methods: {
    itemClick(idx, id) {
      this.myindex = idx;
      this.$emit('changeId', id);
    }
  },
  mounted() {
    // this.resize();
    // window.addEventListener('resize', this.resize);
  },
  beforeDestroy() {
    // window.removeEventListener('resize', this.resize);
  },
  created() {}
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.itempart {
  width: 80px;
  display: inline-block;
  vertical-align: top;
  margin-bottom: 11px;
  margin-right: 17px;
  cursor: pointer;
}
.imgstyle {
  display: block;
  width: 78px;
  height: 78px;
  border-radius: 5px;
  border: 1px solid #d9d9d9;
}
.wz {
  text-align: center;
  height: 32px;
  line-height: 32px;
  color: #333333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.bg {
  position: relative;
}
.pob {
  display: none;
  position: absolute;
  width: 18px;
  height: 18px;
  background: #00a789;
  color: #fff;
  text-align: center;
  bottom: -5px;
  right: -7px;
  border-radius: 50%;
  i {
    font-size: 10px !important;
  }
}
.active {
  img {
    border: 1px solid #00a889;
  }
  .pob {
    display: block;
  }
}
</style>
