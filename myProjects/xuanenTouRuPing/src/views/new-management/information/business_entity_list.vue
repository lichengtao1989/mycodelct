<template>
  <div v-tab-title="tabTitle">
    <div class="listview">
      <div class="nz-search search-dev">
        <input type="text" v-model="keyWord" @keyup.enter="search" class="nz-search-input">
        <i class="nz-search-clear el-icon-circle-close" v-show="keyWord.length>0" @click="clear"></i>
        <i class="nz-search-button el-icon-search" @click="search"></i>
      </div>
      <ul class="item-type">
        <li :class="{'active': isActive}" @click="getNewsType('')">全部（{{total}}）</li>
        <li v-for="itemType in newstype" :key="itemType" @click="getNewsType(itemType.value)" :class="{'active': itemType.isActive}">{{itemType.name}}（{{itemType.number}}）</li>
      </ul>
      <business-entity ref="businessEntity" @listView="listView" :dataList="dataList" :module="2" :pagination="pagination"></business-entity>
    </div>
  </div>
</template>
<script>
import businessEntity from './business_entity.vue';
export default {
  components: {
    businessEntity
  },
  data() {
    let apiUrl = this.$apiUrl.NEWMANAGEMENT;
    return {
      apiUrl: apiUrl,
      pagination: {
        currentPage: 1,
        pageSize: 10,
        totalPage: 1
      },
      dataList: [],
      isActive: true,
      total: '',
      tabTitle: '农技知识',
      newstype: this.$enum('资讯类别').values,
      keyWord: '',
      type: ''
    };
  },
  watch: {},
  methods: {
    getNewsType(type) {
      this.type = type;
      this.listView(type);
      if (type == '') {
        this.isActive = true;
        this.newstype.forEach((item, index) => {
          this.$set(this.newstype[index], 'isActive', false);
        });
      } else {
        this.newstype.forEach((item, index) => {
          this.$set(this.newstype[index], 'isActive', false);
          if (item.value == type) {
            this.$set(this.newstype[index], 'isActive', true);
            this.isActive = false;
          }
        });
      }
    },
    async listView() {
      let data = {
        type: this.type,
        keyWord: this.keyWord,
        pageSize: this.pagination.pageSize,
        pageNum: this.pagination.currentPage
      };
      console.log(data);
      let { err, res } = await this.$model('dataManagement').commonfn2(this.apiUrl.GET_LIST + '?module=2', data);
      if (res.resultCode == 200) {
        this.dataList = res.data.rows;
        this.pagination.totalPage = res.data.total;
      } else {
        this.$message.showError(err);
      }
    },
    async getNumberOfStatistics() {
      let { err, res } = await this.$model('dataManagement').commonfn2(this.apiUrl.GET_NUMBER_STATISTICS);
      if (res.resultCode == 200) {
        res.data.forEach((item, index) => {
          if (item.type == 0) {
            this.total = item.number;
          } else {
            this.newstype.forEach((types, index) => {
              if (item.type == types.value) {
                types.number = item.number;
              }
            });
          }
        });
      } else {
        this.$message.showError(err);
      }
    },
    refresh() {
      this.listView();
    },
    async editFirm(callback) {
      let { valid, err, res } = await this.$refs.edit.save();
      if (valid) {
        if (res.resultCode == 200) {
          this.$refs.editDialog.hide();
          this.$refs.list.refresh();
        } else {
          this.$message.showError(err);
          await this.$sleep(500);
        }
      }
      callback();
    },
    search() {
      this.listView();
    },
    clear() {
      this.keyWord = '';
      this.type = '';
      this.getNewsType('');
    }
  },
  created() {
    this.getNewsType('');
    this.listView();
    this.getNumberOfStatistics();
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
