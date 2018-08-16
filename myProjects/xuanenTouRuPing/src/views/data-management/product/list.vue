<template>
  <div>
    <nz-list :request-url="requestUrl" :need-advanced-search="true" :need-base-search="true" base-search-placeholder="商品名称、商品条码" ref="list" @selection-change="handleSelectionChange">
      <div slot="operate">
        <nz-button @click="productAdd" type="primary">
          <i class="nz-icon-add"></i>添加商品</nz-button>
        <nz-button @click="batchQrcodeDownload" class="nz-bottom-border">
          <i class="nz-icon-download"></i>商品二维码批量下载</nz-button>
      </div>
      <div slot="search">
        <nz-search-item label="商品名称" search-key="productName" v-model="search.productName">
          <nz-input v-model="search.productName"></nz-input>
        </nz-search-item>
        <nz-search-item label="商品条码" search-key="productBarCode" v-model="search.productBarCode">
          <nz-input v-model="search.productBarCode"></nz-input>
        </nz-search-item>
        <nz-search-item label="类别" search-key="category" v-model="search.category">
          <nz-enum-select v-model="search.category" :options="$enum('类别').values"></nz-enum-select>
        </nz-search-item>
        <nz-search-item label="类型" search-key="productType" v-model="search.productType">
          <nz-input v-model="search.productType"></nz-input>
        </nz-search-item>
      </div>
      <template slot="tableColumns">
        <nz-table-column type="selection" label="全选" width="55" fixed="left">
        </nz-table-column>
        <nz-table-column prop="productBarCode" width="100" label="商品二维码">
          <template slot-scope="scope">
            <nz-popover trigger="hover" visible-arrow="false" placement="right">
              <div class="print-qrcode-window">
                <div class="item-qrcode-top"><img :src="$apiUrl.COMMON.GET_QRIMAGE+'?data='+scope.row.productBarCode+'&size=140'" alt=""></div>
                <div class="item-qrcode-barcode">{{scope.row.productBarCode}}</div>
                <div class="item-qrcode-product">{{scope.row.productName}}</div>
                <div class="item-qrcode-specification" v-if="scope.row.packingSpecifications !=null">{{`${scope.row.packingSpecifications}${scope.row.packagingUnit}/${scope.row.packagingType}`}}</div>
                <nz-button @click="quickPrint(scope.row)" size="small" type="primary" class="quick-print">
                  <i class="nz-icon-print"></i>快速打印</nz-button>
                <nz-button @click="qrcodeDownload(scope.row)" size="small" class="nz-bottom-border qrcode-download">
                  <i class="nz-icon-download"></i>下载</nz-button>
              </div>
              <div slot="reference" class="name-wrapper">
                <i class="nz-icon-print-qrcode print-qrcode"></i>
              </div>
            </nz-popover>
          </template>
        </nz-table-column>
        <nz-table-column prop="productBarCode" width="150" label="商品条码" sortable="custom"></nz-table-column>
        <nz-table-column prop="productName" width="200" label="商品名称" sortable="custom"></nz-table-column>
        <nz-table-column prop="packingSpecifications" min-width="200" label="规格/包装" sortable="custom">
          <template slot-scope="scope">
            <div v-if="scope.row.packingSpecifications !=null">{{`${scope.row.packingSpecifications}${scope.row.packagingUnit}/${scope.row.packagingType}`}}</div>
          </template>
        </nz-table-column>
        <nz-table-column prop="category" min-width="200" label="类别" enum-name="类别" sortable="custom"></nz-table-column>
        <nz-table-column prop="productType" min-width="180" label="类型" sortable="custom"></nz-table-column>
        <nz-table-column prop="costUnitPrice" min-width="120" label="成本价" sortable="custom">
          <template slot-scope="scope">
            <div v-if="scope.row.costUnitPrice !=null">{{`¥${scope.row.costUnitPrice}`}}</div>
          </template>
        </nz-table-column>
        <nz-table-column prop="retailPrice" min-width="120" label="销售单价" sortable="custom">
          <template slot-scope="scope">
            <div v-if="scope.row.retailPrice !=null">{{`¥${scope.row.retailPrice}`}}</div>
          </template>
        </nz-table-column>
        <nz-table-column label="操作" width="250" fixed="right">
          <template slot-scope="scope">
            <nz-button type="text" @click="editBnt(scope.row.productId, scope.row.category)">编辑</nz-button>
            <nz-button type="text" @click="deleteStatus(scope.row.productId, scope.row.category)">删除</nz-button>
            <nz-button v-if="scope.row.status!='0'" type="text" @click="updateStatus(scope.row.productId, '0', scope.row.category)">禁用</nz-button>
            <nz-button v-if="scope.row.status=='0'" type="text" @click="updateStatus(scope.row.productId, '1', scope.row.category)" style="color:#4c4c4c;">启用</nz-button>
          </template>
        </nz-table-column>
      </template>
    </nz-list>
    <canvas id="preview" height="400" style="display: none" width="400"></canvas>
  </div>
</template>
<script>
import lodopFuncs from '../../../../static/print/lodopFuncs';
export default {
  data() {
    let apiUrl = this.$apiUrl.DATAMANAGEMENT;
    return {
      apiUrl: apiUrl,
      requestUrl: apiUrl.GET_LIST_PRODUCT,
      printQrcodeLink: '',
      LODOP: '',
      multipleSelection: [],
      oCanvas: '', // canvas对象
      ctx: '', // 人称上下文
      search: {
        productName: '',
        productBarCode: '',
        category: '',
        productType: ''
      }
    };
  },
  watch: {},
  methods: {
    async editBnt(productId, category) {
      this.$router.push({ path: '/main/productEdit', query: { productId: productId, category: category } });
    },
    //添加商品
    async productAdd() {
      this.$router.push({ path: '/main/productEdit' });
    },
    async deleteStatus(row, category) {
      let data = {
        productId: row
      };
      let url = '';
      switch (category) {
        case '1':
          url = this.apiUrl.DELETE_PRODUCT_PESTICIDE;
          break;
        case '2':
          url = this.apiUrl.DELETE_PRODUCT_SEEDS;
          break;
        case '3':
          url = this.apiUrl.DELETE_PRODUCT_FERTILIZER;
          break;
        case '4':
          url = this.apiUrl.DELETE_PRODUCT_OTHER;
          break;
      }
      let msg = await this.$message.confirm('确定要删除吗');
      if (msg) {
        let { err, res } = await this.$model('dataManagement').commonfn(url, data);
        if (res.resultCode == 200) {
          this.$refs.list.refresh();
        } else {
          this.$message.showError(err);
        }
      }
    },
    async updateStatus(row, status, category) {
      let data = {
        productId: row
      };
      let url = '';
      switch (category) {
        case '1':
          url = this.apiUrl.SET_STATUS_PRODUCT_PESTICIDE;
          break;
        case '2':
          url = this.apiUrl.SET_STATUS_PRODUCT_SEEDS;
          break;
        case '3':
          url = this.apiUrl.SET_STATUS_PRODUCT_FERTILIZER;
          break;
        case '4':
          url = this.apiUrl.SET_STATUS_PRODUCT_OTHER;
          break;
      }
      if (status == 0) {
        let msg = await this.$message.confirm('确定要禁用吗');
        if (msg) {
          let { err, res } = await this.$model('dataManagement').commonfn(url, data);
          if (res.resultCode != 200) {
            this.$message.showError(err);
          }
        }
      } else {
        let { err, res } = await this.$model('dataManagement').commonfn(url, data);
        if (res.resultCode != 200) {
          this.$message.showError(err);
        }
      }
      this.$refs.list.refresh();
    },
    //快速打印
    quickPrint(row) {
      this.LODOP = lodopFuncs.getLodop();
      this.LODOP.PRINT_INIT('');
      this.LODOP.SET_PRINT_MODE('WINDOW_DEFPRINTER');
      let l = '<table style="border-collapse: separate;border-spacing: 1pt 0;width:48mm;">';
      l += `<tr><td align="center" style="padding-top:3pt"><img width="80" height="80" src=http://${window.location.host}${this.$apiUrl.COMMON.GET_QRIMAGE}?data=${row.productBarCode}&size=80'></td></tr>`;
      l += `<tr><td align="center" style="padding-top:3pt;font-size: 12px;
  color: #999999;">${row.productBarCode}</td></tr>`;
      l += `<tr><td align="center" style="padding-top:3pt;font-size: 16px;color: #333333;font-weight: bold;">${row.productName}</td></tr>`;
      l += `<tr><td align="center" style="padding-top:3pt;font-size: 14px;color: #333333;">${row.packingSpecifications}${row.packagingUnit}/${row.packagingType}</td></tr>`;
      l += `<tr><td align="center" style="padding-top:5pt"></td></tr>`;
      l += '</table>';
      this.LODOP.ADD_PRINT_HTM(7, 0, '100%', '100%', l);
      //this.LODOP.ADD_PRINT_IMAGE(7, 0, '100%', '100%', r);
      this.LODOP.SET_PRINT_PAGESIZE(3, '58mm', 45, '');
      this.LODOP.PRINT();
    },
    //初始化canvas
    canvasInit() {
      this.oCanvas = document.getElementById('preview');
      this.ctx = this.oCanvas.getContext('2d');
      this.oCanvas.height = '400';
      this.oCanvas.width = '400';
    },
    //下载二维码
    async qrcodeDownload(row) {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      month = month >= 1 && month < 10 ? '0' + month : month;
      strDate = strDate >= 0 && strDate < 10 ? '0' + strDate : strDate;
      this.ctx.clearRect(0, 0, 400, 400);
      var img = new Image();
      img.src = `http://${window.location.host}${this.$apiUrl.COMMON.GET_QRIMAGE}?data=${row.productBarCode}&size=140`;
      this.ctx.drawImage(img, 120, 100, 140, 140);
      this.ctx.fillStyle = '#ffffff';
      this.ctx.textAlign = 'center';
      this.ctx.font = '12px Arial';
      this.ctx.fillText(row.productBarCode, 200, 260);
      this.ctx.font = 'bold 16px Arial';
      this.ctx.fillText(row.productName, 200, 280);
      this.ctx.font = '14px Arial';
      let packagingUnit = `${row.packingSpecifications}${row.packagingUnit}/${row.packagingType}`;
      this.ctx.fillText(packagingUnit, 200, 300);
      var imgData = this.oCanvas.toDataURL('image/jpeg', 1.0);
      var filename = row.productName + year + '-' + month + '-' + strDate + '.jpg';
      this.saveFile(imgData, filename);
    },
    saveFile(data, filename) {
      let saveLink = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
      saveLink.href = data;
      saveLink.download = filename;

      var event = document.createEvent('MouseEvents');
      event.initMouseEvent('click', true, false);
      saveLink.dispatchEvent(event);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //批量下载
    batchQrcodeDownload() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      month = month >= 1 && month < 10 ? '0' + month : month;
      strDate = strDate >= 0 && strDate < 10 ? '0' + strDate : strDate;
      this.oCanvas.height = Math.floor(this.multipleSelection.length / 3) * 220;
      this.oCanvas.width = '592';
      this.ctx.clearRect(0, 0, 592, Math.floor(this.multipleSelection.length / 3) * 220);
      for (let index = 0; index < this.multipleSelection.length; index++) {
        const item = this.multipleSelection[index];
        let multiple = parseInt(index) % 3;
        let xAxis = 180;
        let yAxis = 0;
        if (Math.floor(index / 3)) {
          yAxis = 220 * Math.floor(index / 3);
        }
        var img = new Image();
        img.src = `http://${window.location.host}${this.$apiUrl.COMMON.GET_QRIMAGE}?data=${item.productBarCode}&size=140`;
        this.ctx.drawImage(img, 180 * multiple + 40, yAxis, 100, 100);
        this.ctx.fillStyle = '#ffffff';
        this.ctx.textAlign = 'center';
        this.ctx.font = '12px Arial';
        this.ctx.fillText(item.productBarCode, xAxis * multiple + 80, yAxis + 130);
        this.ctx.font = 'bold 16px Arial';
        this.ctx.fillText(item.productName, xAxis * multiple + 80, yAxis + 150);
        this.ctx.font = '14px Arial';
        let packagingUnit = `${item.packingSpecifications}${item.packagingUnit}/${item.packagingType}`;
        this.ctx.fillText(packagingUnit, xAxis * multiple + 80, yAxis + 170);
      }
      var imgData = this.oCanvas.toDataURL('image/jpeg', 1.0);
      var filename = '商品二维码' + year + '-' + month + '-' + strDate + '.jpg';
      this.saveFile(imgData, filename);
    }
  },
  created() {
    this.$eventBus.$emit('titleName', '商品管理');
  },
  mounted() {
    let self = this;
    this.canvasInit();
    setTimeout(function() {
      self.LODOP = lodopFuncs.getLodop();
      if (self.LODOP == null || typeof self.LODOP.VERSION == 'undefined') {
        self.receiptdisabled = true;
      }
    }, 1000);
  }
};
</script>
<style rel='stylesheet/less' lang='less' scoped>
.print-qrcode {
  font-size: 26px;
  cursor: pointer;
}
.print-qrcode-window {
  width: 260px;
  height: 296px;
}
.print-qrcode-link {
}
.item-qrcode-top {
  padding: 28px 60px 5px 60px;
  margin: 0 auto;
}
.item-qrcode-barcode {
  text-align: center;
  font-size: 12px;
  color: #999999;
}
.item-qrcode-product {
  text-align: center;
  font-size: 16px;
  color: #333333;
  font-weight: bold;
}
.item-qrcode-specification {
  text-align: center;
  font-size: 14px;
  color: #333333;
}
.quick-print {
  margin: 20px 0px 0 30px;
}
.qrcode-download {
  float: right;
  margin: 20px 20px 0 0px;
  padding-right: 20px;
}
canvas {
  top: 0;
  left: 0;
}
</style>