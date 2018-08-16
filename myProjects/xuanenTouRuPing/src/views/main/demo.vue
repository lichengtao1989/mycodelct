<template>
  <div>
    <nz-button type="text" @click="logout">退出</nz-button>
    <nz-datepicker v-model="val"></nz-datepicker>
    <nz-dialog ref="dialog" :okHandler="submit"></nz-dialog>
    <nz-button type="text" @click="showDialog">弹窗</nz-button>
    <nz-button type="text" @click="msg">msg</nz-button>
    <div>
      <nz-enum-select v-model="enumValue" :options="$enum('是否').values"></nz-enum-select>
      <br/>
      <nz-enum-select v-model="enumValue" is-radio :options="$enum('是否').values"></nz-enum-select>
      <br/>
      <span>{{enumValue}}</span>
    </div>
    <div>
      <nz-image-upload v-model="images" :maxNumber="5"></nz-image-upload>
      <span>{{images}}</span>
    </div>
    <div>
      <nz-remote-select remoteUrl="/Ashx/AutoComplete.ashx?function=LookupOrg" v-model="remoteVal"></nz-remote-select>
      <span>{{remoteVal}}</span>
    </div>
    <div>
      <nz-region-select v-model="regionval"></nz-region-select>
      <span>{{regionval}}</span>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        val: '',
        enumValue: '',
        remoteVal: '',
        regionval: '',
        images: []
      };
    },
    methods: {
      async submit(cbk){
        await this.$sleep(500);
        cbk();
        this.$refs.dialog.hide();
      },
      showDialog(){
        this.$refs.dialog.show();
      },
      async logout(){
        await this.$model('user').logout();
        this.$router.push('/login');
      },
      async msg(){
        this.$message.success('xxxx');
        await this.$sleep(500);
        this.$message.error('yyyyy');
        await this.$sleep(500);
        const result = await this.$message.confirm('xxxx');
        alert(result);
      }
    },
    created(){
    }
  }
</script>
