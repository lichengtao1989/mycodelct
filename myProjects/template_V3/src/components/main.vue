<template>
  <div>
    <top></top>
    <introduce></introduce>
    <queryinfo></queryinfo>
    <itemlist @showtypechange="typechange"></itemlist>
    <infoshow :showtype="showtype"></infoshow>
    <foot></foot>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex';
  import top from './top.vue';
  import introduce from './introduce.vue';
  import queryinfo from './queryinfo.vue';
  import itemlist from './itemlist.vue';
  import infoshow from './infoshow.vue';
  import foot from './foot.vue';
  import urlQuery from '../common/jsonp/urlQuery';
  export default {
    data() {
      return {
        showtype: 1,
        code: '',
      };
    },
    components: {
      top,
      introduce,
      queryinfo,
      itemlist,
      infoshow,
      foot
    },
    created() {
      const {code, batchid} = urlQuery(location.href.toLocaleLowerCase());
      const batchidIndex = location.href.toLocaleLowerCase().indexOf('batchid');
      if (batchidIndex < 0) { // 正常H5页面
        this.getCorpInfo(code).then(res => {
          if (res.Data) {
            let ProductBatchID = res.Data.ProductBatchID;
            let CorpID = res.Data.CorpID;
            this.setCorpInfo(res.Data);
            this.getProductBatchCustom(ProductBatchID).then(res => {
              this.setCustomInfo(res.Data);
            });
            this.getPoorInfoByProductBatch(CorpID, ProductBatchID).then(res => {
              this.setPoorInfo(res.Data);
            });
            this.getProductBatchTraceNode(ProductBatchID).then(res => {
              this.setProductBatchTraceNodeInfo(res.Data.TraceNodeList);
            });
            this.getBlockChainInfo(ProductBatchID).then(res => {
              this.setBlockChainInfo(res.Data);
            });
          }
        });
        // 防伪码进行区块链时间查询
        if (code.length > 18) {
          this.getAntiFakeQueryResult().then(res => {
            this.setAntiFakeInfo(res.Data);
          })
        }
      } else if (batchidIndex != -1) { // 后台预览页面
          this.getBatchIdCorpInfo(batchid).then(res => {
            if (res.Data) {
              let CorpID = res.Data.CorpID;
              this.setCorpInfo(res.Data);
              this.getProductBatchCustom(batchid).then(res => {
                this.setCustomInfo(res.Data);
              });
              this.getPoorInfoByProductBatch(CorpID, batchid).then(res => {
                this.setPoorInfo(res.Data);
              });
              this.getProductBatchTraceNode(batchid).then(res => {
                this.setProductBatchTraceNodeInfo(res.Data.TraceNodeList);
              });
              this.getBlockChainInfo(batchid).then(res => {
                this.setBlockChainInfo(res.Data);
              });
            }
          });
      }
    },
    methods: {
      getCorpInfo(Code) {
        let data = {function: 'TraceQuery', Code, type: 'ncp'};
        return this.$jsonp(data);
      },
      getBatchIdCorpInfo(ProductBatchID) {
        let data = {function: 'BatchIDTraceQuery', ProductBatchID, type: 'ncp'};
        return this.$jsonp(data);
      },
      getProductBatchCustom(BatchID) {
        let data = {function: 'GetProductBatchCustomFunction', BatchID, type: 'ncp'};
        return this.$jsonp(data);
      },
      getProductBatchTraceNode(ProductBatchID) { // 分页
        let data = {function: 'GetProductBatchTraceNode', ProductBatchID, type: 'cjm'};
        return this.$jsonp(data);
      },
      getBlockChainInfo(ProductBatchID) {
        let data = {function: 'GetBlockChainInfo', ProductBatchID, type: 'cjm'};
        return this.$jsonp(data);
      },
      getAntiFakeQueryResult() {
        const {code} = urlQuery(location.href.toLocaleLowerCase());
        let AntiFakeCode = code;
        let data = {function: 'AntiFakeQuery', AntiFakeCode, QueryType: 1, type: 'ncp'};
        return this.$jsonp(data);
      },
      getPoorInfoByProductBatch(CorpID, ProductBatchID) {
        let AntiFakeCode = code;
        let data = {function: 'GetPoorInfoByProductBatch', CorpID , ProductBatchID, type: 'cjm'};
        return this.$jsonp(data);
      },
      typechange(msg) {
        switch (msg) {
          case '品质报告':
            this.showtype = 1;
            break;
          case '生产追溯':
            this.showtype = 2;
            break;
          case '智能监测':
            this.showtype = 3;
            break;
          case '更多':
            this.showtype = 4;
            break;
        }
      },
      ...mapMutations({
        setCorpInfo: 'SET_CORPINFO',
        setCustomInfo: 'SET_CUSTOMINFO',
        setPoorInfo: 'SET_POORINFO',
        setProductBatchTraceNodeInfo: 'SET_PRODUCTBATCH_TRACENODEINFO',
        setBlockChainInfo: 'SET_BLOCK_CHAININFO',
        setAntiFakeInfo: 'SET_ANT_FAKEINFO',
      })
    },
  };
</script>

<style lang="scss">
</style>