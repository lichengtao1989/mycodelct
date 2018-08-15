<template>
  <cjm-autocomplete v-model="value"
                    :fetch-suggestions="getData"
                    @select="handleSelect"
                    placeholder="输入功能名称搜索"
                    class="cjm-head-functionSearch">
  </cjm-autocomplete>
</template>

<script>
  import Vue from 'vue'
  import menuUtil from '../../../utils/dataManage/menu'
  function getSearchData(menuData, parentSearchItem) {
    let searchData = [];
    for (let menuItem of menuData) {
      if (menuItem.menuType != Vue.globalData.get('root', 'enums').menuType.CARD) {
        let searchItem = {
          value: menuItem.name,
          parent: parentSearchItem,
          ref: menuItem
        };
        searchData.push(searchItem);
        if (menuItem.childList && menuItem.childList.length > 0) {
          searchData = searchData.concat(getSearchData(menuItem.childList, searchItem));
        }
      }
    }
    return searchData;
  }

  export default{
    data(){
      return {
        value: '',
        searchOriginData: [] // 搜索源数据
      }
    },
    methods: {
      handleSelect(item){
        let parentItems = [];
        let currentItem = item;
        parentItems.push(currentItem);
        while (currentItem.parent) {
          parentItems.push(currentItem.parent);
          currentItem = currentItem.parent;
        }

        this.$store.commit('menu_setActiveMenu1', {menu: parentItems.pop().ref});
        if (parentItems.length > 0) {
          this.$store.commit('menu_setActiveMenu2', {menu: parentItems.pop().ref});
        }
        if (parentItems.length > 0) {
          this.$store.commit('menu_setActiveMenu3', {menu: parentItems.pop().ref});
        }
      },
      getData(queryText, cb){
        let result = [];
        for (let item of this.searchOriginData) {
          if (item.value.indexOf(queryText) >= 0) {
            result.push(item);
          }
        }
        cb(result);
      }
    },
    created(){
      menuUtil.get().then(menuData=> {
        this.searchOriginData = getSearchData(this.$store.state.menu.menuData, null);
      });
    }
  }
</script>

<style rel='stylesheet/less' lang='less'>
  .cjm-head-functionSearch {
    width: 240px !important;

    .el-input {
      vertical-align: middle;
    }

    .el-input__inner {
      background: rgba(255, 255, 255, 0.8);
      border: none;
      color: #333;
      height: 32px;
    }
  }
</style>
