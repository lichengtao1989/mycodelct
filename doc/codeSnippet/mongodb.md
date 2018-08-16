*test 是我建的一个集合名字
show dbs //显示数据库
use test //使用某个数据库
显示数据库列表
show dbs;
显示当前数据库中的集合（类似关系数据库中的表）
show collections;
显示用户
show users;
切换当前数据库，这和MS-SQL里面的意思一样
user <db name>;

db.test.insert({‘name’:’byc’}) //插入一条记录
db.test.find() //查找所有记录
db.test.findone() //查找一条记录
db.dropDatabase() //删除数据库
db.test.drop //删除指定集合
show collections //显示所有集合
db.createColletion(‘byc’) //创建集合
db.test.save({}) //插入记录db.test.update({‘_id’,1},{$set:{name:’test’,age:20}})
db.test.remove({}) //删除所有集合
for(var i=1;i<=10;i++){db.test.insert({"name":"king"+i,"age":i})} //循环插入10条记录
db.test.find().pretty() //格式化显示查询结果
db.test.find().count() //查询数据条数
db.test.find({"age":5}) /查找age是5的条目
db.test.find({“age”:{$gt:5}}) //查找age大于5的条目
db.test.find({"age":{$gt:5}}).sort({"age":1}) //查找age大于5的条目且升序排列
db.test.find({"age":{$gt:5}}).sort({"age":1}) //查找age大于5的条目且升序排列
db.test.find({"age":{$gt:5}}).sort({"age”:-1}) //查找age大于5的条目且降序排列
