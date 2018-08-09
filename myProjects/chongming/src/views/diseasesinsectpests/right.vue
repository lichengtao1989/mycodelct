<template>
  <div class="rightlct">
    <div class="toptab">
      <div class="tabitem" @click="tabitemClick(index)" :class="{active:index==myindex}" v-for="(item,index) in listTab" :key="item.id">{{item.text}}({{item.total}})
        <div class="bd"></div>
      </div>
    </div>
    <div class="nextlist">
      <!-- <nz-scrollbar style="height:480px"> -->
      <div class="itemshow" @click="showDialog(item)" v-for="(item,index) in listRight" :key="item.id" :data-index="index">
        <div class="tup">
          <img :src="item.ImageUrl" class="imgstyle">
        </div>
        <div class="wz">{{item.PestDistinct}}</div>
      </div>
      <!-- </nz-scrollbar> -->
    </div>
    <!-- <dialog-view ref="dialog"></dialog-view> -->
  </div>
</template>
<script>
import dialogView from './dialog';
export default {
  props: ['listRight'],
  data() {
    return {
      myindex: 0,
      listTab: [{ text: '热门病害', total: 15, id: 0 }, { text: '热门虫害', total: 10, id: 1 }, { text: '热门草害', total: 11, id: 2 }]
    };
  },
  components: { dialogView },
  computed: {},
  methods: {
    tabitemClick(idx) {
      this.myindex = idx;
    },
    showDialog(info) {
      console.log(info);
      // this.$refs.dialog.show(info);
      this.$emit('showDialog', info);
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
.rightlct {
  width: 50%;
  // position: absolute;
  // top: 0;
  // right: 0;
  // z-index: 2;
  padding-left: 70px;
  // display: inline-block;
  float: right;
  // vertical-align: top;
  box-sizing: border-box;
  border-top: 1px solid #dddddd;
}
.toptab {
  width: 93%;
  height: 46px;
  line-height: 46px;
  border-bottom: 1px solid #dddddd;
  .tabitem {
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    margin-right: 40px;
    color: #656565;
    .bd {
      display: none;
      position: absolute;
      bottom: 1px;
      left: 0;
      background: #00a889;
      width: 100%;
      height: 2px;
    }
  }
  .active {
    color: #00a889;
    .bd {
      display: block;
    }
  }
}
.itemshow {
  cursor: pointer;
  width: 80px;
  display: inline-block;
  margin-bottom: 11px;
  margin-right: 17px;
  vertical-align: top;
}
.nextlist {
  padding-top: 19px;
  .imgstyle {
    display: block;
    width: 80px;
    height: 80px;
    border-radius: 5px;
  }
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
</style>
