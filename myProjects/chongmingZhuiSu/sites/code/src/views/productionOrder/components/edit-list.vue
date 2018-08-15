<template>
  <div id="production-order-list-data">
    <cjm-scrollbar ref="scroll">
      <cjm-checkbox-group v-model="tagsSelected" @change="checkboxChange">
        <div class="list-item" v-for="(item, index) in listData" :key="index">
          <div class="list-item-title clear">
            <div class="left">
              <ul class="information clear">
                <li class="item-title-number">
                  <cjm-checkbox :disabled="item.status != -2 && item.status < 0 || item.orderStatus == -6" :label="index">{{++index}}</cjm-checkbox>
                </li>
                <li>
                  <cjm-popover placement="top-start" width="300" trigger="hover">
                    <div>{{item.tagName}}</div>
                    <div class="item-title-name" slot="reference">{{item.tagName}}</div>
                  </cjm-popover>
                </li>
                <li class="item-title-proportion" v-if="item.layerNumber === '2'">1:{{item.layer3Number}}</li>
                <li class="item-title-proportion" v-if="item.layerNumber === '3'">
                  1:{{item.layer2Number}}:{{item.layer3Number}}
                </li>
                <cjm-popover placement="top-start" width="300" trigger="hover">
                  <div>{{item.tagSpecifications}}</div>
                  <li class="item-title-specifications" slot="reference">规格：{{item.tagSpecifications}}</li>
                </cjm-popover>
              </ul>
            </div>
            <div class="right">
              <ul class="operate clear">
                <li>
                  <span style="color: #323232;" v-if="item.orderStatus == -6">已撤单</span>
                  <span style="color: #323232;" v-else>{{tagsStatus(item.status)}}</span>
                </li>
                <li v-if="item.orderStatus >= -2 && item.status >= -2">
                  <cjm-button @click="cancelOrder(item)" class="cjm-icon-reset"
                              power-code="productionOrderTagsCancelOrder" type="text"><span class="black"> 撤单</span>
                  </cjm-button>
                </li>
                <li v-if="item.status == -4">
                  <cjm-button class="cjm-icon-audit" @click="approve(item.id, index)"
                              power-code="productionOrderTagsApprove" type="text"><span class="black"> 审核</span>
                  </cjm-button>
                </li>
                <li>
                  <cjm-button v-if="totalTags < 30" @click="copy(item.id)" class="cjm-icon-copy"
                              power-code="productionOrderTagsCopy"
                              type="text"><span class="black"> 复制</span></cjm-button>
                </li>
                <li v-if="item.status == -5 || item.status == -3">
                  <cjm-button class="cjm-icon-edit" power-code="productionOrderTagsEdit" @click="edit(item.id)"
                              type="text"><span class="black"> 编辑</span></cjm-button>
                </li>
                <li v-if="(item.status != -2 && item.status < 0) || item.orderStatus == -6">
                  <cjm-button @click="deleteLabel(item.id, index)"
                              class="cjm-icon-delete"
                              power-code="productionOrderTagsDelete"
                              type="text"><span class="black"> 删除</span>
                  </cjm-button>
                </li>
              </ul>
              <div class="toggle-btn">
            <span class="cjm-icon-caret-down" :style="{'transform': item.isShowTagInformation ? 'rotate(180deg)': ''}"
                  @click="toggleClick(item, index)"></span>
              </div>
            </div>
          </div>
          <div class="list-item-content clear" :class="[item.isShowTagInformation ? 'on' : 'off']">
            <div class="left details">
              <ul>
                <li><span class="label">印刷工厂</span><span class="value">{{item.factoryName}}</span></li>
                <li><span class="label">紧急程度</span><span class="value">{{item.emergencyDegreeName}}</span></li>
                <li><span class="label">码功能</span><span class="value">{{item.labelType}}</span></li>
                <li><span class="label">码类型</span><span class="value">
              {{item.is18plus2 == '1' ? '18+20 ' : ''}}
              {{item.isMaShangTu == '1' ? '码上图 ' : ''}}
              {{item.isYZMQuery == '1' ? '17+4' : ''}}
              {{item.realTagImage == '2' ? 'π技术 ' : ''}}
              {{item.isSV == '1' ? 'SV码 ' : ''}}
              {{item.isPesticide == '1' ? '农药码 ' : ''}}
              {{item.is16plus20 == '1' ? '16+20 ' : ''}}
            </span></li>
                <li><span class="label">订单数量</span><span class="value">{{parseInt(item.batchNumber) / 10000}}万</span>
                </li>
                <li><span class="label">应用系统</span><span class="value">{{item.systemName}}</span></li>
                <li><span class="label">创建时间</span><span class="value">{{item.createTime}}</span></li>
              </ul>
            </div>
            <div class="left files clear">
              <div class="clear">
                <span class="picture-label left">防伪查询图片</span>
                <cjm-image-upload v-model="item.tagImage"
                                  @input="uploadImageSuccess(arguments[0], item.id)"
                                  class="picture-upload left"></cjm-image-upload>
              </div>
              <div class="upload-files">
                <cjm-upload multiple
                            name="Filedata"
                            :limit="1"
                            :action="uploadUrl"
                            :on-success="uploadSuccess.bind(this, item, index)"
                            :on-remove="removeSuccess.bind(this, item)"
                            :on-exceed="handleExceed"
                            :on-error="uploadError"
                            :before-upload="beforeUpload"
                            :file-list="fileList(item.attachment)">
                  <cjm-button size="small" type="primary"
                              :disabled="item.attachment ? JSON.parse(item.attachment).length >= 1 : false">上传附件
                  </cjm-button>
                </cjm-upload>
              </div>
            </div>
          </div>
        </div>
      </cjm-checkbox-group>
    </cjm-scrollbar>
  </div>
</template>
<script>
  import CjmImageUpload from '../../../../../../framework/src/components/base/image-upload/src/image-upload'
  import apiUrl from 'framework/config/apiUrl';
  import { pagination } from 'element-ui'
  import CjmButton from '../../../../../../framework/src/components/base/button/src/button'
  export default {
    components: {
      CjmButton,
      CjmImageUpload,
      'cjm-pagination': pagination
    },
    data(){
      return {
        image: '',
        uploadUrl: apiUrl.UPLOAD,
        enums: this.$globalData.get('code', 'enums'),
        printFactory: '',
        tagsSelected: []
      }
    },
    props: {
      listData: {
        type: Array
      },
      visible: {
        type: Boolean,
        uploadUrl: apiUrl.UPLOAD
      },
      labelIds: {
        type: Array
      },
      totalTags: {
        type: Number
      }
    },
    methods: {
      tagsStatus(status){
        switch (status) {
          case '-5':
            return '未提交';
          case '-4':
            return '待审核';
          case '-2':
            return '审核通过';
          case '-3':
            return '审核不通过';
          default:
            return '审核通过';
        }
      },
      deleteLabel(id, index){
        this.$confirm('确定要删除该标识吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            ids: [id],
            isProductionOrder: 1
          };
          this.$ajax.post(this.$globalData.get('code', 'apiUrl').productionOrder.DELETE_PRODUCTION_OREDER, params).then((res) => {
            if (res.resultCode === '200') {
              this.$message.success('删除成功!');
              this.listData.splice(index - 1, 1);
              this.$emit('totalTagsChange', this.totalTags - 1);
            }
          });
        });
      },
      checkboxChange(val){
        let factoryName = val.length > 0 ? this.listData[val[val.length - 1]].factoryName : '';
        this.printFactory = val.length > 0 ? this.listData[val[0]].factoryName : '';
        if (factoryName !== this.printFactory) {
          this.$message.warning('印刷工厂不同不能同时打印!');
          this.tagsSelected.pop();
          return false;
        }
      },
      toggleClick(item, index){
        item.isShowTagInformation = !item.isShowTagInformation;
        this.$set(this.listData, [index - 1], item);
      },
      edit(id){
        this.$emit('openEidtModel', id);
      },
      copy(id){
        this.$emit('openCopyModel', id);
      },
      approve(id, index){
        this.$emit('openApproveModel', {id: id, index: index});
      },
      view(id){
        this.$emit('openViewModel', id);
      },
      cancelOrder(item){
        let id = item.id;
        this.$confirm('确定要撤单吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            id: id,
            value: -6
          };
          this.$ajax.post(this.$globalData.get('code', 'apiUrl').productionOrder.CANCEL_ORDER, params).then((res) => {
            if (res.resultCode === '200') {
              this.$message.success('操作成功!');
              item.orderStatus = '-6';
            } else {
              this.$message.error(res.msg);
            }
          });
        });
      },
      fileList(files){
        return files !== '' ? JSON.parse(files) : [];
      },
      uploadSuccess(item, index, response, file, fileList){
        if (response.success) {
          let id = item.id;
          let files = [];
          fileList.forEach((p) => {
            let fileInfo = {};
            fileInfo.name = p.name;
            if (p.status === 'success' && p.response) {
              fileInfo.url = p.response.obj.Url;
            } else {
              fileInfo.url = p.url;
            }
            files.push(fileInfo);
          });
          let params = {
            id: id,
            value: JSON.stringify(files),
            type: 2
          };
          this.$ajax.get(this.$globalData.get('code', 'apiUrl').productionOrder.UPLOAD_FILES, params).then((res) => {
            if (res.resultCode === '200') {
              item.attachment = JSON.stringify(files);
              this.$set(this.listData, [index - 1], item);
            } else {
              this.$message.error(res.msg);
            }
          });
        }
      }, //附件上传成功
      removeSuccess(item, file, fileList){
        let files = [];
        let id = item.id;
        fileList.forEach((p) => {
          files.push({
            name: p.name,
            url: p.url
          });
        });
        item.attachment = JSON.stringify(files);
        let params = {
          id: id,
          value: item.attachment,
          type: 2
        };
        this.$ajax.get(this.$globalData.get('code', 'apiUrl').productionOrder.UPLOAD_FILES, params).then((res) => {
          if (res.resultCode !== '200') {
            this.$message.error(res.msg);
          }
        });
      }, //删除附件
      handleExceed(files, fileList){
        this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      uploadError(err, file, fileList){ //附件上传失败
        this.$message.error(err);
      },
      async beforeUpload(file, fileList){
        if (file.size > 40960000) {
          this.$message.warning('上传文件不得大于40M');
          this.$refs.upload.abort(file);
          throw new Error('上传文件太大');
        }
      },
      uploadImageSuccess(imgUrl, id){
        let params = {
          id: id,
          value: imgUrl,
          type: 1
        };
        this.$ajax.get(this.$globalData.get('code', 'apiUrl').productionOrder.UPLOAD_FILES, params).then((res) => {
          if (res.resultCode !== '200') {
            this.$message.error(res.msg);
          }
        });
      },
      sizeChange(){
        console.log(1)
      }
    },
    watch: {
      listData(val){
        val.map((p) => {
          if (p.systemCode === 'Agriculture') {
            p.systemName = '农产品系统';
          } else if (p.systemCode === 'SuperCode') {
            p.systemName = '超级码';
          } else {
            p.systemName = '独立系统';
          }
        });
      },
      tagsSelected(val){
        this.labelIds.splice(0, this.labelIds.length);
        if (val.length > 0) {
          val.map((p) => {
            this.labelIds.push(this.listData[p].id);
          });
        }
      }
    }
  }
</script>
<style rel='stylesheet/less' lang='less' scoped>
  @import "../../../../../../framework/src/assets/css/config";

  #production-order-list-data {
    height: 700px;
    overflow: auto;
  }

  .el-checkbox-group {
    font-size: medium;
  }

  .list-item {
    min-width: 850px;
    background: @DarkWhite;
    border: 1px solid #ededed;
    margin-bottom: 12px;
    .left {
      float: left;
    }
    .right {
      float: right;
      position: relative;
    }
    .list-item-title {
      padding: 15px 0;
      .item-number {
        width: 50px;
        text-align: center;
      }
      .information {
        li {
          float: left;
          &.item-title-number {
            margin-top: 2px;
            padding: 0 20px 0 10px;
            position: relative;
            span {
              padding-top: 5px;
              vertical-align: middle;
            }
            &:after {
              content: '';
              display: block;
              height: 35px;
              width: 1px;
              background: #f0f0f0;
              position: absolute;
              top: -7px;
              right: 7px;
            }
          }
          &.item-title-proportion {
            margin-top: 3px;
            margin-left: 25px;
          }
          &.item-title-specifications {
            margin-left: 25px;
            width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
      .operate {
        color: #20a0ff;
        margin-right: 50px;
        li {
          float: left;
          margin: 0 8px;
          cursor: pointer;
        }
      }
      .toggle-btn {
        color: #bfcbd9;
        position: absolute;
        right: 20px;
        top: 0px;
        cursor: pointer;
        &:after {
          content: '';
          display: block;
          width: 1px;
          height: 35px;
          background: #f0f0f0;
          left: -13px;
          top: -7px;
          position: absolute;
        }
      }
    }
  }

  .item-title-name {
    width: 220px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .list-item-content {
    border-top: 1px solid #ededed;
    height: 0px;
    overflow: hidden;
    transition: height 0.2s ease;
    &.on {
      height: 270px;
    }
    .details {
      width: 300px;
      padding: 10px 20px;
      ul li {
        margin: 12px 0;
        span {
          display: inline-block;
          font-size: 14px;
          &.label {
            color: #475669;
            text-align: right;
            margin-right: 20px;
            width: 60px;
          }
          &.value {
            color: #323232;
            text-align: left;
          }
        }
      }
    }
    .files {
      padding: 20px;
      .picture-label {
        margin-top: 30px;
        margin-right: 10px;
        font-size: 14px;
      }
    }

  }

</style>
<style rel="stylesheet/less" lang="less">
  #production-order-list-data {
    .upload-files {
      margin-top: 5px;
      .el-upload--text {
        float: left;
      }
      .el-upload-list {
        float: left;
        margin-left: 10px;
        li:first-child {
          margin-top: 0px;
        }
      }
    }
    .el-button--medium {
      padding: 0;
      font-size: 16px;
    }
  }
</style>
