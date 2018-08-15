<template>
  <!-- <div class="dialoglct">
    <cjm-button @click="newFn" v-for="item in baseAry" :key="item.name">{{item.name}}</cjm-button>
  </div> -->
  <cjm-dialog ref="dialogBox" class="mydialoglct farmingManagementMydialoglct" key="dialog1" :ok-handler="submit" :visible.sync="addResetDialogVisible" :title="dislogTitle">
    <div class="dialoglct">
      <span class="folct">类型:</span>
      <cjm-input v-model.trim="typeName" class="wlct1" placeholder="请输入" ref="inputpart"></cjm-input>
      <cjm-button @click="addFn" type="primary">添加</cjm-button>
    </div>
    <div class="linelct"></div>
    <div class="nextlist" v-if="baseAry.length>0">
      <div class="itemtype" v-for="(item,index) in baseAry" :key="item.farmingTypeId" @click="delFn(index,item.farmingTypeId)">
        {{item.typeName}}
        <span class="el-icon-close"></span>
      </div>
    </div>
  </cjm-dialog>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      typeName: '',
      form: {},
      dialogHeight: 580,
      addResetDialogVisible: false,
      sizeVal: 'small',
      dislogTitle: '农事类型',
      baseAry: []
    };
  },
  methods: {
    async addFn() {
      let url = this.$globalData.get('trace', 'apiUrl').FarmingManagement.TYPEADD;
      if (this.typeName == '') {
        this.$message.error('请输入农事类型');
        this.$refs.inputpart.focus();
      } else {
        let dataObj = { typeName: this.typeName };
        let { err, res } = await this.$ajaxSync.post(url, dataObj);
        if (err) {
          this.$message.error(res.msg);
        } else {
          if (res.resultCode == 200) {
            this.showList();
            this.typeName = '';
          } else {
            this.$message.error(res.msg);
          }
        }
      }
    },
    async delFn(idx, id) {
      // this.baseAry.splice(idx, 1);
      let url = this.$globalData.get('trace', 'apiUrl').FarmingManagement.TYPEDELETE;
      let dataObj = { id: id };
      let { err, res } = await this.$ajaxSync.post(url, dataObj);
      if (err) {
        console.log(err);
      } else {
        if (res.resultCode == 200) {
          this.showList();
        }
      }
    },
    choiceFn() {},
    async submit(callback) {
      let info = '';
      this.$emit('jumpNext', info);
      this.addResetDialogVisible = false;
      callback();
    },
    async showList() {
      let url = this.$globalData.get('trace', 'apiUrl').FarmingManagement.TYPELIST;
      let { err, res } = await this.$ajaxSync.post(url);
      // console.log(err, res);
      if (err) {
        console.log(err);
      } else {
        this.baseAry = res.data.rows;
      }
    },
    initEdit(data) {},
    show(data) {
      this.typeName = '';

      this.showList();
      // this.$refs.dialogBox.show();
      this.addResetDialogVisible = true;
    }
  },
  created() {}
};
</script>
<style rel='stylesheet/less' lang='less' scoped>
.dialoglct {
  font-size: 14px;
}
.wlct1 {
  display: inline-block;
  width: 80%;
}
.nextlist {
  padding-top: 23px;
}
.itemtype {
  display: inline-block;
  padding: 11px;
  background: #eff2f7;
  color: #475669;
  font-size: 13px;
  cursor: pointer;
  margin-right: 14px;
  margin-bottom: 14px;
  border-radius: 5px;
}
</style>