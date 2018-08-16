export default {
  //----------------------------------------------------------------------------------------
  menu: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/system/menu/list.vue'));
    }, '/modules/system/menu/list');
  },
  //----------------------------------------------------------------------------------------
  businessRegistrationAudit: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/system/business-registration-audit/list.vue'));
    }, '/modules/system/business-registration-audit/list');
  },
  //----------------------------------------------------------------------------------------
  //角色列表
  role: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/system/role/index.vue'));
    }, '/modules/system/role/index');
  },
  //----------------------------------------------------------------------------------------
  account: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/system/account/list.vue'));
    }, '/modules/system/account/list');
  },
  //----------------------------------------------------------------------------------------
  org: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/system/org/list.vue'));
    }, '/modules/system/org/list');
  },
  //小票设置
  smallTicketConfig: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/system/small-ticket-config/list.vue'));
    }, '/modules/system/small-ticket-config/list');
  },
  //驱动设置
  userPrintConfig: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/system/user-print-config/list.vue'));
    }, '/modules/system/user-print-config/list');
  },
  //logo设置
  logoSeting: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/system/org/logo-edit.vue'));
    }, '/modules/system/org/logo-edit');
  }
}
