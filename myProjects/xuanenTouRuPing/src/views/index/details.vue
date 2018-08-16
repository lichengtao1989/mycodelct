<template>
  <nz-scrollbar ref="scrollbar" style="height:500px;">
    <div class="nz-page-wrap">
      <div class="page-content">
        <div class="xqwrap">
          <div class="mytitle">{{form.title}}</div>
          <div class="fbxx">
            <div class="fbsm">
              <span class="spp1">
                <i class="nz-icon-time content-time"></i>
                <span>{{form.lastUpdateTime}}</span>
                <i class="nz-icon-acount content-account"></i>
                <span>管理员</span>
              </span>
            </div>
          </div>
          <div class="content" v-html="form.content">
          </div>
        </div>
      </div>
    </div>
  </nz-scrollbar>
</template>
<script>
export default {
  data() {
    let apiUrl = this.$apiUrl.NEWMANAGEMENT;
    return {
      apiUrl: apiUrl,
      isRegister: false,
      loadData: false,
      module: 2,
      directoryID: '',
      form: {}
    };
  },
  methods: {
    async editFrom(newId) {
      this.reset();
      let data = {
        id: newId
      };
      let { err, res } = await this.$model('dataManagement').commonfn2(this.apiUrl.GET, data);
      if (res.resultCode == 200) {
        this.form = res.data;
      } else {
        this.$message.showError(err);
      }
    },
    reset() {
      this.form = {
        newID: '',
        module: 2,
        type: '',
        title: '',
        content: '',
        lastUpdateTime: ''
      };
    },
    close() {
      window.close();
    }
  },
  mounted() {}
};
</script>
<style rel='stylesheet/less' lang='less' scoped>
img {
  width: 100%;
}
.page-content {
  margin: 0 auto;
  max-width: 1200px;
  background-color: #ffffff;
}
.xqwrap {
  background-color: #ffffff;
  min-height: 500px;
  .mytitle {
    text-align: center;
    padding-top: 15px;
    font-size: 24px;
    font-weight: bold;
    margin: 0 20px;
  }
  .content {
    margin: 0 auto;
    width: 878px;
    line-height: 31px;
    text-indent: 32px;
    overflow: hidden;
  }
}
.fbsm {
  text-align: center;
  color: #cecece;
  font-size: 12px;
  padding: 10px 0 30px 0;
}
.content-time {
  font-size: 12px;
  color: #cecece;
}
.content-account {
  font-size: 12px;
  color: #cecece;
  padding-left: 10px;
}
.open-nz-h1 {
  margin: 0 auto;
  max-width: 1200px;
  padding: 100px 0px 15px 15px;
}
.open-nz-h1:before,
.open-nz-h2:before {
  float: left;
  content: '';
  width: 5px;
  height: 21px;
  background: #00a88a;
  margin-right: 12px;
}

.open-nz-h1:after,
.open-nz-h2:after {
  display: block;
  content: '';
  clear: both;
}
.new-close {
  margin: 0 auto;
  text-align: center;
  padding: 50px 0;
}
</style>
<style rel='stylesheet/less' lang='less'>
.nz-page-wrap img {
  width: 100%;
}
</style>