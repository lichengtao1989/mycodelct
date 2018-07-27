<template>
  <div>
    <div v-for="(item,index) in menuData" :key="index" v-show="!item.hide" class="nz-menu-item">
      <div class="nz-menu-item-head" :class="isActive(item)?'active':''">
        <!--没有子菜单-->
        <router-link class="rlink" @click.native="clearActiveItem" v-if="isLink(item)" :to="'/main/'+item.powerCode">
          <!-- <i class="menu-icon nz-icon-home" v-if="item.powerCode == 'index'"></i> -->
          <!-- <i class="menu-icon " v-if="item.powerCode == 'index'"></i>
          <i class="menu-icon" :class="isActive(item)?'el-icon-caret-bottom':'el-icon-caret-right'" v-else></i> -->
          <i class="menu-icon" :class="isActive(item)?'el-icon-caret-bottom':'el-icon-caret-right'"></i> 
          <span>{{item.powerName}}</span>
        </router-link>
        <!--有子菜单-->
        <span class="rlink" @click="toggleItemActive(item)" v-if="isParent(item)">
          <i class="menu-icon" :class="viewChildItem==item?'el-icon-caret-bottom':'el-icon-caret-right'"></i>
          <span>{{item.powerName}}</span>
        </span>
        <div class="nz-menu-item-body" v-for="(subItem,index) in item.children" :key="index" :class="{'isActive': viewChildItem===item}">
          <ul class="nz-menu-item-children">
            <li class="nz-menu-item-child">
              <div class="nz-menu-li-head" :class="isActive(subItem)?'active':''">
                <router-link :to="'/main/'+subItem.powerCode" class="rlink">{{subItem.powerName}}</router-link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import getMenu from '@/data/menu/index';
export default {
  data() {
    return {
      viewChildItem: null,
      menuData: getMenu()
    };
  },
  methods: {
    clearActiveItem() {
      this.viewChildItem = null;
    },
    toggleItemActive(item) {
      if (this.viewChildItem === item) {
        this.viewChildItem = null;
      } else {
        this.viewChildItem = item;
      }
    },
    isActive(item) {
      const routerPath = this.$route.path;
      if (`/main/${item.powerCode}` === routerPath) {
        return true;
      }
      return false;
    },
    setDefaultViewChildItem() {
      this.menuData.forEach(item => {
        if (this.isParent(item)) {
          let hasActiveChild = false;
          item.children.forEach(subItem => {
            if (this.isActive(subItem)) {
              hasActiveChild = true;
            }
          });
          if (hasActiveChild) {
            this.viewChildItem = item;
          }
        }
      });
    },
    isLink(item) {
      return !this.isParent(item);
    },
    isParent(item) {
      if (item && item.children && item.children.length > 0) {
        return true;
      }
      return false;
    }
  },
  created() {
    this.setDefaultViewChildItem();
  }
};
</script>
<style rel='stylesheet/less' lang='less' scoped>
.nz-menu-item {
  display: inline-block;
  width: 100%;
}

.nz-menu-item-head {
  font-size: 14px;
  text-indent: 26px;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-block;
  width: 100%;
  .rlink {
    display: block;
    width: 100%;
    line-height: 40px;
    color: #333;
    text-decoration: none;
  }
  :hover {
    background-color: #f5fcfa;
  }
}

.nz-menu-item-head.active {
  background-color: #aae2d8;
  :hover {
    background-color: #aae2d8;
  }
}

.nz-menu-li-head.active {
  background-color: #aae2d8;
}

.nz-menu-item-children {
  padding: 0;
  margin: 0;
}

.nz-menu-item-body {
  display: none;
  width: 100%;
}

.nz-menu-item-child {
  list-style-type: none;
  :hover {
    background-color: #aae2d8;
  }
}

.nz-menu-li-head {
  height: 40px;
  font-size: 13px;
  text-indent: 62px;
  box-sizing: border-box;
  background-color: #ebf8f6;
  cursor: pointer;
}

.nz-menu-li-head .rlink {
  display: block;
  width: 100%;
  line-height: 40px;
  color: #333;
  opacity: 0.6;
  cursor: pointer;
}

.menu-icon {
  font-size: 16px;
  color: #00a88a;
  margin-right: 8px;
  text-indent: 0;
}

.isActive {
  display: block;
}
</style>
