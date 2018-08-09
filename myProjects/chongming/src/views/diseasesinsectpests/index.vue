<template>
  <div class="diseasesinsectpests">
    <div class="porightsearch">
      <div class="porightsearchbtn">
        <i class="nz-search-button el-icon-search"></i>
      </div>
      <nz-input v-model="searchVal" class="searchinput"></nz-input>
    </div>
    <div class="topinfo">
      <div class="poleft" :class="colv" @click="allClick">
        全部类型(281)
      </div>
      <div class="rightlist">
        <div class="inlineitem" @click="itemClick(index)" :class="{active:index==myindex}" v-for="(item,index) of listTopAry" :key="item.id">{{item.text}}({{item.total}})</div>
      </div>
    </div>
    <div class="nextinfo">
       <!-- :style="{height:heightval}" -->
      <left @listInfo='listInfo'></left>
      <right :listRight="listRight" @showDialog="showDialog"></right>
    </div>
    <dialog-view ref="dialog"></dialog-view>
  </div>
</template>
<script>
import left from './left.vue';
import right from './right.vue';
import dialogView from './dialog';
export default {
  data() {
    return {
      listRight: [],
      searchVal: '',
      myindex: null,
      contentHeight: 500,
      colv: 'lv',
      listTopAry: [{ text: '观赏树木', total: 17, id: 0 }, { text: '花卉', total: 25, id: 1 }, { text: '果树', total: 17, id: 2 }, { text: '大田作物', total: 105, id: 3 }, { text: '蔬菜', total: 82, id: 4 }]
    };
  },
  components: { left, right, dialogView },
  computed: {
    heightval() {
      if (this.listRight.length > 28) {
        return this.listRight.length / 7 * 115 + 180 + 'px';
        // console.log(this.listRight.length / 7 * 112 + 112);
      } else {
      }
    }
  },
  methods: {
    showDialog(info) {
      this.$refs.dialog.show(info);
    },
    itemClick(idx) {
      this.myindex = idx;
      this.colv = 'bai';
    },
    listInfo(info) {
      this.listRight = info;
    },
    allClick() {
      this.colv = 'lv';
      this.myindex = null;
    },
    resize() {
      this.contentHeight = window.innerHeight - 50;
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
.diseasesinsectpests {
  padding-left: 37px;
  padding-right: 37px;
  padding-top: 30px;
  position: relative;
  padding-bottom: 34px;
}
.nextinfo {
  // height: 713px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  margin-top: 30px;
  box-sizing: border-box;
  padding-left: 25px;
  padding-right: 36px;
  overflow: hidden;
  // position: relative;
}
.porightsearch {
  width: 397px;
  position: absolute;
  top: 29px;
  right: 37px;
  .porightsearchbtn {
    position: absolute;
    top: 1px;
    right: 0;
    z-index: 2;
    i {
      height: 38px;
      cursor: pointer;
    }
  }
}
.topinfo {
  display: inline-block;
  height: 38px;
  line-height: 38px;
  position: relative;
  font-size: 14px;
  color: #343434;
  border: 1px solid #d9d9d9;
  box-sizing: border-box;
  padding-left: 143px;
  border-radius: 5px;
  cursor: pointer;
  .poleft {
    width: 143px;
    position: absolute;
    top: -1px;
    left: 0;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    text-align: center;
  }
  .lv {
    background: #00a889;
    color: #fff;
  }

  .rightlist {
    display: inline-block;
    border-left: 1px solid #d9d9d9;
  }
  .inlineitem {
    display: inline-block;
    text-align: center;
    position: relative;
    padding-left: 20px;
    padding-right: 20px;
    border-right: 1px solid #d9d9d9;
  }
  .inlineitem:last-child {
    border: none;
  }
  .active {
    background: #00a889;
    color: #fff;
  }
}
</style>
