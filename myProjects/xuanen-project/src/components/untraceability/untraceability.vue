<template>
  <div class="container">
<companybox :toptitle="toptitle" listtype="2"></companybox>
  
  </div>
</template>

<script>
import companybox from "@/base/companybox";
export default {

  data() {
    return {
     toptitle:"不可追溯企业"
    };
  },
  components: {
  companybox
    
  },
  methods: {
   
  },
  created() {
  
  },
  mounted() {
  
  }
};
</script>

<style lang="scss" scoped="" type="text/css">
@import "static/style/_var.scss";
</style>

