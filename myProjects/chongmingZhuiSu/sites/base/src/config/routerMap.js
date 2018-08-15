export default {
  //功能管理
  powerList: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/power/list.vue'))
    }, '/modules/base/power/list')
  },
  //系统管理
  systemList: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/system/list.vue'))
    }, '/modules/base/system/list')
  },
  //菜单编辑
  menuEdit: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/system/menu-edit.vue'))
    }, '/modules/base/system/menu-edit')
  },
  //产品批次
  productBatchList: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/productBatch/list.vue'));
    }, '/modules/base/productBatch/list');
  },
  //类目管理
  productCategory: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/productCategory/product-category-menu.vue'));
    }, '/modules/admin/productCategory/product-category-menu');
  },
  //监控配置列表
  monitorConfigList: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/monitorScreen/list.vue'));
    }, '/modules/base/monitorConfig/list');
  },
  //监控配置编辑
  monitorConfigEdit: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/monitorScreen/edit.vue'));
    }, '/modules/base/monitorConfig/edit');
  },
  //logo设置
  logoSetting: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/logo/edit.vue'));
    }, '/modules/base/logo/edit');
  },
  //溯源区块链
  traceBlockChain: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/blockChain/trace-list.vue'));
    }, '/modules/base/blockChain/trace-list');
  },
  //防伪区块链
  antifakeBlockChain: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/blockChain/antifake-list.vue'));
    }, '/modules/base/blockChain/antifake-list');
  },
  //防伪区块链
  antifakeBlockChainForCorp: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/blockChain/antifake-list-for-corp.vue'));
    }, '/modules/base/blockChain/antifake-list-for-corp');
  },
  //卡片管理
  cardManage: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/card/list.vue'));
    }, '/modules/base/card/list');
  },
  //系统通知
  notificationList: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/notification/list.vue'));
    }, '/modules/base/notification/list');
  },
  //组织管理保险列表
  insuranceCorpList: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/corp/insurance-list.vue'));
    }, '/modules/base/corp/insurance-list');
  },
  //H5工具2.0列表
  mobileWebsite: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/mobileWebsite/list.vue'));
    }, '/modules/base/mobileWebsite/list');
  }
}
