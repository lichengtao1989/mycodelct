/**
 * Created by 67340 on 2017/8/23.
 */
import enumUtil from 'framework/utils/enum'

const enums = [{
  name: '码数据下载状态',
  code: 'codeStatus',
  values: [
    {name: '未下载', value: '0'},
    {name: '未审核', value: '1'},
    {name: '已审核', value: '2'},
    {name: '已下载', value: '3'}
  ]
}];
export default enumUtil.format(enums);
