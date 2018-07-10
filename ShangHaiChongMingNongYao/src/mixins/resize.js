function resizeCreate(timeout = 100) {
  return {
    data(){
      return {
        resizeTimeout: null
      };
    },
    methods: {
      bindResize(){
        window.addEventListener('resize', this.resizeWait);
      },
      unBindResize(){
        window.removeEventListener('resize', this.resizeWait);
      },
      onResize(){
        //
      },
      resizeWait(){
        //
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(this.onResize, timeout);
      }
    },
    mounted(){
      this.bindResize();
      this.onResize();
    },
    beforeDestroy(){
      this.unBindResize();
    }
  }
}
export default resizeCreate;
