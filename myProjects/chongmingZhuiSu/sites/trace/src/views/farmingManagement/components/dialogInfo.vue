<template>
  <!-- <div class="dialoglct">
    <cjm-button @click="newFn" v-for="item in baseAry" :key="item.name">{{item.name}}</cjm-button>
  </div> -->
  <cjm-dialog ref="dialogBox" class="mydialoglct farmingManagementMydialoglct" key="dialog1" :ok-handler="submit" :visible.sync="addResetDialogVisible" :title="dislogTitle" :size="sizeVal">
    <cjm-scrollbar style="height:500px;">
      <div class="dialoglct">
        <div @click="choiceFn(index,item)" :class="{activelct:index==myindex}" v-for="(item,index) in baseAry" :key="item.baseID" class="h47">
          {{item.baseName}}
          <div class="zuoyuan"></div>
          <div class="youjiantou">
            <i class="cjm-icon-confirm colct"></i>
          </div>
        </div>
      </div>
    </cjm-scrollbar>
    <div slot="footer">
      <cjm-button type="primary" @click="submit" :loading="importButtonLoading">
        <i class="cjm-icon-confirm"></i>下一步
      </cjm-button>
      <cjm-button @click="importCancel" :disabled="importButtonLoading">
        <i class="cjm-icon-close"></i>取消
      </cjm-button>
    </div>
  </cjm-dialog>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      importButtonLoading: false,
      baseID: '',
      myindex: null,
      dialogHeight: 580,
      addResetDialogVisible: false,
      sizeVal: 'small',
      dislogTitle: '选择基地',
      baseAry: [],
      baseInfo: {}
    };
  },
  methods: {
    nextFn() {},
    importCancel() {
      this.addResetDialogVisible = false;
    },
    choiceFn(idx, item) {
      this.myindex = idx;
      this.baseID = item.baseID;
      this.baseInfo = item;
    },
    async showList() {
      let url = this.$globalData.get('trace', 'apiUrl').FarmingManagement.BASEAREALIST;
      let dataObj = { pageSize: 15, pageNum: 1, status: 1 };
      let { err, res } = await this.$ajaxSync.post(url, dataObj);
      // console.log(err, res);
      if (err) {
        console.log(err);
      } else {
        this.baseAry = res.data.rows;
      }
    },
    async submit(callback) {
      if (this.baseID == '') {
        this.$message.error('请选择基地');
      } else {
        this.$emit('jumpNext', this.baseInfo);
        this.addResetDialogVisible = false;
      }

      // callback();
    },
    init() {
      // this.title = '添加';
      // this.form = Object.jsonClone(this.formModel);
      this.myindex = null;
      this.showList();
    },
    initEdit(data) {},
    show(data) {
      this.init();

      this.addResetDialogVisible = true;
    }
  },
  created() {}
};
</script>
<style rel='stylesheet/less' lang='less' scoped>
.dialoglct {
  width: 100%;
}
.colct {
  color: #409eff;
  display: none;
}
.activelct {
  background: #e5e9f2;
  .colct {
    display: block;
  }
}
.activelct::before {
  position: absolute;
  content: '';
  background: #e5e9f2;
  width: 50px;
  height: 100%;
  left: -50px;
  top: 0;
  z-index: 2;
}
.activelct::after {
  position: absolute;
  content: '';
  background: #e5e9f2;
  width: 50px;
  height: 100%;
  right: -50px;
  top: 0;
  z-index: 2;
}
.h47 {
  height: 47px;
  line-height: 47px;
  position: relative;
  box-sizing: border-box;
  padding-left: 51px;
  width: 100%;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.zuoyuan,
.youjiantou {
  position: absolute;
}
.zuoyuan {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #409eff;
  top: 20px;
  left: 33px;
}
.youjiantou {
  top: 14px;
  right: 0px;
}
</style>