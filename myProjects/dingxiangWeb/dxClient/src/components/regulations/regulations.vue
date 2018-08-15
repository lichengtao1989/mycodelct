<template>

  <div class="listout">
    <div class="listleft">
      <div class="news-active border">
        <div class="model-title">政策法规</div>
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
      <listview :listtype="4" :toptitle="toptitle" :listInfoAry="listAry"></listview>
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
      leftAry: [{ text: '政策法规', type: 1, id: 1 }],
      toptitle: '首页>政策法规',
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
      let { err, res } = await this.$ajax.get(this.$apiUrl.COMMON.LIST, query);
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
      // console.log(pInfo)
      let queryObj = {
        pageSize: pInfo.pageSize,
        pageNum: pInfo.pageNumber,
        ArticleType: 4
      };
      this.listInfo(queryObj);
    }
  },
  created() {},
  mounted() {
    let queryObj = { pageSize: 10, pageNum: 1, ArticleType: 4 };
    this.listInfo(queryObj);
  }
};
</script>


<style lang="scss" scoped="" type="text/css">
$base: 192;
@import 'static/style/_var.scss';
.listright {
  border: 1rem / $base solid #128f40;
}
.listout {
  @include pr;
  width: 100%;
  @include bs;
  padding-left: 363rem / $base;
  @include mag;
  margin-top: 7rem / $base;
  padding-bottom: 0rem / $base;
  .listleft {
    font-size: 16rem / $base;
    @include po;
    top: 0;
    left: 0;

    width: 354rem / $base;
    // height: 304rem/$base;
    margin-bottom: 7rem / $base;

    .model-title {
      padding: 8rem / $base 20rem / $base 6rem / $base;
      color: #128f40;
      font-size: 16rem / $base;
    }
    .news-active {
      background: #ffffff;
      padding: 0 16rem / $base;
      border: 1rem / $base solid #128f40;
    }
    .news-active .news-active-list {
      padding: 20rem / $base 0;
    }
    .news-active .news-active-list ul li.active {
      background: #128f40;
      border: 1rem / $base solid #128f40;
      color: #fff;
    }
    .insp {
      vertical-align: middle;
    }
    .news-active .news-active-list ul li {
      width: 217rem / $base;
      height: 40rem / $base;
      line-height: 40rem / $base;
      border: 1rem / $base solid #b7d886;
      margin: 0rem / $base auto 15rem / $base;
      text-align: center;
      position: relative;
      cursor: pointer;
      background: #f3f9e7;
    }
    .news-active .news-active-list ul li span.sorrow {
      display: inline-block;
      width: 30rem / $base;
      height: 21rem / $base;
      background: url('../../../static/images/sorrow.png') no-repeat;
      background-size: 100% auto;
      left: 53rem / $base;
      margin-right: 10rem / $base;
    }
    .news-active .news-active-list ul li.active span.sorrow {
      background-position-y: -21rem / $base;
    }
  }
}
.pr {
  @include pr;
  height: 260rem / $base;
  width: 355rem / $base;
  margin-top: 10rem / $base;
}
.page {
  @include te;
  // @include po;
  margin-bottom: 15rem / $base;
  width: 100%;
  left: 0;
  bottom: 80rem / $base;
}
</style>
