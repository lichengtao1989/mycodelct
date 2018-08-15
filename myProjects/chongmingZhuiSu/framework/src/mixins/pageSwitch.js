/**
 * 获取面包屑中的页面编码列表
 * @param route 路由对象
 * @returns {*}
 */
export function getPageCodeList (route) {
  return route.query['_codes'] ? route.query['_codes'].split(',') : []
}

export function pushPage (route, router, pageCode, pageName, params, type) {
  if (!route || !router || !pageCode) {
    console.error('pushPage缺少必要参数')
    return
  }
  let pageCodeList = getPageCodeList(route)
  if (pageCodeList.includes(pageCode)) {
    console.error(`pushPage异常：'${pageCode}'重复`)
    return
  }
  if (type === 'replace') {
    pageCodeList.pop()
    pageCodeList.push(pageCode)
  } else {
    pageCodeList.push(pageCode)
  }
  let query = {'_codes': pageCodeList.join(',')}
  if (!pageName) {
    pageName = route.query['_' + pageCode + '_name'] || pageCode
  }
  query['_' + pageCode + '_name'] = pageName
  if (params) {
    query['_' + pageCode + '_params'] = JSON.stringify(params)
  }
  query = setRouteQuery(route.query, query)
  if (type === 'replace') {
    router.replace({path: route.path, query: query})
  } else {
    router.push({path: route.path, query: query})
  }
}

/**
 * 根据下标,切换到对应面包屑
 * @param pageIndex
 */
export function switchTo (route, router, pageIndex) {
  let codes = getPageCodeList(route)
  pageIndex = pageIndex < 0 ? 0 : pageIndex
  router.go(-(codes.length - pageIndex))
}
/**
 * 清除多余的参数
 * */
function clearParams (query) {
  let codes = query['_codes'] ? query['_codes'].split(',') : []
  for (let key in query) {
    if (/(^_)+(\w)*(_params$)/.test(key)) {
      let code = key.replace(/^_/, '').replace(/_params$/, '')
      let matchedCode = codes.find((c) => {
        return c === code
      })
      if (!matchedCode) {
        delete query[key]
      }
    }
  }
  return query
}

function setRouteQuery (oldQuery, query) {
  let newQuery = {}
  for (let key in oldQuery) {
    if (oldQuery[key] !== '') {
      newQuery[key] = oldQuery[key]
    }
  }
  for (let key in query) {
    if (query[key] === '') {
      delete newQuery[key]
    } else {
      newQuery[key] = query[key]
    }
  }
  return clearParams(newQuery)
}

export default {
  methods: {
    /**
     * 获取pageCode所对应的数据
     * */
    getPageParams(pageCode){
      let query = this.$route.query
      let paramsStr = query['_' + pageCode + '_params']
      if (paramsStr) {
        return JSON.parse(paramsStr)
      } else {
        return {}
      }
    },
    /**
     * 设置pageCode所对应的数据
     * */
    setPageParams(pageCode, params){
      let newParams = this.getPageParams(pageCode)
      for (let i in params) {
        newParams[i] = params[i]
      }
      let query = {}
      query['_' + pageCode + '_params'] = JSON.stringify(newParams)
      query = setRouteQuery(this.$route.query, query)
      this.$router.replace({path: this.$route.path, query: query}) //设置params用replace防止生成浏览历史记录
    },
    /**
     * 页面切换时调用，每个页面需要自行实现该方法
     * @param pageCodes 整个pageCode数组
     */
    pageSwitched(pageCodes){
      // console.warn('未实现pageSwitched方法');
    },
    /**
     * 推入一个页面（进入下一级）
     * @param pageCode 页面编码，一个页面内需唯一
     * @param pageName 页面名称
     * @param params 参数
     */
    pushPage(pageCode, pageName, params){
      pushPage(this.$route, this.$router, pageCode, pageName, params)
    },
    /*替换页面*/
    replacePage(pageCode, pageName, params){
      pushPage(this.$route, this.$router, pageCode, pageName, params, 'replace')
    },
    /**
     * 推出一个页面（返回上一级）
     */
    popPage(){
      this.$router.go(-1)
    }
  },
  watch: {
    '$route': function (val) {
      let codes = getPageCodeList(val)
      this.pageSwitched(codes)
    }
  },
  created(){
    let codes = getPageCodeList(this.$route)
    this.pageSwitched(codes)
  }
}
