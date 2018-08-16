<template>
  <div v-tab-title="tabTitle">

    <div class="listview">
      <div v-if="dataList.length===0" style="text-align: center;font-size: 15px"><img src="../../../../static/img/nodata.png" /></div>
      <div v-else class="listitem" v-for="item in dataList" :key="item.newID" @click="detailsBnt(item.newID)">
        <div class="title-name">{{item.title}}</div>
        <div class="midt" :style="'width:'+outlineWidth+'px'" v-if="item.outline !='' && item.outline != null">{{item.outline}}</div>
        <div class="righttime">{{item.lastUpdateTime}}</div>
      </div>

      <div class="list-bottom">
        <!--分页器-->
        <nz-pagination @current-change="currentPageChange" @size-change="pageSizeChange" :current-page="currentPage" :page-sizes="[10, 15, 20, 50]" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.totalPage" class="nz-pagination">
        </nz-pagination>
        <i class="nz-icon-update" @click="refresh"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    let apiUrl = this.$apiUrl.NEWMANAGEMENT;
    return {
      apiUrl: apiUrl,
      currentPage: 1,
      pageSize: 10,
      totalPage: 1,
      dataList: [],
      isActive: true,
      total: '',
      keyWord: '',
      boxWidth: 0
    };
  },
  props: {
    dataList: {
      type: Object
    },
    pagination: {
      type: Object
    },
    module: {
      type: Number
    }
  },
  watch: {},
  computed: {
    //图片宽
    outlineWidth() {
      let fz = 300;
      fz = this.boxWidth - 350;
      fz = parseInt(fz);
      return fz;
    }
  },
  methods: {
    currentPageChange(val) {
      this.pagination.currentPage = val;
      this.$emit('listView', '');
    },
    pageSizeChange(val) {
      this.pagination.pageSize = val;
      this.$emit('listView', '');
    },
    async detailsBnt(id) {
      window.open(`index.html#/details?id=${id}&module=${this.module}`);
    },
    refresh() {
      this.$emit('listView', '');
    },
    resize() {
      if (this.$el) {
        this.boxWidth = this.$el.offsetWidth;
      }
    },
    bindResize() {
      window.addEventListener('resize', this.resize);
    },
    unBindResize() {
      window.removeEventListener('resize', this.resize);
    }
  },
  async mounted() {
    this.bindResize();
    this.resize();
  },
  beforeDestroy() {
    this.unBindResize();
  },
  created() {
    this.$emit('listView', '');
  }
};
</script>
<style rel='stylesheet/less' lang='less' scoped>
@import '../../../assets/css/config.less';
.list-bottom {
  margin-top: 30px;
  text-align: center;
}
.listview {
  background: #fff;
  min-height: 780px;
  width: 100%;
  padding: 19px 0;
  font-size: 15px;
  color: #2b2b2b;
  position: relative;
  box-sizing: border-box;
  .listitem {
    .title-name {
      font-size: 18px;
      color: #666666;
      font-weight: bold;
      width: 100%;
      margin: 14px 0px;
      display: inline-block;
    }
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin: 0 28px;
    font-size: 13px;
    border-bottom: 1px solid #ededed;
    box-sizing: border-box;
    .midt {
      box-sizing: border-box;
      display: inline-block;
      margin-bottom: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .righttime {
      position: absolute;
      right: 26px;
      bottom: 10px;
      color: #999999;
      font-size: 14px;
    }
  }
}
.item-type {
  li {
    list-style-type: none;
    border: #d9d9d9 1px solid;
    border-radius: 30px;
    color: #666666;
    display: inline-block;
    margin: 10px 13px 20px 0px;
    text-align: center;
    width: 118px;
    height: 25px;
    line-height: 25px;
    font-size: 12px;
    cursor: pointer;
  }
  li.active {
    background-color: #eaf4f3;
    color: #00a889;
    border: #eaf4f3 1px solid;
  }
}
.search-dev {
  display: inline-block;
  padding-left: 40px;
}
.nz-search {
  position: relative;
}

.nz-search-input {
  font-size: 13px;
  float: left;
  width: 162px;
  height: 22px;
  line-height: 22px;
  padding: 5px 20px 5px 12px;
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
  border: 1px solid @ExtraLightSilver;
}

.nz-search-input::placeholder {
  color: @ExtraLightSilver;
}

.nz-search-clear {
  position: absolute;
  right: 52px;
  top: 10px;
  color: @ExtraLightSilver;
  font-size: 15px;
  cursor: pointer;
}

.nz-search-button {
  float: left;
  width: 48px;
  height: 34px;
  line-height: 34px;
  color: #fff;
  text-align: center;
  border: none;
  border-bottom-right-radius: 4px;
  border-top-right-radius: 4px;
  background-color: @primaryColor;
  cursor: pointer;
}

.nz-search:after {
  content: '';
  clear: both;
}
</style>
