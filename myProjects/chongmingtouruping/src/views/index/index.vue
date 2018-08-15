<template>
  <div>
    <!--区农委首页-->
    <role1-index v-if="role==1"></role1-index>
    <!--农户首页-->
    <role2-index v-if="role==2"></role2-index>
    <!--农资店首页-->
    <role3-index v-if="role==3"></role3-index>
    <!--总经销商首页-->
    <role4-index v-if="role==5"></role4-index>
  </div>
</template>
<script>
  import role2Index from './role2/index.vue';
  const role1Index = () => import(/* webpackChunkName: "/modules/index/role1/index" */ './role1/index.vue');
  //const role2Index = () => import(/* webpackChunkName: "/modules/index/role2/index" */ './role2/index.vue');
  const role3Index = () => import(/* webpackChunkName: "/modules/index/role3/index" */ './role3/index.vue');
  const role4Index = () => import(/* webpackChunkName: "/modules/index/role5/index" */ './role5/index.vue');
  export default {
    components: {role1Index, role2Index, role3Index, role4Index},
    data(){
      return {
        role: null
      };
    },
    mounted(){
      const userInfo = this.$storage.get('userInfo');
      this.role = userInfo.role;
      //this.role = 4;
    }
  }
</script>
