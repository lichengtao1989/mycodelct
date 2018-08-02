<template>
  <div class="scrollbar">
    <div class="scroll-inner" :style="innerStyle" ref="inner">
      <slot></slot>
    </div>
    <div class="scroll-drag" v-show="isShowScrollBar">
      <div class="scroll-drag-inner" ref="dragInner" :style="dragStyle"></div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        wrapHeight: 0,
        innerHeight: 0,
        scrollTop: 0,
        isDraging: false,
        downTop: 0
      };
    },
    computed: {
      innerStyle(){
        const top = this.scrollTop;
        return {
          top: `-${top}px`
        };
      },
      sTop(){
        const p = this.scrollTop / (this.innerHeight - this.wrapHeight);
        const maxTop = 100 - this.sHeight;
        const top = (maxTop * p).toFixed(9);
        return top;
      },
      sHeight(){
        const height = ((this.wrapHeight / this.innerHeight) * 100).toFixed(9);
        return height;
      },
      dragStyle(){
        if (this.isShowScrollBar) {
          const top = (this.sTop * this.wrapHeight) / 100;
          const height = (this.wrapHeight / this.innerHeight) * this.wrapHeight;
          return {
            top: `${top}px`,
            height: `${height}px`
          };
        }
        return {};
      },
      isShowScrollBar(){
        return this.innerHeight > this.wrapHeight;
      }
    },
    methods: {
      onDragMouseDown(event){
        event.preventDefault();
        this.isDraging = true;
        this.downTop = event.screenY;
      },
      onDragMouseMove(event){
        event.preventDefault();
        if (this.isDraging) {
          const moveY = event.screenY - this.downTop;
          this.sTopChange(moveY);
          this.downTop = event.screenY;
        }
      },
      onDragMouseUp(event){
        event.preventDefault();
        if (this.isDraging) {
          this.isDraging = false
        }
      },
      sTopChange(moveY){
        const oldScrollTop = this.scrollTop;
        const oldSTop = this.wrapHeight * this.sTop / 100;
        const newSTop = oldSTop + moveY;
        let newScrollTop = oldSTop != 0 ? ((newSTop / oldSTop) * oldScrollTop) : (newSTop);
        const maxScrollTop = this.$el.scrollHeight - this.$el.offsetHeight;
        if (newScrollTop < 0) {
          newScrollTop = 0;
        }
        if (newScrollTop > maxScrollTop) {
          newScrollTop = maxScrollTop;
        }
        this.scrollTop = newScrollTop;
      },
      bindEvent(){
        this.$el.addEventListener('DOMMouseScroll', this.onMouseWeel, false); //Firefox
        this.$el.addEventListener('onmousewheel', this.onMouseWeel, false); //Chrome
        this.$el.onmousewheel = this.onMouseWeel;
        //
        const dragInner = this.$refs.dragInner;
        dragInner.addEventListener('mousedown', this.onDragMouseDown);
        document.body.addEventListener('mousemove', this.onDragMouseMove);
        document.body.addEventListener('mouseup', this.onDragMouseUp);
        document.body.addEventListener('mouseleave', this.onDragMouseUp);
      },
      unBindEvent(){
        this.$el.removeEventListener('DOMMouseScroll', this.onMouseWeel, false);
        this.$el.removeEventListener('onmousewheel', this.onMouseWeel, false);
        this.$el.onmousewheel = null;
        //
        const dragInner = this.$refs.dragInner;
        dragInner.removeEventListener('mousedown', this.onDragMouseDown);
        document.body.removeEventListener('mousemove', this.onDragMouseMove);
        document.body.removeEventListener('mouseup', this.onDragMouseUp);
        document.body.removeEventListener('mouseleave', this.onDragMouseUp);
      },
      onMouseWeel(event){
        if (!this.isShowScrollBar) {
          return;
        }
        const maxScrollTop = this.$el.scrollHeight - this.$el.offsetHeight;
        const oldScrollTop = this.scrollTop * 1;
        let newScrollTop = oldScrollTop;
        if (event.wheelDelta) {
          newScrollTop = this.scrollTop - event.wheelDelta;
        } else if (event.detail) {
          if (event.detail > 0) {
            newScrollTop = this.scrollTop + 120;
          } else if (event.detail < 0) {
            newScrollTop = this.scrollTop - 120;
          }
        }
        if (newScrollTop < 0) {
          newScrollTop = 0;
        }
        if (newScrollTop > maxScrollTop) {
          newScrollTop = maxScrollTop;
        }
        if (oldScrollTop != newScrollTop) {
          this.scrollTop = newScrollTop;
          event.preventDefault();
        }
      },
      onScrollResize(){
        const wrap = this.$el;
        const inner = this.$refs.inner;
        this.wrapHeight = wrap.offsetHeight;
        this.innerHeight = inner.offsetHeight;
      }
    },
    mounted(){
      this.bindEvent();
      this.onScrollResize();
    },
    beforeDestroy(){
      this.unBindEvent();
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .scrollbar {
    position: relative;
    height: 100%;
    overflow: hidden;
  }

  .scroll-inner {
    position: relative;
  }

  .scroll-drag {
    position: absolute;
    height: 100%;
    width: 5px;
    right: 0;
    top: 0;
    background-color: rgba(255, 255, 255, 0.3);
    opacity: 0;
    transition: opacity 300ms;
  }

  .scrollbar:hover {
    .scroll-drag {
      opacity: 1;
    }
  }

  .scroll-drag-inner {
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    height: 50px;
    background-color: rgba(111, 111, 111, 0.5);
    cursor: pointer;
  }
</style>
