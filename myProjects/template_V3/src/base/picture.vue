<template>
 <div class="picture">
  
 </div>
</template>

<script>
import svgBar from "svg-progress-bar";
export default {
  props: {
  
  },
  data: function() {
    return {
      value: 15
    };
  },
  components: {
    svgBar
  },
  computed: {
    options() {
      return {
        circleWidth:4,
        radius:55,
        pathColors: ['#eee','#a2ca43'],
        text: function(value) {
          return "";
        },
        textColor: "rgb(33, 150, 243)"
      };
    }
  }
};
//小圆圈用一个div+span 通过旋转角度实现 宽高要对应好
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/style/_var.scss";
$base: 75;
.picture {
 
}
</style>

