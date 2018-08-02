<template>
  <div>
    <deliver-list v-if="page=='list'"></deliver-list>
    <detail v-if="page=='detail'"></detail>
  </div>
</template>
<script>
import deliverList from './list.vue';
import detail from './detail.vue';
export default {
  components: { deliverList, detail },
  data() {
    return {
      page: 'list'
    };
  },
  watch: {
    $route: function() {
      this.setViewPage();
    }
  },
  methods: {
    setViewPage() {
      const { id } = this.$route.query;
      if (id) {
        this.page = 'detail';
      } else {
        this.page = 'list';
      }
    }
  },
  mounted() {
    this.setViewPage();
  }
};
</script>
