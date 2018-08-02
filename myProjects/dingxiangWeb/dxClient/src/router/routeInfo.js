//异步路由
const myindex = resolve => {
  //首页
  import ("@/components/index/myindex").then(module => {
    resolve(module);
  });
};
const newsList = resolve => {
  //新闻动态
  import ("@/components/news/list").then(module => {
    resolve(module);
  });
};
const notice = resolve => {
  //通告公告
  import ("@/components/notice/notice").then(module => {
    resolve(module);
  });
};
const quality = resolve => {
  //质量监管
  import ("@/components/quality/quality").then(module => {
    resolve(module);
  });
};
const hotfocus = resolve => {
  //热点聚焦
  import ("@/components/hotfocus/hotfocus").then(module => {
    resolve(module);
  });
};
const law = resolve => {
  //执法公开
  import ("@/components/law/law").then(module => {
    resolve(module);
  });
};
const certification = resolve => {
  // 产品认证
  import ("@/components/certification/certification").then(module => {
    resolve(module);
  });
};
const warning = resolve => {
  // 农情预警
  import ("@/components/warning/warning").then(module => {
    resolve(module);
  });
};
const charm = resolve => {
  // 魅力定襄
  import ("@/components/charm/charm").then(module => {
    resolve(module);
  });
};
const standard = resolve => {
  // 标准规范
  import ("@/components/standard/standard").then(module => {
    resolve(module);
  });
};
const shoppingmall = resolve => {
  // 特色商场
  import ("@/components/shoppingmall/shoppingmall").then(module => {
    resolve(module);
  });
};
const regulations = resolve => {
  //z政策法规
  import ("@/components/regulations/regulations").then(module => {
    resolve(module);
  });
};
const download = resolve => {
  //资料下载
  import ("@/components/download/index").then(module => {
    resolve(module);
  });
};
const introduction = resolve => {
  //平台简介
  import ("@/components/introduction/index").then(module => {
    resolve(module);
  });
};
// const newsDetail = resolve => {
//   //新闻详情
//   import ("@/components/news/detail").then(module => {
//     resolve(module);
//   });
// };
const productdetail = resolve => {
  //产品详情
  import ("@/components/productdetail/index").then(module => {
    resolve(module);
  });
};
const article = resolve => {
  //文章详情(新闻/通知/工作交流/政策法规)
  import ("@/components/article/article").then(module => {
    resolve(module);
  });
};
const exchange = resolve => {
  //通告通知
  import ("@/components/exchange/exchange").then(module => {
    resolve(module);
  });
};

const traceability = resolve => {
  //可追溯企业
  import ("@/components/traceability/traceability").then(module => {
    resolve(module);
  });
};
const untraceability = resolve => {
  //不可追溯企业
  import ("@/components/untraceability/untraceability").then(module => {
    resolve(module);
  });
};
const redandblack = resolve => {
  //红黑榜
  import ("@/components/redandblack/redandblack").then(module => {
    resolve(module);
  });
};
const egoods = resolve => {
  //电商产品
  import ("@/components/egoods/egoods").then(module => {
    resolve(module);
  });
};
const complain = resolve => {
  //投诉举报
  import ("@/components/complain/complain").then(module => {
    resolve(module);
  });
};
const origins = resolve => {
  //投诉举报
  import ("@/components/origins/origins").then(module => {
    resolve(module);
  });
};
const help = resolve => {
  //使用帮助
  import ("@/components/help/help").then(module => {
    resolve(module);
  });
};
const linkus = resolve => {
  //联系我们
  import ("@/components/linkus/linkus").then(module => {
    resolve(module);
  });
};

export default [{
    path: "/",
    meta: {
      title: "首页"
    },
    component: myindex
  },
  {
    path: "/index",
    meta: {
      title: "首页"
    },
    component: myindex
  },
  {
    path: "/newslist",
    meta: {
      title: "新闻动态"
    },
    component: newsList
  },
  {
    path: "/notice",
    meta: {
      title: "通告通知"
    },
    component: notice
  },
  {
    path: "/quality",
    meta: {
      title: "质量监管"
    },
    component: quality
  },
  {
    path: "/hotfocus",
    meta: {
      title: "热点聚焦"
    },
    component: hotfocus
  },
  {
    path: "/law",
    meta: {
      title: "执法公开"
    },
    component: law
  },
  {
    path: "/certification",
    meta: {
      title: "产品认证"
    },
    component: certification
  },
  {
    path: "/warning",
    meta: {
      title: "农情预警"
    },
    component: warning
  },
  {
    path: "/charm",
    meta: {
      title: "魅力定襄"
    },
    component: charm
  },
  {
    path: "/standard",
    meta: {
      title: "标准规范"
    },
    component: standard
  },
  {
    path: "/shoppingmall",
    meta: {
      title: "特色商场"
    },
    component: shoppingmall
  },
  {
    path: "/regulations",
    meta: {
      title: "政策法规"
    },
    component: regulations
  },
  {
    path: "/download",
    meta: {
      title: "资料下载"
    },
    component: download
  },
  {
    path: "/introduction",
    meta: {
      title: "平台简介"
    },
    component: introduction
  },
  {
    path: "/article",
    meta: {
      title: "文章详情"
    },
    component: article,
    children: [{
      path: ":id",
      component: article
    }]
  },
  {
    path: "/productdetail",
    meta: {
      title: "产品详情"
    },
    component: productdetail,
    children: [{
      path: ":id",
      component: productdetail
    }]
  },
  {
    path: "/exchange",
    meta: {
      title: "工作交流"
    },
    component: exchange
  },

  {
    path: "/traceability",
    meta: {
      title: "可追溯企业"
    },
    component: traceability
  },
  {
    path: "/untraceability",
    meta: {
      title: "不可追溯企业"
    },
    component: untraceability
  },
  {
    path: "/redandblack",
    meta: {
      title: "红黑榜"
    },
    component: redandblack
  },
  {
    path: "/origins",
    meta: {
      title: "溯源产品"
    },
    component: origins
  },
  {
    path: "/egoods",
    meta: {
      title: "电商产品"
    },
    component: egoods
  },
  {
    path: "/complain",
    meta: {
      title: "投诉举报"
    },
    component: complain
  },
  {
    path: "/help",
    meta: {
      title: "使用帮助"
    },
    component: help
  },
  {
    path: "/linkus",
    meta: {
      title: "联系我们"
    },
    component: linkus
  }
];
