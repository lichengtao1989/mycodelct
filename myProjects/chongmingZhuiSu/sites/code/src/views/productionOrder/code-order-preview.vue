<template>
  <div class="cjm-edit-page" id="productionOrderPreview">
    <cjm-carousel :autoplay="false" arrow="always" trigger="click" height="1100px" indicator-position="outside">
      <cjm-carousel-item class="preview-wrapper" v-for="(page, index) in previewPages" :key="index">
        <div class="preview">
          <div class="order-status">
            <img src="https://static.app315.net/resource/images/wuliudan/1.png" alt=""
                 v-if="isSupplement === '1' && emergencyDegree === '1'">
            <img src="https://static.app315.net/resource/images/wuliudan/2.png" alt=""
                 v-if="emergencyDegree === '2' && isSupplement === '0'">
            <img src="https://static.app315.net/resource/images/wuliudan/3.png" alt=""
                 v-if="isSupplement === '1' && emergencyDegree === '2'">
          </div>
          <div class="preview-title" v-text="pageType=='code'?'生码单':'防伪生产加工订单'"></div>
          <div class="order-code clear">
            <p class="order-code-label">订单号</p>
            <cjm-input class="order-code-input" v-model="orderCode" :disabled="true"></cjm-input>
          </div>
          <p style="font-weight: bold;">防伪密码使用公司主体：{{page[0].corpName}}({{page[0].corpID}})</p>
          <!--table-->
          <div class="table">
            <table cellspacing="0" border="1" borderColor="#E5E9F2" v-if="pageType=='code'">
              <tr v-for="(item, itemIndex) in codePreviewModel" :key="itemIndex">
                <td class="table-title">{{item}}</td>
                <td v-for="(tag, tagIndex) in page" :style="{width: 680/page.length + 'px'}" :key="tagIndex">
                  <p v-if="codePreviewModelField[itemIndex] !== 'website'">{{tag[codePreviewModelField[itemIndex]]}}</p>
                  <p v-if="codePreviewModelField[itemIndex] === 'website'">{{tag['antiFakeWebsite']}}</p>
                  <p v-if="codePreviewModelField[itemIndex] === 'website'">{{tag['logisticsWebsite']}}</p>
                </td>
              </tr>
            </table>
            <table cellspacing="0" border="1" borderColor="#E5E9F2" v-if="pageType=='machining'">
              <tr v-for="(item, itemIndex) in machiningPreviewModel" :key="itemIndex">
                <td class="table-title">{{item}}</td>
                <td v-for="(tag, tagIndex) in page" :style="{width: 680/page.length + 'px'}" :key="tagIndex">
                  <p v-if="machiningPreviewModelField[itemIndex] !== 'website'">
                    {{tag[machiningPreviewModelField[itemIndex]]}}</p>
                  <p v-if="machiningPreviewModelField[itemIndex] === 'website'">{{tag['antiFakeWebsite']}}</p>
                  <p v-if="machiningPreviewModelField[itemIndex] === 'website'">{{tag['logisticsWebsite']}}</p>
                </td>
              </tr>
            </table>
          </div>
          <!--footer-->
          <div class="footer clear" v-if="pageType == 'machining'">
            <div>
              <p>印刷工厂：{{page[0].factoryName}}</p>
              <p>传真：{{page[0].factoryFax}}</p>
              <p>法定代表人或代表：</p>
              <p>
                日期：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日</p>
            </div>
            <div>
              <p>浙江甲骨文超级码科技股份有限公司（章）</p>
              <p>传真：0571-88057010转883</p>
              <p>法定代表人或代表：</p>
              <p>
                日期：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日</p>
            </div>
          </div>
          <div class="footer clear" v-if="pageType == 'code'">
            <p style="float: right;">日期：{{year}}年{{month}}月{{day}}日</p>
          </div>
        </div>
      </cjm-carousel-item>
    </cjm-carousel>
    <div class="cjm-page-bottom-holder"></div>
    <div class="cjm-page-bottom-bar">
      <cjm-button type="primary" class="cjm-icon-print" @click="startPrint">打印</cjm-button>
    </div>
  </div>
</template>
<script>
  import { carousel, carouselItem } from 'element-ui';
  import LODOP from '../../utils/print/lodopFuncs'
  export default{
    components: {
      'cjmCarousel': carousel,
      'cjmCarouselItem': carouselItem
    },
    data(){
      return {
        tableData: '',
        machiningPreviewModel: ['标识名称', '标识大小', '标识颜色', '套标比例', '标识数量', '防伪查询方式', '技术类型', '纸张要求', '要求发货时间', '确认发货时间', '备注'],
        machiningPreviewModelField: ['tagName', 'tagSpecifications', 'colorWords', 'proportion', 'transformBatchNumber', 'transformQueryType', 'transformTechCharacteristics', 'paperRequirements', 'reqDeliveryTime', 'deliveryTime', 'printingNote'],
        codePreviewModel: ['标识名称', '码功能', '生码实际比例', '码规则', '码类型', '数量', '排序规则', '应用系统', '防伪查询方式', '查询语音', '加网址', '技术类型', '备注'],
        codePreviewModelField: ['tagName', 'transformFunctionType', 'proportion', 'codeRules', 'transformCodeType', 'transformBatchNumber', 'transformSort', 'transformSystem', 'transformQueryType', 'internetQueryText', 'website', 'transformTechCharacteristics', 'generatingNote'],
        previewPages: [],
        enums: this.$globalData.get('code', 'enums'),
        LODOP: null,
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate(),
        isSupplement: '0',
        emergencyDegree: '1'
      }
    },
    methods: {
      acceptData(){
        let ids = sessionStorage.getItem('ids') ? JSON.parse(sessionStorage.getItem('ids')).join(',') : '';
        let params = {
          productionOrderID: this.productionOrderID,
          ids: ids
        };
        this.$ajax.get(this.$globalData.get('code', 'apiUrl').productionOrder.PRINT_PREVIEW, params).then((res) => {
          if (res.resultCode === '200') {
            let page = [];
            res.data.forEach((p, index) => {
              page.push(this.handleTagInformation(p));
              if (index % 3 === 2) {
                this.previewPages.push(page);
                page = [];
              }
            });
            if (page.length < 3 && page.length !== 0) {
              this.previewPages.push(page);
            }
          } else {
            this.$message.error(res.msg);
          }
        });
      },
      handleTagInformation(data){
        /*标签颜色*/
        data.colorWords = '按设计稿或按上批';
        /*生产比例*/
        if (data.layerNumber === '2') {
          data.proportion = '1:' + data.layer3Number;
        } else if (data.layerNumber === '3') {
          data.proportion = '1:' + data.layer2Number + ':' + data.layer3Number;
        } else if (data.layerNumber === '1') {
          if (data.functionType.indexOf('2') !== -1) {
            data.proportion = '无层级';
          } else {
            data.proportion = '';
          }
        }
        /*网站*/
        if (data.antiFakeTextPosition === '1') {
          data.antiFakeWebsite = data.antiFakeText ? data.antiFakeText + '防伪码' : '';
        } else {
          data.antiFakeWebsite = data.antiFakeText ? '防伪码' + data.antiFakeText : '';
        }
        if (data.layer3TextPosition === '1') {
          data.logisticsWebsite = data.layer3Text ? data.layer3Text + '物流码' : '';
        } else {
          data.logisticsWebsite = data.layer3Text ? '物流码' + data.layer3Text : '';
        }
        if (data.systemCode === 'Independent') {
          data.transformSystem = '独立系统';
        } else if (data.systemCode === 'SuperCode') {
          data.transformSystem = '超级码系统';
        } else if (data.systemCode === 'Agriculture') {
          data.transformSystem = '农产品系统';
        }
        let functionType = [];
        if (data.functionType) {
          functionType = data.functionType.split(',').map((p) => {
            if (p === '1') {
              return '防伪';
            } else if (p === '2') {
              return '物流';
            } else if (p === '3') {
              return '积分';
            }
          });
        }
        let codeType = [];
        if (data.is18plus2 === '1') {
          codeType.push('18+20');
        } else if (data.isYZMQuery === '1') {
          codeType.push('17+4');
        } else if (data.is16plus20 === '1') {
          codeType.push('16+20');
        } else if (data.realTagImage === '2') {
          codeType.push('π技术');
        } else if (data.isMaShangTu === '1') {
          codeType.push('码上图');
        } else if (data.isSV === '1') {
          codeType.push('SV');
        } else if (data.isPesticide === '1') {
          codeType.push('农药码');
        }
        let codeRules = '';
        if (data.layer3CodeRule === '1') {
          codeRules += '小码(随机),';
        } else {
          codeRules += '小码(顺序),';
        }
        if (data.layer2CodeRule === '1') {
          codeRules += '中码(随机)';
        } else {
          codeRules += '中码(顺序)';
        }
        if (data.functionType.indexOf('2') === -1) { //码没有物流功能的时候
          codeRules = ''; //码规则清空
          data.logisticsWebsite = ''; //物流码网址清空
        }
        data.codeRules = codeRules;
        /*排序规则*/
        let sortRules = '';
        if(data.serialNumberIncreasing){
          sortRules += data.serialNumberPrefix;
          sortRules += data.serialNumberIncreasing;
          sortRules += data.serialNumberSuffix;
        }
        if(data.serialNumberRepeatCount){
          sortRules += '(重复' + data.serialNumberRepeatCount + '次)';
        }
        data.transformSort = sortRules;
        /*码类型*/
        data.transformCodeType = codeType.join('、');
        data.transformFunctionType = functionType.join('、');
        data.transformBatchNumber = parseInt(data.batchNumber) / 10000 + '万';
        data.transformQueryType = this.queryTypeInit(data.queryType);
        data.transformTechCharacteristics = this.techCharacteristicsInit(data.techCharacteristics);
        if (data.isSupplement === '1') {
          this.isSupplement = '1';
        }
        if (data.emergencyDegree === '2') {
          this.emergencyDegree = '2';
        }
        return data;
      },
      queryTypeInit(queryType){
        let queryTypeArr = [];
        queryType = JSON.parse(queryType);
        queryType.forEach((p) => {
          switch (p) {
            case '1':
              queryTypeArr.push('拍照查询');
              break;
            case '2':
              queryTypeArr.push('电话查询');
              break;
            case '3':
              queryTypeArr.push('网站查询');
              break;
            case '4':
              queryTypeArr.push('短信查询');
              break;
          }
        });
        return queryTypeArr.join('、');
      },
      techCharacteristicsInit(data){
        let enums = this.enums['防伪技术特征'];
        let arr = [];
        data = data.split(',');
        data.forEach((p, i) => {
          for (let key in enums) {
            if (p === enums[key]) {
              arr.push(key);
            }
          }
        });
        return arr.join('、');
      },
      /*打印*/
      pageContentInit(data){
        let tbody = '';
        if (this.pageType === 'code') {
          this.codePreviewModel.forEach((p, index) => {
            tbody += '<tr><td style="height: 60px;line-height: 60px;width: 110px;text-align: center;">' + p + '</td>';
            data.forEach((item) => {
              if (this.codePreviewModelField[index] === 'transformQueryType') {
                tbody += '<td class="tag' + data.length + ' ' + ((JSON.parse(item['queryType']).length > 3 && data.length > 2) ? 'overQueryType' : '') + '">' + item[this.codePreviewModelField[index]] + '</td>';
              } else if (this.codePreviewModelField[index] === 'transformTechCharacteristics') {
                /*****防伪查询方式*****/
                let itemLength = item['techCharacteristics'].split(',').length;
                tbody += '<td class="tag' + data.length + ' ' + ((itemLength > 3 && data.length > 2) || (itemLength > 6) ? 'overQueryType' : '') + '">' + item['transformTechCharacteristics'] + '</td>';
              } else if (this.codePreviewModelField[index] === 'website') {
                /*****加网站*****/
                tbody += '<td class="tag' + data.length + ' overQueryType">' + item['antiFakeWebsite'] + '<br/>' + item['logisticsWebsite'] + '</td>';
              } else if (this.codePreviewModelField[index] === 'internetQueryText') {
                /*****语音查询*****/
                tbody += '<td class="tag' + data.length + ' overQueryType">' + item[this.codePreviewModelField[index]] + '</td>';
              } else {
                tbody += '<td class="tag' + data.length + '">' + item[this.codePreviewModelField[index]] + '</td>';
              }
            });
            tbody += '</tr>';
          });
        } else {
          this.machiningPreviewModel.forEach((p, index) => {
            tbody += '<tr><td style="height: 60px;line-height: 60px;width: 110px;text-align: center;">' + p + '</td>';
            data.forEach((item) => {
              if (this.machiningPreviewModelField[index] === 'transformQueryType') {
                tbody += '<td class="tag' + data.length + ' ' + ((JSON.parse(item['queryType']).length > 2 && data.length > 2) ? 'overQueryType' : '') + '">' + item[this.machiningPreviewModelField[index]] + '</td>';
              } else if (this.machiningPreviewModelField[index] === 'transformTechCharacteristics') {
                let itemLength = item['techCharacteristics'].split(',').length;
                tbody += '<td class="tag' + data.length + ' ' + ((itemLength > 3 && data.length > 2) || (itemLength > 6) ? 'overQueryType' : '') + '">' + item['transformTechCharacteristics'] + '</td>';
              } else {
                tbody += '<td class="tag' + data.length + '">' + item[this.machiningPreviewModelField[index]] + '</td>';
              }
            });
            tbody += '</tr>';
          });
        }
        return tbody;
      },
      tableTbodyInit(i){
        let render = [];
        this.previewPages.forEach((p) => {
          render.push(this.pageContentInit(p));
        });
        return render[i];
      },
      tableInit(i){
        let tbody = this.tableTbodyInit(i);
        let html = '<table border="1" bordercolor="#E5E9F2" cellspacing="0" class="table" style="width:740px;font-size: 14px;color: #475669;">' + tbody + '</table>';
        return html;
      },
      titleInit(data){
        let title = '<div style="font-size: 14px;color: #475669;"><div style="text-align: center;font-size: 18px;font-weight: bold;">' + (this.pageType === 'code' ? '生码单' : '防伪生产加工订单') + '</div><div style="margin:10px 0 10px;">订单号 <span style="margin-left: 10px;">' + this.orderCode + '</span></div><div style="margin-bottom: 20px;font-weight: bold;">防伪密码使用公司主体：' + data[0].corpName + '(' + data[0].corpID + ')</div></div>';
        return title;
      },
      footerInit(){
        let footer = '<div class="footer" style="width: 700px;margin: 10px auto;font-size: 14px;color: #475669;position: absolute;bottom: 140px;margin-left: -350px;left: 50%;"><div style="float: left;width: 50%;"><p>印刷工厂：' + this.previewPages[0][0].factoryName + '</p><p>传真：' + this.previewPages[0][0].factoryFax + '</p><p>法定代表人或代表：</p><p>日期：<span style="letter-spacing: 35px;margin-left: 35px;">年月日</span></p></div><div style="float: left;width: 50%;"><p>浙江甲骨文超级码科技股份有限公司（章）</p><p>传真：0571-88057010转883</p><p>法定代表人或代表：</p><p>日期：<span style="letter-spacing: 35px;margin-left: 35px;">年月日</span></p></div></div>';
        return footer;
      },
      imgInit(){
        let src = '';
        if (this.isSupplement === '1' && this.emergencyDegree === '1') {
          src = 'https://static.app315.net/resource/images/wuliudan/1.png';
        } else if (this.isSupplement === '0' && this.emergencyDegree === '2') {
          src = 'https://static.app315.net/resource/images/wuliudan/2.png';
        } else if (this.isSupplement === '1' && this.emergencyDegree === '2') {
          src = 'https://static.app315.net/resource/images/wuliudan/3.png'
        }
        return src;
      },
      startPrint(){
        this.LODOP = LODOP.getLodop();
        this.LODOP.PRINT_INIT('');
        this.previewPages.forEach((page, pageNumber) => {
          this.LODOP.SET_PRINT_PAGESIZE(1, 0, 0, 'A4');
          let title = this.titleInit(page);
          let footer = this.pageType === 'machining' ? this.footerInit() : '<div style="width: 80%;margin: 70px auto 0;text-align: right;">' + this.year + '年' + this.month + '月' + this.day + '日</div>';
          let html = this.tableInit(pageNumber);
          let img = this.imgInit();
          let style = '<style>body{font-family: "微软雅黑";position: relative;min-height: 900px;}.table tr td{text-align: center;}.table tr:nth-child(2n+1) td{background: #F9FAFC;}.table tr td.overQueryType{line-height: 20px;padding: 0px 5px;}.table tr td.tag1{width: 630px;}.table tr td.tag2{width: 315px;}.table tr td.tag3{width: 210px;}.table tr td.tag4{width: 157px;}.footer:after{content: "";display: block;clear: both;}</style>';
          let body = '<body>' + style + '<img src="' + img + '" alt="" style="position: absolute;width: 80px;right: 40px;top: 0px;z-index: 20;">' + title + html + footer + '</body>';
          this.LODOP.NewPage();
          this.LODOP.ADD_PRINT_HTM(1, 10, 800, 1200, body);
        });
        this.LODOP.PREVIEW();
      }
    },
    created(){
      this.orderCode = this.$route.query.orderCode;
      this.productionOrderID = this.$route.query.productionOrderID ? this.$route.query.productionOrderID : '';
      this.pageType = this.$route.query.type ? this.$route.query.type : '';
      this.acceptData();
    },
    mounted(){
      if (this.pageType === 'code') {
        document.title = '打印生码单【超级码】';
      } else {
        document.title = '打印加工单【超级码】';
      }
    }
  }
</script>
<style rel='stylesheet/less' lang='less' scoped>
  @import "../../../../../framework/src/assets/css/config";

  .el-carousel {
    overflow: hidden;
  }

  .cjm-edit-page {
    padding-bottom: 60px;
  }

  .cjm-page-bottom-bar {
    padding-bottom: 30px;
  }

  .preview-wrapper {
    padding: 10px 0;
  }

  .query-type {
    line-height: 30px;
    padding: 5px 10px 0;
  }

  .over-text {
    padding: 0px 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .preview {
    width: 790px;
    min-height: 950px;
    padding: 30px 30px 45px;
    margin: auto;
    box-shadow: 0px 0px 15px #cfcfcf;
    color: #475669;
    position: relative;
    .order-status {
      position: absolute;
      right: 10px;
      top: 10px;
    }
    .preview-title {
      font-size: 18px;
      text-align: center;
      font-weight: bold;
    }
    .order-code {
      width: 245px;
      font-size: 14px;
      .order-code-label {
        width: 50px;
        float: left;
        height: 36px;
        line-height: 36px;
      }
      .order-code-input {
        float: left;
        width: 190px;
      }
      & + p {
        font-size: 14px;
        margin: 18px 0;
      }
    }
    .table {
      font-size: 14px;
      ul li {
        float: left;
        &.label-name {
          width: 110px;
          .long {
            height: 120px;
            line-height: 120px;
          }
        }
        &.content {
          &.tag1 {
            width: calc(~'100% - 110px');
          }
          &.tag2 {
            width: calc(~'50% - 55px');
          }
          &.tag3 {
            width: calc(~'33.35% - 37px');
          }
          &.tag4 {
            width: calc(~'24.9% - 27px');
          }
          .lable-title {
            line-height: 30px;
            p:first-child {
              padding-top: 5px;
            }
          }
        }
        & > div {
          height: 60px;
          line-height: 60px;
          text-align: center;
          border-bottom: 1px solid @LightGray;
          border-right: 1px solid @LightGray;
          &:nth-child(2n+1) {
            background: @DarkWhite;
          }
          &:last-child {
            border-bottom: 0px;
          }
          .overQueryType {
            line-height: 20px;
            padding: 10px 15px 0;
          }
          &.website {
            line-height: 25px;
            padding-top: 10px;
            height: 50px;
            p {
              padding: 0 10px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
        &:last-child {
          & > div {
            border-right: 0;
          }
        }
        .tag-name {
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .note {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 5;
          height: 120px;
          line-height: 25px;
          text-align: left;
        }
      }
    }
    .table {
      table {
        tr {
          height: 60px;
          &:nth-child(2n+1) {
            background: @DarkWhite;
          }
        }
        td.table-title {
          width: 110px;
          text-align: center;
        }
        td {
          text-align: center;
        }
      }
    }
    .footer {
      width: calc(~'100% - 60px');
      padding: 10px 0px;
      position: absolute;
      bottom: 10px;
      & > div {
        width: calc(~'50% - 90px');
        float: left;
        &:first-child {
          padding: 0 30px 0 60px;
        }
        &:last-child {
          padding: 0 60px 0 30px;
        }
        p {
          margin: 10px 0;
        }
      }
    }
  }
</style>
<style rel='stylesheet/less' lang="less">
  #productionOrderPreview .el-carousel__indicator .el-carousel__button {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }
</style>

