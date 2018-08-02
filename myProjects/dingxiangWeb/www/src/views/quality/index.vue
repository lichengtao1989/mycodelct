<template>
  <div class="newsindexout">
    <pagelist :typeVal="1"></pagelist>

  </div>
</template>
<script>
import pagelist from '@/components/pagelistnews';

export default {
  data() {
    return {};
  },
  components: {
    pagelist
  },
  methods: {},
  mounted() {
    // this.getList();
  }
};
</script>
<style rel='stylesheet/less' lang='less' scoped>
</style>
