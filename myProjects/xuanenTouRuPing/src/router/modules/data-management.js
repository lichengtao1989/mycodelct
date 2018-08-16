export default {
  businessEntityManagement: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/data-management/busines-entity/edit.vue'));
    }, '/modules/data-management/busines-entity/edit');
  },
  businessEntityList: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/data-management/busines-entity/list.vue'));
    }, '/modules/data-management/busines-entity/list');
  },
  customerList: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/data-management/customer/list.vue'));
    }, '/modules/data-management/customer/list');
  },
  customerEdit: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/data-management/customer/edit.vue'));
    }, '/modules/data-management/customer/edit');
  },
  supplierList: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/data-management/supplier/list.vue'));
    }, '/modules/data-management/supplier/list');
  },
  supplierEdit: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/data-management/supplier/edit.vue'));
    }, '/modules/data-management/supplier/edit');
  },
  productList: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/data-management/product/list.vue'));
    }, '/modules/data-management/product/list');
  },
  productEdit: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/data-management/product/edit.vue'));
    }, '/modules/data-management/product/edit');
  }
}
