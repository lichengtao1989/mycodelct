<template>

  <div class="listout">
    <div class="listleft">
      <div class="news-active border">
        <div class="model-title">执法公开</div>
        <div class="news-active-list">
          <ul>
            <li @click="changeType(index,$event)" :data-type="item.type" :class="{active:index==myindex?true:false}" v-for="(item,index) in leftAry" :key="item.id">
              <span class="sorrow insp"></span>
              <span class="name insp">{{item.text}}</span>
            </li>

          </ul>
        </div>
      </div>
      <div class="pr">
        <topright></topright>
      </div>
    </div>
    <div class="listright">
      <listview :listtype="7" :toptitle="toptitle" :listInfoAry="listAry"></listview>
      <div class="page" v-if="total>0?true:false">
        <v-page :setting="pageSet" @page-change="pageChange"></v-page>
      </div>
    </div>
  </div>

</template>

<script>
import listview from '@/base/listview';
import topright from '@/base/topright';
import { mapMutations, mapGetters } from 'vuex';
export default {
  data() {
    return {
      myindex: 0,
      leftAry: [{ text: '执法公开', type: 1, id: 1 }],
      toptitle: '首页>执法公开',
      total: '',
      listAry: [],
      pageSet: {}
    };
  },
  components: {
    listview,
    topright
  },
  methods: {
    async listInfo(query) {
      let { err, res } = await this.$ajax.get(this.$apiUrl.NEWS.LIST, query);
      if (err) {
      } else {
        if (res.ResultCode == 200) {
          let dataInfo = res.Data;
          this.total = dataInfo.Total;
          this.listAry = dataInfo.List;
          this.pageSet = {
            align: 'center',
            totalRow: dataInfo.Total, //required option
            language: 'cn', //default: 'cn'
            pageSizeMenu: [10, 20, 30, 40, 50, 100] //default: [10, 20, 50, 100]
          };
        }
      }
    },
    changeType(idx, event) {
      this.myindex = idx;

      this.toptitle = `首页>${event.target.textContent}`;
    },
    pageChange(pInfo) {
      let queryObj = {
        pageSize: pInfo.pageSize,
        pageNum: pInfo.pageNumber,
        Type: 3
      };
      this.listInfo(queryObj);
    }
  },
  created() {},
  mounted() {
    let queryObj = { pageSize: 10, pageNum: 1, Type: 3 };
    this.listInfo(queryObj);
  }
};
</script>


<style lang="scss" scoped="" type="text/css">
@import 'static/style/_var.scss';
.listright {
  border: 1px solid #128f40;
}
.listout {
  @include pr;
  width: 100%;
  @include bs;
  padding-left: 363px;
  @include mag;
  margin-top: 7px;
  padding-bottom: 0px;
  .listleft {
    @include po;
    top: 0;
    left: 0;

    width: 354px;
    // height: 304px;
    margin-bottom: 7px;

    .model-title {
      padding: 8px 20px 6px;
      color: #128f40;
      font-size: 16px;
    }
    .news-active {
      background: #ffffff;
      padding: 0 16px;
      border: 1px solid #128f40;
    }
    .news-active .news-active-list {
      padding: 20px 0;
    }
    .news-active .news-active-list ul li.active {
      background: #128f40;
      border: 1px solid #128f40;
      color: #fff;
    }
    .insp {
      vertical-align: middle;
    }
    .news-active .news-active-list ul li {
      width: 217px;
      height: 40px;
      line-height: 40px;
      border: 1px solid #b7d886;
      margin: 0px auto 15px;
      text-align: center;
      position: relative;
      cursor: pointer;
      background: #f3f9e7;
    }
    .news-active .news-active-list ul li span.sorrow {
      display: inline-block;
      width: 30px;
      height: 21px;
      background: url('../../../static/images/sorrow.png') no-repeat;
      background-size: 100% auto;
      left: 53px;
      margin-right: 10px;
    }
    .news-active .news-active-list ul li.active span.sorrow {
      background-position-y: -21px;
    }
  }
}
.pr {
  @include pr;
  height: 260px;
  width: 355px;
  margin-top: 10px;
}
.page {
  @include te;
  // @include po;
  margin-bottom: 15px;
  width: 100%;
  left: 0;
  bottom: 80px;
}
</style>
