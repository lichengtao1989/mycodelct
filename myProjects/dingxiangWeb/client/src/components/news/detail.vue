<template>
  <div class="container">

  detail
  </div>
</template>

<script>
// import top from "./resource/top";


export default {
  name: "HelloWorld",
  data() {
    return {
      endflag: false,
      msg: "Welcome to Your Vue.js App"
    };
  },
  components: {
    // top
    
  },
  methods: {
   
  },
  created() {
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    var h = document.documentElement.clientHeight || document.body.clientHeight;
    console.log(this.$route);
  },
  mounted() {
  
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="" type="text/css">
$base:14px;
body{
  font-size: $base;
}
</style>
