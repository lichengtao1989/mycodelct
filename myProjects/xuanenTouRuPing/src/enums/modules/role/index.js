const roleTypes = [
  { name: '政府', value: '1' },
  { name: '经营主体', value: '2' },
  { name: '运营商', value: '3' }
];
export default [{
  name: '角色类型',
  values: [...roleTypes]
},
{
  name: '政府可新建角色类型',
  values: [roleTypes[0]]
},
{
  name: '经营主体可新建角色类型',
  values: [roleTypes[1]]
},
{
  name: '运营商可新建角色类型',
  values: [roleTypes[0], roleTypes[1], roleTypes[2]]
}
];
