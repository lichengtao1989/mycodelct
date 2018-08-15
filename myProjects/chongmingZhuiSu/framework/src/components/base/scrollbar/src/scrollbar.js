import {Scrollbar} from 'element-ui';

export default {
  name: 'cjm-scrollbar',
  data(){
    return {
      //标识是否处于动画状态
      isAnimating: false,
      //setInterval赋值给animateCtrl 用于中止动画
      animateCtrl: null
    };
  },
  mixins: [Scrollbar],
  props: {
    wrapClass: {default: 'cjm-scrollbar-wrap'}
  },
  mounted(){
    this.$el.className = this.$el.className + ' cjm-scrollbar';
  },
  methods: {
    //duration毫秒内滚动到指定位置destX destY
    scrollTo(destX = false, destY = false, duration = 'auto'){
      let nowX = this.wrap.scrollLeft;//当前横向滚动距离
      let nowY = this.wrap.scrollTop;//当前纵向滚动距离
      let maxX = this.wrap.scrollWidth - this.wrap.clientWidth + 34;//横向最大滚动距离
      let maxY = this.wrap.scrollHeight - this.wrap.clientHeight + 34;//纵向最大滚动距离

      if (destX !== 0 && !destX) { //横向滚动条保持不动
        destX = nowX;
      }
      if (destX === 'left') {
        destX = 0;
      }
      if (destX === 'right' || destX > maxX) { //横向滚动条滚动到底
        destX = maxX
      }
      if (destY !== 0 && !destY) { //纵向滚动条保持不动
        destY = nowY;
      }
      if (destY === 'top') {
        destY = 0;
      }
      if (destY === 'bottom' || destY > maxY) { //纵向滚动条滚动到底
        destY = maxY;
      }
      if (duration === 'auto') {
        //勾股定理得到实际距离
        let destXY = Math.sqrt(Math.pow(nowX - destX, 2) + Math.pow(nowY - destY, 2)).toFixed(0);
        //根据实际距离计算出一个默认动画时间
        duration = destXY * 0.2;
        duration = duration < 50 ? 50 : duration;
        duration = duration > 200 ? 200 : duration;
      }
      //动画间隔时间固定设为20 每秒50帧 不要大于(1000/24)  每秒最多24帧
      let timeInterval = 20;
      this.startAnimate(() => {
        if (this.wrap.scrollLeft === destX && this.wrap.scrollTop === destY) {
          this.stopAnimat();//已经滚动到目的地,中止动画
        } else {
          nowX = this.wrap.scrollLeft;
          nowY = this.wrap.scrollTop;
          let moveX = ((destX - nowX) / duration) * timeInterval;
          let moveY = ((destY - nowY) / duration) * timeInterval;
          let newX = moveX + nowX;
          let newY = moveY + nowY;
          duration = duration - timeInterval;
          if (duration <= 0) {
            newX = destX;
            newY = destY;
            this.stopAnimat();
          }
          if ((newX > destX && nowX < destX) || (newX < destX && nowX > destX)) { //防止x轴滚动超出目的点
            newX = destX
          }
          if ((newY > destY && nowY < destY) || (newY < destY && nowY > destY)) { //防止y轴滚动超出目的点
            newY = destY
          }
          this.wrap.scrollLeft = newX;
          this.wrap.scrollTop = newY;
        }
      }, timeInterval);
      // this.wrap.scrollTop = ypx;
    },
    stopAnimat(){ //中止动画
      this.isAnimating = false;
      clearInterval(this.animateCtrl);
    },
    startAnimate(callback, timeInterval){ //开始动画
      if (this.isAnimating) {
        this.stopAnimat();
      }
      this.isAnimating = true;
      this.animateCtrl = setInterval(callback, timeInterval);
    }
  },
  watch: {
    moveY: function (val) {
      if(this.wrap.clientHeight + this.wrap.scrollTop >= this.wrap.scrollHeight - 10){
        this.$emit('scroll-bottom');
      }
    }
  }
};
