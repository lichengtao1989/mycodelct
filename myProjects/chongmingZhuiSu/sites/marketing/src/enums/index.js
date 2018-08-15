/**
 * Created by 67340 on 2017/8/23.
 */
import enumUtil from 'framework/utils/enum'

const enums = [{
  name: '活动列表活动状态',
  code: 'activityStatus',
  values: [
    {name: '停用', value: '0'},
    {name: '正常', value: '1'}
  ]
}, {
  name: '提现记录状态',
  values: [
    {name: '申请提现', value: '1'},
    {name: '已发放', value: '2'},
    {name: '已没收', value: '3'}
  ]
}, {
  name: '红包状态',
  values: [
    {name: '发送失败', value: '3'},
    {name: '发送成功', value: '4'}
  ]
}, {
  name: '提现审核',
  values: [
    {name: '是', value: '1'},
    {name: '否', value: '0'}
  ]
}, {
  name: '领取记录状态',
  values: [
    {name: '获取失败', value: '0'},
    {name: '未领取', value: '1'},
    {name: '领取成功', value: '2'}
  ]
}, {
  name: '运营活动-活动类型',
  values: [
    {name: '抽奖', value: '0'}
  ]
}, {
  name: '运营活动-活动状态',
  values: [
    {name: '已启用', value: '1'},
    {name: '已禁用', value: '0'}
  ]
}, {
  name: '运营活动-参与记录状态',
  values: [
    {name: '领完', value: '0'},
    {name: '中奖', value: '1'},
    {name: '未中奖', value: '2'}
  ]
}, {
  name: '抵用码-抵用码条件',
  values: [
    {name: '新客', value: '1'},
    {name: '一次性充值积分', value: '2'},
    {name: '累计充值积分', value: '3'},
    {name: '指定的产品', value: '4'}
  ]
}, {
  name: '抵用码-抵用状态',
  values: [
    {name: '待抵用', value: '1'},
    {name: '已抵用', value: '2'},
    {name: '过期', value: '3'}
  ]
}, {
  name: '活跃度',
  values: [
    {name: '流失', value: '0'},
    {name: '沉睡', value: '1'},
    {name: '活跃', value: '2'}
  ]
}, {
  name: '性别',
  values: [
    {name: '男', value: '1'},
    {name: '女', value: '2'}
  ]
}, {
  name: '兑换券短信状态',
  values: [
    {name: '已通知', value: '1'},
    {name: '未通知', value: '0'}
  ]
}];
export default enumUtil.format(enums);
