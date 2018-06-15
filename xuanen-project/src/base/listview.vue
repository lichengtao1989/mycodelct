<template>
  <div class="listview">
    <div class="topt">{{toptitle}}</div>
    <listitem v-for="(item,index) in listInfoAry" :key="item.ArticleID" :iteminfo="item" :listtype="listtype"></listitem>
   
 </div>

</template>

<script>
import listitem from './listitem'


export default {
  props: {
    toptitle:{
      type:String,
      default:""
    },
    listtype:{
      type:Number,
      default:""
    },
    listInfoAry: {
      //信息
      type: Array,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      morePath: "",
      myindex: 0
       
    };
  },
  computed: {},
  components: {
   listitem
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>


<style lang="scss" scoped="" type="text/css">
@import "static/style/_var.scss";
.listview{
  @include ba(#fff);
  min-height: 675px;
  width:1179px;
  padding-left:19px;
  
 
  @include fo(15px);
  @include co(#2b2b2b);
  @include pr;
  .topt{
    padding-top: 9px;
    @include co(#128f40);
    padding-bottom:21px;
  }
}

</style>
