<template>
  <div class="number-box">
    <div class="icon-wrap">
      <div class="icon" :style="'background-color: '+iconColor">
        <i :class="icon" class="class-font" :style="'font-size:'+iconFontSize+'px;padding-top:'+iconFontTop+'px'" />
      </div>
    </div>
    <div class="number" :style="'font-size:'+numberFontSize+'px;top:'+numberTop+'px'">{{ number }}</div>
    <div class="describe" :style="'font-size:'+describeFontSize+'px;top:'+describeTop+'px'">{{ describe }}</div>
  </div>
</template>
<script>
export default {
  props: {
    icon: String, //logo地址
    iconColor: String, //logo背景色
    number: Number, //数字
    describe: String //描述
  },
  data() {
    return {
      boxWidth: 0
    };
  },
  computed: {
    //数字字体大小
    numberFontSize() {
      let fz = 32;
      fz = fz * (this.boxWidth / 400);
      fz = parseInt(fz);
      return fz;
    },
    //描述文字字体大小
    describeFontSize() {
      let fz = this.numberFontSize / 2;
      fz = parseInt(fz);
      return fz;
    },
    //数字top
    numberTop() {
      let top = (this.boxWidth * 0.23 - (this.numberFontSize + 10 + this.describeFontSize)) / 2;
      top = parseInt(top);
      return top;
    },
    //描述文字top
    describeTop() {
      let top = this.numberTop + this.numberFontSize + 10;
      return top;
    },
    //图标字体大小
    iconFontSize() {
      let fz = 50;
      fz = fz * (this.boxWidth / 400);
      fz = parseInt(fz);
      return fz;
    },
    //图标top
    iconFontTop() {
      let top = (this.boxWidth * 0.23 - (this.numberFontSize + 10 + this.describeFontSize)) / 2;
      top = parseInt(top);
      return top;
    }
  },
  methods: {
    bindResize() {
      window.addEventListener('resize', this.onResize);
    },
    unBindResize() {
      window.removeEventListener('resize', this.onResize);
    },
    onResize() {
      if (this.$el) {
        this.boxWidth = this.$el.offsetWidth;
      }
    }
  },
  mounted() {
    this.bindResize();
    this.onResize();
  },
  beforeDestroy() {
    this.unBindResize();
  }
};
</script>
<style rel="stylesheet/less" lang="less" scoped>
.number-box {
  position: relative;
}

.icon-wrap {
  position: relative;
  width: 23.6%;
  padding-bottom: 23.6%;
  margin-top: 7.5%;
  margin-bottom: 7.5%;
  margin-left: 15%;
  .icon {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    text-align: center;
    img {
      height: 54%;
      display: inline-block;
      vertical-align: top;
      margin-top: 23%;
    }
  }
}

.number,
.describe {
  position: absolute;
  left: 45%;
}

.number {
  top: 0;
  color: #333333;
  font-size: 32px;
  font-weight: bolder;
}

.describe {
  top: 0;
  color: #808080;
  font-size: 16px;
}
.class-font {
  color: #fff;
}
</style>
