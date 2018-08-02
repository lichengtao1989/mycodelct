<template>
  <div>
    <header>
      <img class="head-logo" src="/static/img/syslogo.png"/>
      <div class="welcome">
        <span class="head-link">{{userName}},欢迎回来</span>
        <nz-botton class="head-link" @click="logout"><i class="nz-icon-enable systemIcon"></i>退出</nz-botton>
      </div>
    </header>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        userName: ''
      };
    },
    methods: {
      async logout() {
        await this.$model('user').logout();
        this.$router.push('/login');
      }
    },
    async mounted() {
      if (this.$storage.get('userInfo')) {
        this.userName = this.$storage.get('userInfo').accountName;
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
    height: 50px;
    margin-top: 15px;
    margin-left: 28px;
  }

  .welcome {
    float: right;
    margin-right: 20px;
  }
</style>
