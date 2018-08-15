import enumUtil from 'framework/utils/enum'

const enums = [{
  name: '性别',
  values: [
    { name: '男', value: '1' },
    { name: '女', value: '2' }
  ]
}, {
  name: '是否',
  values: [
    { name: '是', value: '1' },
    { name: '否', value: '0' }
  ]
}, {
  name: '启用禁用',
  values: [
    { name: '启用', value: '1' },
    { name: '禁用', value: '0' }
  ]
}, {
  name: '机构类型',
  code: 'orgType',
  values: [
    { name: '总部', code: 'HEAD', value: '1' },
    { name: '子公司', code: 'CHILD_CORP', value: '2' },
    { name: '经销商', code: 'DEALER', value: '3' },
    { name: '门店', code: 'SHOP', value: '4' },
    { name: '库房', code: 'STOCK_HOUSE', value: '5' },
    { name: '子门店', code: 'CHILD_SHOP', value: '10' },
    { name: '政府', code: 'GOVERNMENT', value: '15' },
    { name: '企业', code: 'COMPANY', value: '16' },
    { name: '农场', code: 'FARM', value: '25' }
  ]
}, {
  name: '组织类型',
  code: 'corpType',
  values: [
    { name: '企业', code: 'CORP', value: '1' },
    { name: '运营商', code: 'OPERATORS', value: '2' },
    { name: '政府', code: 'GOVERNMENT', value: '3' },
    { name: '检测公司', code: 'TESTING_COMPANY', value: '4' },
    { name: '保险公司', code: 'INSURANCE_COMPANY', value: '5' },
    { name: '印刷工厂', code: 'PRINTING_FACTORY', value: '6' }
  ]
}, {
  name: '投入品类型',
  values: [
    { name: '种苗', value: '1' },
    { name: '肥料', value: '2' },
    { name: '农药', value: '3' },
    { name: '饲料', value: '4' },
    { name: '兽药', value: '5' },
    { name: '生产耗材', value: '6' },
    { name: '加工原材料', value: '7' },
    { name: '设备器械', value: '8' }
  ]
}, {
  name: '投入品入库类型',
  values: [
    { name: '采购入库', value: '1' },
    { name: '生产入库', value: '2' },
    { name: '收货入库', value: '3' },
    { name: '其它入库', value: '9' }
  ]
}, {
  name: '投入品出库类型',
  values: [
    { name: '生产使用', value: '11' },
    { name: '销售出库', value: '12' },
    { name: '过期退货', value: '13' },
    { name: '报废出库', value: '14' },
    { name: '调拨出库', value: '15' }
  ]
}, {
  name: '溯源记录排序',
  values: [
    { name: '按溯源节点顺序', value: '1' },
    { name: '按溯源节点逆序', value: '2' },
    { name: '按操作时间顺序', value: '3' },
    { name: '按操作时间逆序', value: '4' }
  ]
}, {
  name: '溯源节点选项内容',
  values: [
    { name: '机构列表', value: '1' },
    { name: '产品列表', value: '2' },
    { name: '批次列表', value: '3' },
    { name: '用户列表', value: '4' },
    { name: '员工列表', value: '8' }, //
    { name: '地块列表', value: '5' },
    { name: '投入品列表', value: '6' },
    { name: '监控列表', value: '7' }
  ]
}, {
  name: '溯源节点类型',
  values: [
    { name: '原料节点', value: '1' },
    { name: '生产节点', value: '2' },
    { name: '加工节点', value: '3' },
    { name: '流通节点', value: '4' },
    { name: '销售节点', value: '5' },
    { name: '其他节点', value: '6' }
  ]
}, {
  name: '溯源文字节点单位',
  values: [
    { name: '无单位', value: '' },
    { name: '斤', value: '斤' },
    { name: '公斤', value: '公斤' },
    { name: '毫升', value: '毫升' },
    { name: '日', value: '日' },
    { name: '月', value: '月' },
    { name: '年', value: '年' },
    { name: '小时', value: '小时' },
    { name: '分钟', value: '分钟' },
    { name: '元', value: '元' }
  ]
}, {
  name: '批次创建方式',
  values: [
    { name: '自动', value: '1' },
    { name: '手动', value: '0' }
  ]
}, {
  name: '安全保障方式',
  values: [
    { name: '自检合格', value: '0' },
    { name: '委托检测合格', value: '1' },
    { name: '质量控制合格', value: '2' },
    { name: '自我承诺合格', value: '3' }
  ]
}, {
  name: '保险类型',
  values: [
    { name: '综合险', value: '1' },
    { name: '基础险', value: '2' }
  ]
}, {
  name: '保险审核状态',
  values: [
    { name: '已撤销', value: '1' },
    { name: '审核中', value: '2' },
    { name: '审核成功', value: '3' },
    { name: '审核失败', value: '4' },
    { name: '赔付成功', value: '5' },
    { name: '赔付失败', value: '6' }
  ]
}, {
  name: '审核状态',
  values: [
    { name: '草稿', value: '0' },
    { name: '审核中', value: '1' },
    { name: '审核未通过', value: '2' },
    { name: '审核通过', value: '3' },
    { name: '承保失败', value: '4' },
    { name: '已承保', value: '5' }
  ]
}, {
  name: '气象类型',
  values: [
    { name: '气象一体机', value: '0' },
    { name: '国家气象', value: '1' },
    { name: '综合气象', value: '2' }
  ]
}, {
  name: '参数选择',
  values: [
    { name: '蒸发量', value: '0' },
    { name: '二氧化碳', value: '1' },
    { name: '光有效辐射', value: '2' },
    { name: '土壤PH值', value: '3' },
    { name: '土壤盐分', value: '4' },
    { name: '土壤温度', value: '5' },
    { name: '土壤湿度', value: '6' },
    { name: '氨气', value: '7' },
    { name: '硫化氢', value: '8' },
    { name: 'PM 10', value: '9' }
  ]
}, {
  name: '层级',
  values: [
    { name: '一层', value: '1' },
    { name: '二层', value: '2' },
    { name: '三层', value: '3' },
    { name: '四层', value: '4' }
  ]
}, {
  name: '折叠分类',
  values: [
    { name: '不归类', value: '0' },
    { name: '按同节点名归类', value: '1' },
    { name: ' 按同节点类型归类', value: '2' }
  ]
}, {
  name: '显示方式',
  values: [
    { name: '展开', value: '0' },
    { name: '折叠', value: '1' }
  ]
}, {
  name: '审核结果',
  values: [
    { name: '审核通过', value: '3' },
    { name: '已承保', value: '5' },
    { name: '审核未通过', value: '2' },
    { name: '承保失败', value: '4' }
  ]
}, {
  name: '审批模块',
  values: [
    { name: '溯源记录', value: '1' }
  ]
}, {
  name: '审批状态',
  values: [
    { name: '已撤销', value: '0' },
    { name: '已审批', value: '1' },
    { name: '待审批', value: '2' }
  ]
}, {
  name: '优先级',
  values: [
    { name: '一般', value: '1' },
    { name: '中等', value: '2' },
    { name: '紧急', value: '3' }
  ]
}, {
  name: '审批结果',
  values: [
    { name: '拒绝', value: '0' },
    { name: '通过', value: '1' }
  ]
}, {
  name: '基地单位',
  values: [
    { name: '平方米', value: '0' },
    { name: '亩', value: '1' },
    { name: '公顷', value: '2' }
  ]
}, {
  name: '区域气候',
  values: [
    { name: '热带季风气候', value: '0' },
    { name: '亚热带季风气候', value: '1' },
    { name: '温带季风气候', value: '2' },
    { name: '温带大陆性气候', value: '3' },
    { name: '高原山地气候', value: '4' }
  ]
}, {
  name: '分区类型',
  code: 'areaType',
  values: [
    { name: '地块', value: '0', code: '地块' },
    { name: '圈舍', value: '1', code: '圈舍' },
    { name: '放养', value: '2', code: '放养区' },
    { name: '水面', value: '3', code: '养殖区' },
    { name: '其它', value: '4', code: '分区' }
  ]
}, {
  name: '判定结果',
  code: 'decisionResult',
  values: [
    { name: '合格', value: '合格' },
    { name: '不合格', value: '不合格' }
  ]
}, {
  name: '崇明乡镇',
  values: [
    { value: '1', name: '城桥镇' },
    { value: '2', name: '堡镇' },
    { value: '3', name: '新河镇' },
    { value: '4', name: '庙镇' },
    { value: '5', name: '竖新镇' },
    { value: '6', name: '向化镇' },
    { value: '7', name: '三星镇' },
    { value: '9', name: '中兴镇' },
    { value: '10', name: '陈家镇' },
    { value: '11', name: '绿华镇' },
    { value: '12', name: '港西镇' },
    { value: '13', name: '建设镇' },
    { value: '14', name: '新海镇' },
    { value: '15', name: '东平镇' },
    { value: '16', name: '长兴镇' },
    { value: '17', name: '新村乡' },
    { value: '18', name: '横沙乡' }
  ]
}, {
  name: '崇明检查结果',
  values: [
    { name: '有', value: '1' },
    { name: '无', value: '2' },
    { name: '不完善', value: '3' }
  ]
}, {
  name: '崇明合理使用农业投入品',
  values: [
    { name: '有', value: '1' },
    { name: '无', value: '2' },
    { name: '不完善', value: '3' }
  ]
}, {
  name: '视频监控',
  values: [
    { name: '新弘站', value: '1000004' },
    { name: '万禾站', value: '1000005' },
    { name: '北湖站', value: '1000006' },
    { name: '春润站', value: '1000007' },
    { name: '新平站', value: '1000008' }
  ]
}];

export default enumUtil.format(enums);
