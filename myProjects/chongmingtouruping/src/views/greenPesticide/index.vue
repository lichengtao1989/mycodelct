<template>
  <div>
    <list v-if="page=='list'"></list>
    <detail v-if="page=='detail'"></detail>
  </div>
</template>
<script>
import list from './list.vue';
import detail from './detail.vue';
export default {
  components: { list, detail },
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
      // const { id } = this.$route.query;
      const { type } = this.$route.query;
      if (type) {
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
