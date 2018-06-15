<template>
  <div class="honghei">
    <companybox :toptitle="toptitle" listtype="3"></companybox>
  </div>
</template>

<script>
  import companybox from "@/base/companybox";
  // import redandblack from "./redandblack";
  export default {
    name: "HelloWorld",
    data() {
      return {
        toptitle: "红黑榜"
      };
    },
    components: {
      companybox
    },
    methods: {},
    created() {

    },
    mounted() {

    }
  };
</script>
<style lang="scss" scoped="" rel="stylesheet/scss">
  @import "static/style/_var.scss";
</style>
