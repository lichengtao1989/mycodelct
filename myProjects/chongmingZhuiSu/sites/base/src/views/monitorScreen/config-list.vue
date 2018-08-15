<template>
<div>
  <div class="monitor-config-panel">
    <ul class="monitor-config-list">
      <li class="monitor-config-item add-wrap-item" @click="addMonitor()">
        <div class="add-wrap">
          <a href="javascript:void(0);">
            <i class="cjm-icon-add add-icon"></i>
            <span class="add-text">配置数据屏</span>
          </a>
        </div>
      </li>
      <li class="monitor-config-item" v-for="(item ,key) in monitorConfigList" :key="key">
        <div class="datav-item">
          <img :src="item.imageUrl" class="datav-img">
          <div class="edit-masker">
            <a href="javascript:void(0);" class="datav-delete" @click="del(item)"><i class="cjm-icon-delete"></i></a>
            <cjm-button type="primary" class="datav-edit" @click="edit(item)">编辑</cjm-button>
          </div>
        </div>
        <div class="screen-name-tool">
          <a href="javascript:void(0);" class="edit-name-btn" @click=" showResetDataScreenNameDialog(item)"><i class="cjm-icon-edit edit-name-icon"></i><span class="edit-name-text">{{item.dataScreenName}}</span></a>
        </div>
        <div class="operate-tool">
          <cjm-button class="operate-tool-item" type="text" @click="copy(item)">
             <i class="cjm-icon-copy tool-icon"></i><span class="tool-name">复制</span>
          </cjm-button>
          <cjm-button class="operate-tool-item" type="text" @click="preview(item)">
            <i class="cjm-icon-preview tool-icon"></i><span class="tool-name">预览</span>
          </cjm-button>
          <!--<cjm-button class="operate-tool-item" type="text">
            <i class="cjm-icon-setting tool-icon"></i><span class="tool-name">设置</span>
          </cjm-button>-->
        </div>
      </li>
    </ul>
  </div>
  <cjm-dialog title="修改数据屏名称" :visible.sync="resetDataScreenNameDialog" :okHandler="resetDataScreenName">
    <cjm-form :model="operateObj" :rules="rules" ref="form" v-if="operateObj">
      <cjm-form-item label="数据屏名称" required prop="dataScreenName"><cjm-input placeholder="请输入大屏名称" v-model="operateObj.dataScreenName" :maxlength="40"></cjm-input></cjm-form-item>
    </cjm-form>
  </cjm-dialog>
</div>
</template>
<script>
import pageSwitch from 'framework/mixins/pageSwitch';
export default {
  mixins: [pageSwitch],
  data() {
    return {
      corpID: '',
      resetDataScreenNameDialog: false,
      monitorConfigList: [], //数据屏列表
      modifayObj: null, //需要修改的数据
      operateObj: null, //操作数据
      isTemplateConfig: false, //是否是配置模版
      rules: {
        dataScreenName: [this.$formRules.required]
      }
    }
  },
  methods: {
    addMonitor(){
      this.$parent.addDataVConfig(this.corpID, this.isTemplateConfig);
    },
    del(obj){
      this.$confirm('将要删除数据屏【' + obj.dataScreenName + '】, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$ajax.get(this.$globalData.get('base', 'apiUrl').monitorScreenConfig.DELETE, {configID: obj.configID}).then((r) => {
          if (r.resultCode == '200') {
            this.monitorConfigList.remove(obj);
            this.$message({
              message: '删除成功！',
              type: 'success'
            });
          }else {
            this.$message({
              message: r.msg,
              type: 'error'
            });
          }
        }).catch(() => {
          this.$message({
            message: '操作失败',
            type: 'error'
          });
        });
      });
    },
    copy(obj){
      const copyObj = {};
      copyObj.corpID = obj.corpID;
      copyObj.themeID = obj.themeID;
      copyObj.templateID = obj.templateID;
      copyObj.imageUrl = obj.imageUrl;
      copyObj.isTemplate = obj.isTemplate;
      copyObj.note = obj.note;
      copyObj.dataScreenName = obj.dataScreenName + '_副本';
      copyObj.componentsConfig = obj.componentsConfig;
      this.$ajax.post(this.$globalData.get('base', 'apiUrl').monitorScreenConfig.ADD_AND_MODIFY, copyObj).then((r) => {
        if (r.resultCode == '200') {
          copyObj.configID = r.data.configID;
          this.monitorConfigList.unshift(copyObj);
          this.$message({
            message: '恭喜你，拷贝成功！',
            type: 'success'
          });
        } else {
          this.$message({
            message: r.msg,
            type: 'error'
          });
        }
      }).catch(() => {
        this.$message({
          message: '操作失败',
          type: 'error'
        });
      });
    },
    showResetDataScreenNameDialog(obj, index){
      this.resetDataScreenNameDialog = true;
      this.modifayObj = obj;
      this.operateObj = Object.deepClone(obj);
    },
    resetDataScreenName(callback){
      this.$refs.form.validate(val => {
        if(val){
          this.$ajax.post(this.$globalData.get('base', 'apiUrl').monitorScreenConfig.ADD_AND_MODIFY, this.operateObj).then((r) => {
            if (r.resultCode == '200') {
              this.$message({
                message: '恭喜你，修改成功！',
                type: 'success'
              });
              this.modifayObj.dataScreenName = this.operateObj.dataScreenName;
              this.modifayObj = null;
              this.operateObj = null;
              this.resetDataScreenNameDialog = false;
            } else {
              this.$message({
                message: r.msg,
                type: 'error'
              });
            }
            callback();
          }).catch(() => {
            this.$message({
              message: '操作失败',
              type: 'error'
            });
            this.modifayObj = null;
            this.operateObj = null;
            callback();
          });
        } else {
          callback();
        }
      });
    },
    goToDataVMonitor(path, option){
      let url = this.$globalData.get('base', 'appConfig').monitorScreenConfigPage + path;
      this.$ajax.get(this.$globalData.get('base', 'apiUrl').monitorScreen.GET_MONITOR_TOKEN).then((r) => {
        if (r.resultCode == '200' && r.data) {
          url = url + '?token=' + r.data.token;
          if(option){
            for(let k in option){
              url = url + '&' + k + '=' + option[k];
            }
          }
          window.open(url);
        } else {
          this.$message.error(r.msg);
        }
      }).catch(() => {
        this.$message.error('失败,请重新尝试');
      });
    },
    edit(obj){
      this.goToDataVMonitor('/manage.html', {configID: obj.configID});
    },
    preview(obj){
      this.goToDataVMonitor('', {configID: obj.configID});
    }
  },
  created(){
    this.corpID = this.getPageParams('configList').id;
    this.isTemplateConfig = this.getPageParams('configList').isTemplateConfig;
    let getListData = {corpID: this.corpID, pageSize: 50};
    if(this.isTemplateConfig){
      getListData.isTemplate = 1;
    } else {
      getListData.isTemplate = 0;
    }
    this.$ajax.get(this.$globalData.get('base', 'apiUrl').monitorScreenConfig.CONFIG_LIST, getListData).then((r) => {
      if (r.resultCode == '200' && r.data) {
        this.monitorConfigList = r.data.rows;
      }
    });
  }
}
</script>
<style lang="less" scoped>
   .monitor-config-panel{
     background-color: #eee;
   }
   .monitor-config-list{
     margin-left: -20px;
     .monitor-config-item.add-wrap-item{
       display: table;
     }
     .add-wrap{
       width: 100%;
       height: 100%;
       vertical-align: middle;
       width: 100%;
       height: 100%;
       vertical-align: middle;
       display: table-cell;
       text-align: center;
     }
     .add-icon{
       font-size:90px;
       display: block;
       color:#a4b7d0;
     }
     .add-text{
       display: inline-block;
       margin-top: 10px;
       color:#000;
       font-size:16px;
     }
     .datav-edit{
       width: 106px;
       height:40px;
     }
     .monitor-config-item{
       width: 249px;
       height:249px;
       background: #fff;
       border:1px solid #f2f2f2;
       box-shadow: 0px 0px 5px 0px rgba(230, 230, 230, 0.75);
       float: left;
       margin-left: 20px;
       margin-bottom: 20px;
       .datav-item{
         width: 249px;
         height: 148px;
         position: relative;
         display: table;
         &:hover .edit-masker{
           display: block;
         }
       }
       .datav-img{
         width: 100%;
         height: 148px;
         display: block;
       }
       .datav-delete{
         font-size:18px;
         position: absolute;
         right:10px;
         top:10px;
         color:#fff;
         line-height: 0;
       }
       .edit-masker{
         width: 100%;;
         height:100%;
         line-height: 148px;
         position: absolute;
         top:0;
         left: 0;
         z-index:2;
         background-color: rgba(0,0,0,.5);
         text-align: center;
         display: none;
       }
       .screen-name-tool{
         height:52px;
         line-height: 52px;
         border-bottom:1px solid #eee;
         margin: 0 8px;
         .edit-name-btn{
           color:#000;
           font-size: 16px;
         }
         .edit-name-icon{
           color:#a4b7d0;
           font-size:22px;
           margin-right: 8px;
           vertical-align: middle;
         }
         .edit-name-text{
           vertical-align: middle;
           display:inline-block;
           width: 200px;
           height:18px;
           line-height: 18px;
           overflow: hidden;
           white-space: nowrap;
          text-overflow: ellipsis;
         }
       }
       .operate-tool{
         height:46px;
         line-height: 46px;
         margin: 0 8px;
         &-item{
           float: left;
           width: 50%;
           color:#a2a2a2;
           margin: 0;
           text-align: left;
         }
         .tool-icon{
           font-size:20px;
           margin-right: 5px;
           color:#a4b7d0;
           vertical-align: middle;
         }
         .tool-name{
           vertical-align: middle;
         }
       }
     }
   }
</style>
