<template>
  <div>
    <deliver-list v-if="page=='list'"></deliver-list>
    <deliver v-if="page=='deliver'"></deliver>
  </div>
</template>
<script>
  import deliverList from './list.vue';
  import deliver from './deliver.vue';
  export default {
    components: {deliverList, deliver},
    data(){
      return {
        page: 'list'
      };
    },
    watch: {
      $route: function () {
        this.setViewPage();
      }
    },
    methods: {
      setViewPage(){
        const {id} = this.$route.query;
        if (id) {
          this.page = 'deliver';
        } else {
          this.page = 'list';
        }
      }
    },
    mounted(){
      this.setViewPage();
    }
  }
</script>
