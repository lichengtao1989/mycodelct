export default {
  information: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/new-management/information/list.vue'));
    }, '/modules/new-management/information/list');
  },
  notification: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/new-management/notification/list.vue'));
    }, '/modules/new-management/notification/list');
  },
  new: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/new-management/new/list.vue'));
    }, '/modules/new-management/new/list');
  },
  details: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/new-management/information/details.vue'));
    }, '/modules/new-management/information/details');
  },
  businessEntityInfoList: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/new-management/information/business_entity_list.vue'));
    }, '/modules/new-management/information/business_entity_list');
  },
  businessEntityNewsList: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/new-management/new/business_entity_list.vue'));
    }, '/modules/new-management/new/business_entity_list');
  }
}
