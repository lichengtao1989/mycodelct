import formatter from '../routerFormatter';
export default formatter({
  index: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/index/index.vue'));
    }, '/modules/index/index');
  },
  notice: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/notice/notice.vue'));
    }, '/modules/notice/notice');
  },
  work: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/work/work.vue'));
    }, '/modules/work/work');
  },
  policy: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/policy/policy.vue'));
    }, '/modules/policy/policy');
  },
  sysimage: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/sysimage/index.vue'));
    }, '/modules/sysimage/index');
  },
  slide: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/slide/index.vue'));
    }, '/modules/slide/index');
  },
  banner: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/banner/index.vue'));
    }, '/modules/banner/index');
  },
  kepu: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/kepu/index.vue'));
    }, '/modules/kepu/index');
  },
  product: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/product/index.vue'));
    }, '/modules/product/index');
  },
  link: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/link/index.vue'));
    }, '/modules/link/index');
  },
  platform: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/platform/index.vue'));
    }, '/modules/platform/index');
  },
  map: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/map/index.vue'));
    }, '/modules/map/index');
  },
  complaint: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/complaint/index.vue'));
    }, '/modules/complaint/index');
  },
  quality: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/quality/index.vue'));
    }, '/modules/quality/index');
  },
  hotfocus: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/hotfocus/index.vue'));
    }, '/modules/hotfocus/index');
  },
  law: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/law/index.vue'));
    }, '/modules/law/index');
  },
  certification: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/certification/index.vue'));
    }, '/modules/certification/index');
  },
  warning: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/warning/index.vue'));
    }, '/modules/warning/index');
  },
  charm: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/charm/index.vue'));
    }, '/modules/charm/index');
  },
  standard: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/standard/index.vue'));
    }, '/modules/standard/index');
  },
  ggimgpictures: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/ggimgpictures/index.vue'));
    }, '/modules/ggimgpictures/index');
  },
  datauploading: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/datauploading/index.vue'));
    }, '/modules/datauploading/index');
  },
  //----------------demo
  list: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/demo/list.vue'));
    }, '/modules/demo/list');
  },
  select: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/demo/select.vue'));
    }, '/modules/demo/select');
  },
  editor: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/demo/editor.vue'));
    }, '/modules/demo/editor');
  },
  other: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/demo/other.vue'));
    }, '/modules/demo/other');
  }
  //-------------
});
