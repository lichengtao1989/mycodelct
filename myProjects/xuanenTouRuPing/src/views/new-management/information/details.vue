<template>
  <div class="nz-page-wrap">
    <div class="nz-head">
      <div class="nz-head-content">
        <div class="nz-head-logo">
          <img src="/static/img/syslogo.png">
        </div>
      </div>
    </div>
    <div class="open-nz-h1">{{titleName}}</div>
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
        <div class="new-close">
          <nz-button @click="close()">
            <i class="nz-icon-close"></i>
            关闭
          </nz-button>
        </div>
      </div>
    </div>
  </div>

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
      titleName: '农技知识',
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
  mounted() {
    let query = this.$route.query || {};
    this.directoryID = query.id;
    this.module = query.module;
    if (this.module == 2) {
      this.titleName = '农技知识';
    } else if (this.module == 1) {
      this.titleName = '系统通知';
    } else {
      this.titleName = '农技新闻';
    }
    this.editFrom(this.directoryID);
  }
};
</script>
<style rel='stylesheet/less' lang='less' scoped>
body {
  padding: 0;
  margin: 0;
  background-color: #f0f0f0;
  min-width: 1200px;
}
h1 {
  color: #00a88a;
  font-size: 30px;
  font-weight: lighter;
}
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
  min-height: 850px;
  .mytitle {
    text-align: center;
    padding-top: 35px;
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
    img {
      width: 100%;
    }
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
body,
html {
  height: 100%;
}

body {
  box-sizing: border-box;
  background-color: #f0f0f0;
}
.nz-page-wrap {
  position: relative;
  min-height: 100%;
  box-sizing: border-box;
  background-color: #f0f0f0;
  img {
    width: 100%;
  }
  .nz-head {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 80px;
    line-height: 80px;
    color: #fff;
    background: #00a88a;
  }

  .nz-head-content {
    margin: 0 auto;
    max-width: 1200px;
  }

  .nz-head-logo {
    height: 45px;
    line-height: 45px;
    overflow: hidden;
    padding: 15px 0 0 0px;
    font-size: 28px;
    max-width: 550px;
    cursor: pointer;

    img {
      height: 100%;
    }
  }

  .el-tabs {
    margin: 0 20px;
  }

  .el-tabs__header {
    margin-bottom: 0;
  }
}

.nz-page-router-wrap {
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  background: #eee;
}

.nz-page-router {
  position: relative;
  min-height: 100%;
  box-sizing: border-box;
  max-width: 1200px;
  margin: 0 auto;
  background: #fff;
  box-shadow: 0 0 5px #ccc;

  .nz-form {
    .el-form-item {
      margin-bottom: 28px;
    }
  }
}
</style>
