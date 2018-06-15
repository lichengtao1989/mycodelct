//异步路由
const myindex = resolve => {
  //首页
  import("@/components/index/myindex").then(module => {
    resolve(module);
  });
};
const newsList = resolve => {
  //新闻动态
  import("@/components/news/list").then(module => {
    resolve(module);
  });
};
const newsDetail = resolve => {
  //新闻详情
  import("@/components/news/detail").then(module => {
    resolve(module);
  });
};
const article = resolve => {
  //文章详情(新闻/通知/工作交流/政策法规)
  import("@/components/article/article").then(module => {
    resolve(module);
  });
};
const notice = resolve => {
  //通告通知
  import("@/components/notice/notice").then(module => {
    resolve(module);
  });
};
const exchange = resolve => {
  //通告通知
  import("@/components/exchange/exchange").then(module => {
    resolve(module);
  });
};
const regulations = resolve => {
  //z政策法规
  import("@/components/regulations/regulations").then(module => {
    resolve(module);
  });
};
const traceability = resolve => {
  //可追溯企业
  import("@/components/traceability/traceability").then(module => {
    resolve(module);
  });
};
const untraceability = resolve => {
  //不可追溯企业
  import("@/components/untraceability/untraceability").then(module => {
    resolve(module);
  });
};
const redandblack = resolve => {
  //红黑榜
  import("@/components/redandblack/redandblack").then(module => {
    resolve(module);
  });
};
const egoods = resolve => {
  //电商产品
  import("@/components/egoods/egoods").then(module => {
    resolve(module);
  });
};
const complain = resolve => {
  //投诉举报
  import("@/components/complain/complain").then(module => {
    resolve(module);
  });
};
const origins = resolve => {
  //投诉举报
  import("@/components/origins/origins").then(module => {
    resolve(module);
  });
};
const help = resolve => {
  //使用帮助
  import("@/components/help/help").then(module => {
    resolve(module);
  });
};
const linkus = resolve => {
  //联系我们
  import("@/components/linkus/linkus").then(module => {
    resolve(module);
  });
};

export default [
  {
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
    path: "/article",
    meta: {
      title: "文章详情"
    },
    component: article,
    children: [
      {
        path: ":id",
        component: article
      }
    ]
  },
  {
    path: "/notice",
    meta: {
      title: "通告通知"
    },
    component: notice
  },
  {
    path: "/exchange",
    meta: {
      title: "工作交流"
    },
    component: exchange
  },
  {
    path: "/regulations",
    meta: {
      title: "政策法规"
    },
    component: regulations
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
