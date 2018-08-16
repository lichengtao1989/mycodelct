<template>
  <div class="task" :class="outRange?'row-cloums-2':''">
    <div class="bs-title">
      <img src="@/assets/images/shop.png"/>
      <div class="bs-name">
        <div class="bs-name-text">{{taskData.storeName}}</div>
        <div class="bs-time">{{ taskData.createTime }}</div>
      </div>
    </div>
    <div class="item-list">
      <ul>
        <li><span>经营主体： </span><span>{{taskData.storeName}}</span></li>
        <li><span>法人代表： </span><span>{{taskData.legal}}</span></li>
        <li><span>统一社会信用代码： </span><span>{{taskData.creditCode}}</span></li>
        <li><span>手机号： </span><span>{{taskData.mobile}}</span></li>
        <li><span>类型： </span><span>{{getEnumName('经营类型', taskData.type)}}</span></li>
        <li><span>经营限制性农药： </span><span>{{getEnumName('是否', taskData.isSaleRestrictivePesticides)}}</span></li>
        <li><span>许可证号： </span><span>{{taskData.licenseKey}}</span></li>
        <li><span>详细地址： </span><span>{{addressDetail}}</span></li>
      </ul>
      <ul>
        <li><span>许可证： </span><span><nz-image-upload :maxNumber="1" class="license-img readonly" :value="img2ary(taskData.licenseImg)"></nz-image-upload></span></li>
      </ul>
    </div>
    <div class="rb-btns">
      <nz-button type="danger" @click="approve(false)"><i class="nz-icon-close"></i>不予通过</nz-button>
      <nz-button type="primary" @click="approve(true)"><i class="nz-icon-confirm"></i>审核通过</nz-button>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['taskData'],
    data(){
      return {
        outRange: false,
        resizeTimeout: null,
        addressDetail: ''
      };
    },
    methods: {
      async addressDetailLoad(){
        const {regionCode, address = ''} = this.taskData;
        const regionInfo = await this.$model('region').getRegionText(regionCode);
        this.addressDetail = regionInfo.join('') + (address || '');
      },
      getEnumName(enumName, value){
        const values = this.$enum(enumName).values;
        const matchEnum = values.find(item => item.value == value);
        if (matchEnum) {
          return matchEnum.name;
        }
        return '';
      },
      async approve(isPass){
        const {storeID} = this.taskData;
        const isApproveSuccess = await this.$model('system').store.approve(storeID, isPass);
        if (isApproveSuccess) {
          this.$emit('audit-success');
        }
      },
      img2ary(imgs){
        let list = [];
        if (typeof imgs === 'string') {
          list = JSON.parse(imgs)
        } else {
          list = imgs;
        }
        return list;
      },
      onResize(){
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(async () => {
          this.outRange = false;
          await this.$nextTick();
          let outRange = false;
          const ul = this.$el.querySelector('.item-list ul');
          const lis = this.$el.querySelectorAll('.item-list li');
          const ulRight = ul.offsetWidth + ul.offsetLeft;
          for (let i = 0, len = lis.length; i < len; i++) {
            const li = lis[i];
            const spans = li.querySelectorAll('span');
            const span = spans[spans.length - 1];
            const liRight = span.offsetWidth + span.offsetLeft;
            if (liRight > ulRight) {
              outRange = true;
            }
          }
          this.outRange = outRange;
        }, 200);
      },
      bindResize(){
        window.addEventListener('resize', this.onResize);
        this.onResize();
      },
      unbindResize(){
        window.removeEventListener('resize', this.onResize);
      }
    },
    mounted(){
      this.bindResize();
      this.addressDetailLoad();
    },
    beforeDestroy(){
      this.unbindResize();
    }
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .task {
    position: relative;
    height: 298px;
    border: 1px solid #d9d9d9;
    margin-bottom: 30px;
    border-radius: 3px;
    ul {
      display: inline-block;
      width: 78.8%;
      vertical-align: top;
      padding: 0;
      margin: 0;
      font-size: 0;
      text-align: left;
    }
    li {
      list-style-type: none;
      display: inline-block;
      vertical-align: top;
      width: 30%;
      margin-right: 3.3%;
      color: #666666;
      font-size: 12px;
      font-weight: bolder;
      margin-bottom: 15px;
      white-space: nowrap;
    }
    &.row-cloums-2 {
      height: 328px;
      li {
        width: 45%;
      }
    }
  }

  .item-list {
    text-align: center;
    margin-top: 30px;
  }

  .bs-title {
    height: 45px;
    margin-top: 20px;
    margin-left: 22px;
    font-size: 0;
    img {
      display: inline-block;
      vertical-align: top;
    }
  }

  .rb-btns {
    position: absolute;
    right: 32px;
    bottom: 26px;
  }

  .license-img {
    display: inline-block;
    vertical-align: top;
  }

  .bs-name {
    display: inline-block;
    vertical-align: top;
    margin-left: 20px;
  }

  .bs-name-text {
    font-size: 14px;
    color: #333333;
    margin-top: 5px;
    font-weight: bolder;
  }

  .bs-time {
    font-size: 12px;
    color: #d5d5d5;
    margin-top: 8px;
  }
</style>
