<template>
  <div>
    <div class="template-panel">
      <div class="template-head">模板选择</div>
      <ul class="template-list" :style="'height:'+ leftPanelHeight">
        <li class="template-item" :class="{'active':form.templateID=='1'}" @click="selectTemplate()">
          <span class="template-item-name">{{defaultTemplate.dataScreenName}}</span>
          <img src="../../assets/images/screen-bg1.jpg" class="template-item-img">
        </li>
        <li class="template-item" v-for="(item, index) in templateList"  :key="index" :class="{'active':form.templateID==item.configID}" @click="selectTemplate(item)">
          <span class="template-item-name">{{item.dataScreenName}}</span>
          <img :src="item.imageUrl" class="template-item-img">
        </li>
      </ul>
    </div>
    <div class="datav-screen" :style="'height:'+ rightPanelHeight">
      <div class="datav-screen-display" :style="displayStyle">
        <img :src="form.imageUrl" :style="'width:' + screenWidth + ';height:' + screenHeight" v-if="form.imageUrl || form.imageUrl == ''">
        <img  src="../../assets/images/screen-bg1.jpg"  :style="'width:' + screenWidth + ';height:' + screenHeight" v-if="!form.imageUrl && form.imageUrl != ''">
        <p class="datav-screen-bottom"><cjm-button type="primary" @click = "createScreen()">创建数据屏</cjm-button></p>
      </div>
    </div>
    <cjm-dialog title="创建数据屏" :visible.sync="createScreenDialogView" :okHandler="dialogConfirm">
       <cjm-form :model="form" :rules="rules" ref="form">
         <cjm-form-item label="数据屏名称" required prop="dataScreenName"><cjm-input placeholder="请输入大屏名称" v-model="form.dataScreenName" :maxlength="40"></cjm-input></cjm-form-item>
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
      templateList: [], //模版列表
      defaultTemplate: {
        configID: 1,
        dataScreenName: '空白模版'
      },
      selectedTemplate: null,
      form: {
        configID: '',
        corpID: '',
        themeID: '',
        templateID: 1,
        dataScreenName: '',
        imageUrl: '',
        isTemplate: '',
        note: ''
      },
      rules: {
        dataScreenName: [this.$formRules.required]
      },
      leftPanelHeight: '',
      rightPanelHeight: '',
      screenWidth: '',
      screenHeight: '',
      createScreenDialogView: false
    }
  },
  computed: {
    displayStyle(){
      const height = parseInt(this.screenHeight) + 80;
      return {
        width: this.screenWidth,
        height: height + 'px',
        position: 'absolute',
        left: '50%',
        top: '50%',
        marginTop: -height / 2 + 'px',
        marginLeft: -parseInt(this.screenWidth) / 2 + 'px'
      }
    }
  },
  methods: {
    resetPanel(){
      this.leftPanelHeight = window.innerHeight - 200 + 'px';
      this.rightPanelHeight = window.innerHeight - 163 + 'px';
      const displayWidth = window.innerWidth - 600;
      const displayHeight = parseInt(this.rightPanelHeight);
      if(displayWidth / displayHeight < (16 / 10)){
        this.screenWidth = displayWidth - 80 + 'px';
        this.screenHeight = parseInt(this.screenWidth) / 16 * 9 + 'px';
      } else {
        this.screenHeight = displayHeight - 120 + 'px';
        this.screenWidth = parseInt(this.screenHeight) / 9 * 16 + 'px';
      }
    },
    selectTemplate(template){
      if(template){
        this.selectedTemplate = template;
      } else {
        this.selectedTemplate = this.defaultTemplate;
      }
      this.form.templateID = this.selectedTemplate.configID;
      this.form.imageUrl = this.selectedTemplate.imageUrl;
      this.form.componentsConfig = this.selectTemplate.componentsConfig;
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
    createScreen(){
      this.createScreenDialogView = true;
      this.form.dataScreenName = '';
    },
    dialogConfirm(callback){
      this.$refs.form.validate(val => {
        if(val){
          const form = Object.deepClone(this.form);
          form.componentsConfig = this.selectedTemplate.componentsConfig;
          form.themeID = this.selectedTemplate.themeID;
          form.imageUrl = this.selectedTemplate.imageUrl;
          this.$ajax.post(this.$globalData.get('base', 'apiUrl').monitorScreenConfig.ADD_AND_MODIFY, form).then((r) => {
            if (r.resultCode == '200') {
              this.$message({
                message: '数据屏【' + this.form.dataScreenName + '】创建成功！',
                type: 'success'
              });
              const configID = r.data.configID;
              this.goToDataVMonitor('/manage.html', {configID: configID});
              this.popPage();
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
          });
        } else {
          callback();
        }
      });
    }
  },
  mounted(){
    this.resetPanel();
    window.onresize = () => {
      this.resetPanel();
    };
  },
  destroyed(){
    window.onresize = '';
  },
  created(){
    this.form.corpID = this.getPageParams('addConfig').id;
    let isAddTemplate = this.getPageParams('addConfig').isAddTemplate;
    this.selectTemplate();
    if(!isAddTemplate){
      this.form.isTemplate = 0;
      this.$ajax.get(this.$globalData.get('base', 'apiUrl').monitorScreenConfig.GET_COMPONENT_LIST, {}).then((r) => {
        if (r.resultCode == '200' && r.data) {
          this.templateList = r.data.rows;
        }
      });
    } else {
      this.form.isTemplate = 1;
    }
  }
}
</script>
<style lang="less" scoped>
.datav-screen{
  margin-left:210px;
  border:1px solid #f2f2f2;
  box-shadow: 0px 0px 5px 0px rgba(230, 230, 230, 0.75);
  box-sizing: content-box;
  padding:0 40px;
  overflow-y: auto;
  position: relative;
  &-bottom{
    text-align: right;
    padding: 20px 0;
  }
}
.template-panel{
  width: 180px;
  border:1px solid #f2f2f2;
  box-shadow: 0px 0px 5px 0px rgba(230, 230, 230, 0.75);
  float: left;
  .template-head{
    font-size:14px;
    text-align: center;
    height: 36px;
    line-height: 36px;
    border-bottom:1px solid #f2f2f2;
  }
  .template-list{
    overflow-y: auto;
  }
  .template-item{
    height:158px;
    cursor: pointer;
    &:hover,&.active{
      background-color:#eff5f8;
    }
    &-name{
      font-size:14px;
      color:#373737;
      text-align: center;
      padding-top: 20px;
      padding-bottom: 10px;
      display: block;
      width: 180px;
      height:20px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    &-img{
      width: 137px;
      height: 90px;
      display: block;
      margin: 0 auto;
    }
  }
}
</style>
