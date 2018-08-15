<template>
  <transition name="cjm-stack-card-wrap">
    <!--卡片包裹容器-->
    <div class="cjm-stack-card-wrap cjm-card-wrap small" v-if="visible">
      <transition-group name="cjm-stack-card"
                        tag="div"
                        class="cjm-stack-card-container"
                        @before-leave="beforeLeave"
                        @before-enter="beforeEnter">
        <!--单个卡片-->
        <cjm-card-inside v-for="(item, index) in showList"
                         :key="item.id"
                         :title="item.title"
                         :sub-title="item.subTitle"
                         :editable="false"
                         :format-style="formatStyle"
                         :head-operates="headOperates"
                         :style="{zIndex: 100-index,bottom: (showList.length-index-1) * 4 + 'px'}">
          <slot :item="item"></slot>
          <template slot="bottomLeftOperate">
            <div class="cjm-card-footer-pagination">
              <i class="cjm-icon-chevron-down cjm-icon-rotate-90" @click="showPreCard"></i>
              <a class="cjm-card-footer-pagination-current">{{getIndex(item)}}</a>
              <a class="cjm-card-footer-pagination-split">/</a>
              <a class="cjm-card-footer-pagination-total">{{total}}</a>
              <i class="cjm-icon-chevron-down cjm-icon-rotate-n90" @click="showNextCard"></i>
            </div>
          </template>
          <template slot="bottomRightOperate">
            <slot name="operate" :item="item"></slot>
          </template>
        </cjm-card-inside>
      </transition-group>
    </div>
  </transition>
</template>

<script>
  import CardInside from './card-inside.vue'
  export default {
    name: 'cjm-stack-card',
    componentName: 'cjm-card',
    components: {
      'cjm-card-inside': CardInside
    },
    props: {
      /**
       * 堆叠卡片数据
       */
      data: {
        type: Array
      },
      /**
       * 格式化样式
       */
      formatStyle: Boolean,
      /**
       * 右上角操作项
       */
      headOperates: Object
    },
    data(){
      return {
        //卡片是否显示
        visible: true,
        //上次的操作
        lastOperate: '',
        //显示的卡片数据
        showList: []
      }
    },
    computed: {
      //总卡片数量
      total(){
        return this.data ? this.data.length : 0;
      }
    },
    methods: {
      /**
       * 获取卡片内容区域宽度
       */
      getContentWidth(){
        return this.$el.clientWidth - 50;
      },
      //关闭一张卡片
      close(item){
        const nextShowItem = this.getNextShowItem();
        const preShowItem = this.getPreShowItem();

        this.lastOperate = 'close';
        this.data.remove(item);
        this.showList.remove(item);

        if (nextShowItem) {
          this.showList.push(nextShowItem);
        } else if (this.showList.length === 0 && preShowItem) {
          this.showList.unshift(preShowItem);
        }

        if (this.showList.length === 0) {
          this.visible = false;
        }
      },
      //获取卡片的序号
      getIndex(item){
        return this.data.indexOf(item) + 1;
      },
      //获取上一个卡片
      getPreShowItem(){
        const firstShowItem = this.showList[0];
        const index = this.data.indexOf(firstShowItem);
        if (index === 0) {
          return null;
        }
        return this.data[index - 1];
      },
      //获取下一个卡片
      getNextShowItem(){
        const lastShowItem = this.showList[this.showList.length - 1];
        const index = this.data.indexOf(lastShowItem);
        if (index === this.data.length - 1) {
          return null;
        }
        return this.data[index + 1];
      },
      //显示上一个卡片
      showPreCard(){
        const preShowItem = this.getPreShowItem();
        if (!preShowItem) {
          return;
        }
        this.lastOperate = 'pre';
        if (this.showList.length === 3) {
          this.showList.pop();
        }
        this.showList.unshift(preShowItem);
      },
      //显示下一个卡片
      showNextCard(){
        if (this.showList.length <= 1) {
          return;
        }
        this.lastOperate = 'next';
        if (this.showList.length > 1) {
          this.showList.shift();
        }
        const nextShowItem = this.getNextShowItem();
        if (nextShowItem) {
          this.showList.push(nextShowItem);
        }
      },
      //卡片离开前的钩子函数
      beforeLeave(el){
        if (this.lastOperate === 'next' || this.lastOperate === 'close') {
          el.style.zIndex = 200;
        }
        this.$nextTick(()=> {
          if (this.lastOperate === 'next') {
            el.style.transition = 'all 0.3s ease-in';
            el.style.transform = 'translateX(-300px)';
          } else if (this.lastOperate === 'pre') {
            el.style.transition = 'all 0.3s ease-out';
            el.style.transform = 'translateY(10px)';
          } else if (this.lastOperate === 'close') {
            el.style.transition = 'all 0.3s ease-in';
            el.style.transform = 'scale(0, 0)';
            el.style.transformOrigin = 'bottom right';
          }
          el.style.opacity = 0;
        });
      },
      //卡片进入前的钩子函数
      beforeEnter(el){
        if (!this.lastOperate) {
          return;
        }
        el.style.opacity = 0;
        if (this.lastOperate === 'next' || this.lastOperate === 'close') {
          el.style.transform = 'translateY(10px)';
          el.style.transition = 'all 0.3s ease-out';
        } else if (this.lastOperate === 'pre') {
          el.style.transform = 'translateX(-300px)';
          el.style.transition = 'all 0.3s ease-out';
        }
        this.$nextTick(()=> {
          el.style.transform = '';
          el.style.opacity = 1;
        });
      }
    },
    created () {
      this.$on('cardResize', () => {
        this.$nextTick(() => {
          /**
           * 卡片宽度改变事件
           * @event cardResize
           * @param clientWidth {number} 卡片宽度
           * @alias module:components/base/card.cardResize
           */
          this.$emit('resize', this.getContentWidth());
        });
      });
      let len = this.data.length <= 3 ? this.data.length : 3;
      for (let i = 0; i < len; i++) {
        this.showList.push(this.data[i]);
      }
    }
  };
</script>

<style rel='stylesheet/less' lang='less'>
  @import "../../../../assets/css/config";

  @cardHeight: 300px;
  .cjm-stack-card-move {
    transition: all 0.3s;
  }

  .cjm-stack-card-wrap-leave-active {
    transform: scale(0, 0);
    transform-origin: top left;
    transition: transform 0.3s ease-in;
  }

  .cjm-stack-card-wrap {
    float: left;
    padding: 8px;
    box-sizing: border-box;
    position: relative;

    .cjm-card{
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;

      &:hover{
        box-shadow: 0 0 8px #bbb;
      }
    }
  }

  .cjm-stack-card-container{
    position: relative;
    height: @cardHeight;
    transition: box-shadow 0.3s ease;

    &:hover {
      box-shadow: 2px 2px 16px #bbb;
    }
  }

  .cjm-card-footer-pagination {
    color: #bbb;
    font-size: 14px;

    i {
      font-size: 15px;
      cursor: pointer;
    }
  }

  .cjm-card-footer-pagination-current{
    color: @primaryColor;
    margin-right: 2px;
  }
  .cjm-card-footer-pagination-split{
    margin-right: 2px;
  }
 </style>
