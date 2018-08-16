<template>
  <div>
    <header>
      <img v-if="sysLogo.type == 0" :src="sysLogo.image[0]" class="head-logo">
      <div v-if="sysLogo.type == 1" class="sys-logo">{{sysLogo.text}}</div>
      <div class="welcome">
        <span class="head-link">{{userName}},欢迎回来</span>
        <nz-botton class="qrcode">
          <i class="nz-icon-qrcode appIcon"></i>手机版
          <div class="qrcode-div">
            <img src="../../../static/img/qrcode.png" class="qrcode-img">
            <span>扫一扫下载安卓版APP</span>
          </div>
        </nz-botton>
        <nz-botton class="head-link" @click="logout">
          <i class="nz-icon-enable systemIcon"></i>退出</nz-botton>

      </div>
    </header>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userName: '',
      sysLogo: {
        type: '0',
        image: ['//nongzi.app315.net/static/img/syslogo.png'],
        text: '投入品流通溯源监管系统'
      }
    };
  },
  methods: {
    async logout() {
      let { err, res } = await this.$model('user').logout();
      if (res.resultCode == 200) {
        this.$router.push('/login');
      } else {
        this.$message.showError(err);
      }
    }
  },
  async mounted() {
    if (this.$storage.get('userInfo')) {
      this.userName = this.$storage.get('userInfo').mobile;
    }
  },
  created() {
    if (this.$storage.get('userInfo').role < 3) {
      if (this.$storage.get('configInfo').detail) {
        this.$storage.get('configInfo').detail.forEach(item => {
          if (item.itemName == 'sysLogo') {
            this.sysLogo = JSON.parse(item.itemValue);
          }
        });
      }
    }
  }
};
</script>

<style rel='stylesheet/less' lang='less' scoped>
header {
  width: 100%;
  height: 80px;
  background-color: #00a88a;
  .head-link {
    color: #fff;
    font-size: 16px;
    display: inline-block;
    vertical-align: top;
    margin-top: 33px;
    margin-left: 40px;
    margin-right: 10px;
    padding: 0;
    cursor: pointer;
    .systemIcon {
      font-size: 16px;
      margin-right: 10px;
      font-weight: 400;
    }
  }
}
.head-logo {
  height: 30px;
  margin-top: 25px;
  margin-left: 28px;
}
.welcome {
  float: right;
  margin-right: 20px;
  position: relative;
}
.sys-logo {
  font-size: 30px;
  color: #fff;
  font-weight: bold;
  padding-top: 20px;
  display: inline-block;
  margin-left: 28px;
}
.qrcode {
  width: 100px;
  height: 47px;
  padding-left: 20px;
  padding-top: 33px;
  color: #fff;
  font-size: 16px;
  display: inline-block;
  vertical-align: top;
  cursor: pointer;
  .appIcon {
    font-size: 16px;
    margin-right: 10px;
    font-weight: 400;
  }
}
.qrcode-div {
  position: absolute;
  display: none;
  top: 70px;
  left: 200px;
  width: 200px;
  height: 200px;
  background-color: #fff;
  transition: box-shadow 0.3s ease;
  border-radius: 5px;
  box-shadow: 0 0 8px #bbb;
  z-index: 20000000;
  text-align: center;
  .qrcode-img {
    width: 130px;
    margin: 25px 30px 5px 30px;
  }
  span {
    color: #333333;
    font-size: 14px;
    text-align: center;
    width: 200px;
  }
}
.qrcode:hover {
  background-color: #009479;
  .qrcode-div {
    display: block;
  }
}
</style>