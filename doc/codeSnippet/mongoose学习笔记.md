## 准备

### 简介

MongoDB 是一个基于分布式文件存储的数据库。由 C++ 语言编写。旨在为 WEB 应用提供可扩展的高性能数据存储解决方案。  
MongoDB 是一个介于关系数据库和非关系数据库之间的产品，是非关系数据库当中功能最丰富，最像关系数据库的。  
跟关系型数据库的区别

| SQL术语/概念    | MongoDB术语/概念 | 解释/说明                   |
| ----------- | ------------ | ----------------------- |
| database    | database     | 数据库                     |
| table       | collection   | 数据库表/集合                 |
| row         | document     | 数据记录行/文档                |
| column      | field        | 数据字段/域                  |
| index       | index        | 索引                      |
| table joins | index        | 表连接,MongoDB不支持          |
| primary key | primary key  | 主键,MongoDB自动将_id字段设置为主键 |

### 安装

在[官网](https://www.mongodb.com/)或者[http://dl.mongodb.org/dl/win32/x86_64](http://dl.mongodb.org/dl/win32/x86_64)下载安装（官网速度慢）

### 启动

在MongoDB的下的bin目录使用命令行工具，mongod --dbpath “D:\mongodb\data\db” 来启动MongoDB  
参数 　　　　　　　　　　　描述  
–bind_ip　　 　　　　　　绑定服务IP，若绑定127.0.0.1，则只能本机访问，不指定默认本地所有IP  
–logpath 　　　　　　　　定MongoDB日志文件，注意是指定文件不是目录  
–logappend 　　 　　　　 使用追加的方式写日志  
–dbpath 　　　　　　　　 指定数据库路径  
–port 　　　　　 　　　　 指定服务端口号，默认端口27017  
–serviceName 　　　　 指定服务名称  
–serviceDisplayName 　　指定服务名称，有多个mongodb服务时执行。  
–install 　　　　　　　　 指定作为一个Windows服务安装。

### 可视化工具robo3T

在官网[官网](https://robomongo.org/)下载安装  
使用robo3T连接mongodb

## 开始使用nodejs-mongoose操作mongodb

### nodejs相关驱动的介绍

npm模块包的：mongodb和mongoose都是nodejs操作mongodb的driver（驱动）  
mongoose是基于mongodb的；使用mongoose比mongodb要来的方便  
这里就只学习mongoose的相关操作，mongodb可以去[http://www.runoob.com/nodejs/nodejs-mongodb.html](http://www.runoob.com/nodejs/nodejs-mongodb.html)学习了解

### 快速开始mongoose

接下来使用命令行安装mongoose

```
cnpm install mongoose
```

### 连接数据库

`const mongoose = require('mongoose'); // 引入mongoose

mongoose.connect('mongodb://localhost/test'); // 连接数据库
var db = mongoose.connection; // 获得数据库连接的实例

// 数据库连接成功或者失败调用的事件
db.on('error', console.error.bind(console, '连接失败:'));
db.once('open', function() {
    console.log('连接成功');
});` 

### 创建Model（表）

在Mongoose中，一切都是从Schema(模式)而来。Schema可以理解为一个表格的结构或者骨架（有哪些字段，字段的类型），而Schema并不具备操作数据库的能力；  
而Model可以理解为是一个表，需要通过mongoose.model()来创建，该方法的第二个参数需要传入一个Schema来定义它的结构

`// 获取Schema实例，来定义某一个model（）的结构
let Schema = mongoose.Schema;
// 通过new Schema()定义数据库模型骨架
blogSchema = new Schema({
    title: String,
    author: String,
    body: String,
    comments: [{
        body: String,
        data: Date
    }],
    date: {
        type: Date, default: Date.now
    },
    hidden: Boolean,
    meta: {
        votes: Number,
        favs: Number
    }
});
// 通过mongoose.model()来创建一个Blog的model（相当于一个表）
let Blog = mongoose.model('Blog',blogSchema); 
/*
let tempSchema = new mongoose.Schema({定义一个表的结构})
let temModel = new mongoose.model('表的名字', tempSchema)

Schema和Model可以理解为是同一个级别的方法，只是定义Model需要一个Schema实例
*/` 

### 文档新增操作

文档新增有三种方法，一种是使用上面介绍过的文档的save()方法，另一种是使用模型model的create()方法，最后一种是模型model的insertMany()方法  
`save()`  
使用save()方法，需要先实例化为文档，而实例化一个文档时不能一次传入多个文档

`// 获取一个文档(表里的行)的实例
// 一个new Blog 对应一条blogs表里的数据；ps：这里的Blog由上一个代码片段而来
let blog1 = new Blog({
    title: 'test2',
    author: 'wade',
    body: 'testbody',
    hidden: false
});
blog1.save((err, doc) => {
    if (err) return console.log(err);
    console.log(doc + '保存成功');
})
// 还可以使用链式调用，效果同上
new Blog({
    title: 'test2',
    author: 'wade',
    body: 'testbody',
    hidden: false
}).save((err, doc) => {
    if (err) return console.log(err);
    console.log(doc + '保存成功');
})
// save()方法也支持promise写法
new Blog({
    title: 'test2',
    author: 'wade',
    body: 'testbody',
    hidden: false
}).save().then((doc) => { // promise成功才会执行then，失败则执行reject；所有此处没有err参数
    console.log('写入成功' + doc);
})` 

`create()`  
使用save()方法，需要先实例化为文档，再使用save()方法保存文档。而create()方法，则直接在模型Model上操作，并且可以同时新增多个文档

`Blog.create(
    {
    title: 'new bolg-create1',
    author: 'wade'
    },
    {
    title: 'new bolg-create2'
    },
    function(err, doc) {
        if (err) return console.log(err);
        console.log('写入成功', doc);
    }
)
// create()的promise写法
Blog.create(
    {
    title: 'new bolg-create2'
    },
    {
    title: 'new bolg-create1',
    author: 'wade'
    }
    ).then(function(doc) {
        console.log('写入成功', doc);
    })` 

`insertMany()`  
如果要存多个文档，第一个参数需要是一个对象数组,形如\[{},{},…\]

`Blog.insertMany([
        {
        title: 'new bolg-insertMany1'
        },
        {
            title: 'new bolg-insertMany2'
        },
        {
            title: 'new bolg-insertMany3'
        }],
    function(err, doc) {
        if (err) return console.log(err);
        console.log('写入成功', doc);
    }
)
// insertMany()的promise写法
Blog.insertMany([
    {
    title: 'new bolg-insertMany4'
    },
    {
        title: 'new bolg-insertMany5'
    },
    {
        title: 'new bolg-insertMany6'
    }]).then(function(doc) {
        console.log('写入成功', doc);
    })` 

### 文档查询

使用Mongoose来查找文档很容易，有以下3种方法可供选择

> find()  
findById()  
findOne()

`find()`  
第一个参数表示查询条件，第二个参数用于控制返回的字段，第三个参数用于配置查询参数，第四个参数是回调函数，回调函数的形式为function(err,docs){}  
Model.find(conditions, \[projection\], \[options\], \[callback\])

`// 找出所有数据
Blog.find((err, docs) => {
    console.log(docs);
})
// promise写法
Blog.find().then((docs) => {
    console.log(docs);
})

// 完全匹配
Blog.find(
    {
        title: 'new bolg-insertMany6'
    },
    (err, docs) => {
    console.log(docs);
})

// title 包含 ‘new bolg-insertMany’ 都能被匹配出来
Blog.find(
    {
        title: /new bolg-insertMany/
    },
    (err, docs) => {
    console.log(docs);
})

文档查询中，常用的查询条件如下

/*
$or　　　　或关系
$nor　　　 或关系取反
$gt　　　　大于
$gte　　　 大于等于
$lt　　　　 小于
$lte　　　  小于等于
$ne            不等于
$in             在多个值范围内
$nin           不在多个值范围内
$all            匹配数组中多个值
$regex　　正则，用于模糊查询
$size　　　匹配数组大小
$maxDistance　　范围查询，距离（基于LBS）
$mod　　   取模运算
$near　　　邻域查询，查询附近的位置（基于LBS）
$exists　　  字段是否存在
$elemMatch　　匹配内数组内的元素
$within　　范围查询（基于LBS）
$box　　　 范围查询，矩形范围（基于LBS）
$center       范围醒询，圆形范围（基于LBS）
$centerSphere　　范围查询，球形范围（基于LBS）
$slice　　　　查询字段集合中的元素（比如从第几个之后，第N到第M个元素）
*/

// 找出follow数大于等于5的
Blog.find(
    {
        follow: {$gte:5}
    },
    (err, docs) => {
    console.log(docs);
})
// 找出follow大于等于7的且title包含3的
Blog.find(
    {
        title:/3/,
        follow: {$gte:7}
    },
    (err, docs) => {
    console.log(docs);
})
// 找出follow大于等于7的且title包含3的
// 只输出title字段；单自动生成的id字段还是会被查询出来
Blog.find(
    {
        title:/3/,
        follow: {$gte:7}
    },
    'title',
    (err, docs) => {
    console.log(docs);
})
// 如果不需要id字段，需要进行以下配置
Blog.find(
    {
        title:/3/,
        follow: {$gte:7}
    },
    {
        title: 1,
        _id: 0
    },
    (err, docs) => {
    console.log(docs);
})

找出跳过前2条数据的其他所有数据
[注意]如果使用第三个参数，前两个参数如果没有值，需要设置为null
Blog.find(null,null,
    {
        skip: 2
    },
    (err, docs) => {
    console.log(docs);
})` 

`findById()`  
Model.findById(id, \[projection\], \[options\], \[callback\])

`// 找出id为'5aa4c6cc0b02613ae0a358a5'的所有字段
Blog.findById('5aa4c6cc0b02613ae0a358a5', (err, docs) => {
    console.log(docs);
})
// 以上代码的另一种写法
Blog.findById('5aa4c6cc0b02613ae0a358a5').exec((err, docs) => {
    console.log(docs);
})

// 经测试promis写法也是可行的
Blog.findById('5aa4c6cc0b02613ae0a358a6').then((docs) => {
    console.log(docs);
})
// 只输出title字段；这里用的是promise写法；
// 回调函数写法为Blog.findById('5aa4c6cc0b02613ae0a358a6',{title: 1, _id: 0},callback)
// 用.exec方法也行
Blog.findById('5aa4c6cc0b02613ae0a358a6', {title: 1, _id: 0}).then((docs) => {
    console.log(docs);
})
// {lean: true} 输出最少的字段，这个不太理解，只返回_id字段？？
Blog.findById('5aa4d19e3bee1c3ed4eb7e21', {lean: true}).then((docs) => {
    console.log(docs);
})` 

`findOne()`  
该方法返回查找到的所有结果实例的第一个  
Model.findOne(\[conditions\], \[projection\], \[options\], \[callback\])

`// 找到title包含bolg的所有结果中的第一个
Blog.findOne({title: /bolg/}, (err, doc) => {
    console.log(doc);
})
//找到所有follow大于等于三的结果，取第一个
//如果返回{follow: 7},{follow: 3},取得是{follow: 7}，因为它在结果中排在第一位
Blog.findOne({follow: {$gte: 3}}, (err, doc) => {
    console.log(doc);
})
// promise写法
Blog.findOne({follow: {$gte: 3}}).then((doc) => {
    console.log(doc);
})
// exec写法
Blog.findOne({follow: {$gte: 3}}).exec((err, doc) => {
    console.log(doc);
})
// 只返回title字段，这种写法_id也会被返回
Blog.findOne({follow: {$gte: 3}}, 'title', (err, doc) => {
    console.log(doc);
})
// 这种写法就只会返回title
Blog.findOne({follow: {$gte: 3}}, {title: 1, _id: 0}, (err, doc) => {
    console.log(doc);
})

//找到所有follow大于等于三的结果，取第一个,且输出包含title字段在内的最短字段(不明白)
Blog.findOne({follow: {$gte: 3}}, 'title', {lean: true}, (err, doc) => {
    console.log(doc);
})
// exec写法
Blog.findOne({follow: {$gte: 3}}, 'title').lean().exec((err, doc) => {
    console.log(doc);
}))` 

`$where()`  
如果要进行更复杂的查询，需要使用where操作符，where操作符功能强大而且灵活，它可以使用任意的JavaScript作为查询的一部分，包含JavaScript表达式的字符串或者JavaScript函数

`//使用字符串写法
// 找到title等于test的所有结果
Blog.find({$where: 'this.title == "test"'}, (err, docs) => {
    console.log(docs);
})
// 使用$where()方法写法
Blog.$where('this.title === "test"').exec((err, docs) => {
    console.log(docs);
   })
// title要完全相等
Blog.$where('this.title === "new bolg-create5"').exec((err, docs) => {
    console.log(docs);
   })
// 使用函数写法
Blog.find({
    $where: function () {
        return this.title === 'test'
    }
    }, (err, docs) => {
    console.log(docs);
}) 

Blog.$where(() => {
    return this.title === 'test'
}).exec((err, docs) => {
    console.log(docs);
   })` 

### 文档更新

文档更新可以使用以下几种方法

> update()  
updateMany()  
find() + save()  
updateOne()  
findOne() + save()  
findByIdAndUpdate()  
fingOneAndUpdate()

`update()`  
第一个参数conditions为查询条件，第二个参数doc为需要修改的数据，第三个参数options为控制选项，第四个参数是回调函数

> Model.update(conditions, doc, \[options\], \[callback\])

options有如下选项

> safe (boolean)： 默认为true。安全模式。  
upsert (boolean)： 默认为false。如果不存在则创建新记录。  
multi (boolean)： 默认为false。是否更新多个查询记录。  
runValidators： 如果值为true，执行Validation验证。  
setDefaultsOnInsert： 如果upsert选项为true，在新建时插入文档定义的默认值。  
strict (boolean)： 以strict模式进行更新。  
overwrite (boolean)： 默认为false。禁用update-only模式，允许覆盖记录。

 `// 把follow的值在7以上的更新为8；但是multi默认是false；所以一下写法只会修改匹配结果的第一项
Blog.update({follow: {$gte: 7}}, {follow: 8} , (err, raw) => {
    console.log(raw);//{ n: 1, nModified: 1, ok: 1 }
})
// 把multi设置为true；则可以把所有匹配项都修改
Blog.update({follow: {$gte: 7}}, {title: 'change'} , {multi: true}, (err, raw) => {
    console.log(raw);//{ n: 2, nModified: 2, ok: 1 }
})
// promise写法
Blog.update({follow: {$gte: 7}}, {title: 'change'} , {multi: true}).then((raw) => {
    console.log(raw);
})
// 如果查找条件匹配不到数据，则默认什么都不会发生
Blog.update({follow: {$gte: 11}}, {title: '666'} , {multi: true}).then((raw) => {
    console.log(raw);
})
// 如果设置options里的upsert参数为true，若没有符合查询条件的文档，mongo将会综合第一第二个参数向集合插入一个新的文档
Blog.update({follow: 11}, {title: '666'} , {multi: true, upsert: true}).then((raw) => {
    // 插入一个新的{follow: 11, title: '666'}
    console.log(raw);
})` 

> \[注意\]update()方法中的回调函数不能省略，否则数据不会被更新。如果回调函数里并没有什么有用的信息，则可以使  
用exec()或then()简化代码

`Blog.update({title: '666'}, {title: '777'} , {multi: true}).exec();
Blog.update({title: '666'}, {title: '777'} , {multi: true}).then();` 

`updateMany()`  
updateMany()与update()方法唯一的区别就是默认更新多个文档，即使设置{multi:false}也无法只更新第一个文档

> Model.updateMany(conditions, doc, \[options\], \[callback\])

`// 把title里带有new的全都修改为777；
// 这里的{multi: false}不用写；这里是为了演示{multi: false}参数在updateMany方法里是无效的
Blog.updateMany({title: /new/}, {title: '777'} , {multi: false}).then((raw) => {
    console.log(raw);
})` 

> 如果需要更新的操作比较复杂，可以使用find()+save()方法来处理

`/* 复杂操作 */
// 把follow大于等于9的title拼接上一个'50'
Blog.find({follow: {$gte: 9}}).then((docs) => {
    docs.forEach((item) => {
        item.title += '50'
        item.save()
    } )
})` 

`updateOne()`

> updateOne()方法只能更新找到的第一条数据，即使设置{multi:true}也无法同时更新多个文档

`// 这里的{multi: true}不用写；这里是为了演示{multi: true}参数在updateOne方法里是无效的
Blog.updateOne({follow: {$gte: 7}}, {title: 'one'} , {multi: true}, (err, raw) => {
    console.log(raw); //{ n: 1, nModified: 1, ok: 1 }
})` 

> 如果需要更新的操作比较复杂，可以使用findOne()+save()方法来处理

`/* 复杂操作 */
// 找到follow为7的数据，把它的follow加100
Blog.findOne({follow: 7}, (err, doc) => {
    console.log(doc);
    doc.follow += 100;
    doc.save();
})` 

> 还有两个查询加更新的方法  
Model.findOneAndUpdate(conditions, update, options, callback)  
Model.findByIdAndUpdate(id, update, options, callback)

### 文档删除

有三种方法用于文档删除

> remove()  
findOneAndRemove()  
findByIdAndRemove()

`remove()`

> model.remove(conditions, \[callback\])  
document.remove(\[callback\])

remove有两种形式，  
一种是文档(doc;就是new Model出来后的实例)的remove()方法，  
一种是Model(Model;由new mongoose.model()出来的一个‘类’)的remove()方法;  
下面介绍Model的remove()方法:  
该方法的第一个参数conditions为查询条件，第二个参数回调函数的形式如下function(err){}

`// 如果conditions没有传，则删除所有文档数据
Blog.remove((err) => {
    console.log(err);
})
// conditions有传的话，则删除所有满足条件的数据
Blog.remove({follow: {$gte: 7}}, (err) => {
    console.log(err);
})` 

> \[注意\]remove()方法中的回调函数不能省略，否则数据不会被删除。当然，可以使用exec()或then()方法来简写代码

`Blog.remove({follow: {$gte: 7}}).exec();
Blog.remove({follow: {$gte: 7}}).then();` 

下面介绍文档的remove()方法，该方法的参数回调函数的形式如下function(err,doc){}

`// 这里因为经过Model.find方法查询出符合的文档，所以文档的remove方法不需要conditions
// 而且该方法的callback是可以省略的
Blog.find({follow: {$gte: 7}}, (err, docs) => {
    docs.forEach((item) => {
        item.remove((err, doc) => {
            console.log(doc);
        });
    })
})` 

> \[注意\]文档的remove()方法的回调函数参数可以省略

`Blog.find({follow: {$gte: 7}}, (err, docs) => {
    docs.forEach((item) => {
        item.remove();
    })
})` 

`findOneAndRemove()`  
model的remove()会删除符合条件的所有数据，如果只删除符合条件的第一条数据，则可以使用model的findOneAndRemove()方法

> Model.findOneAndRemove(conditions, \[options\], \[callback\])

排序sort的配置；

> asc 升序  
desc 降序  
或者  
1 升序  
-1 降序

`// 找到所有title有bolg的文档，降序排序，然后只删除第一个
Blog.findOneAndRemove({title: /bolg/}, {sort: {follow: -1}}, (err, doc) => {
    console.log(doc);
})` 

> 与model的remove()方法相同，回调函数不能省略，否则数据不会被删除。  
当然，可以使用exec()或then()方法来简写代码

`Blog.findOneAndRemove({title: /bolg/}, {sort: {follow: -1}}).then()
Blog.findOneAndRemove({title: /bolg/}, {sort: {follow: -1}}).exec()` 

`findByIdAndRemove()`  
使用方法基本上同findOneAndRemove一样，只是把conditions换成了id

> Model.findByIdAndRemove(id, \[options\], \[callback\])

### 前后钩子

前后钩子即pre()和post()方法，又称为中间件，是在执行某些操作时可以执行的函数。中间件在schema上指定，类似于静态方法或实例方法等

可以在数据库执行下列操作时，设置前后钩子

> init  
validate  
save  
remove  
count  
find  
findOne  
findOneAndRemove  
findOneAndUpdate  
insertMany  
update

`pre()`  
以find()方法为例，在执行find()方法之前，执行pre()方法

`// 定义数据库模型骨架
let Schema = mongoose.Schema;
blogSchema = new Schema({
    title: String,
    author: String,
    body: String,
    follow: Number,
    comments: [{
        body: String,
        data: Date
    }],
    date: {
        type: Date, default: Date.now
    },
    hidden: Boolean,
    meta: {
        votes: Number,
        favs: Number
    }
});
// 该钩子会在执行find查找之前触发，调用next传给下一个中间件（如果有的话）
// 知道没有中间件了则开始执行find操作
// 如果没有调用next则不会向下传递，也就不会开始find操作
blogSchema.pre('find', (next) => {
    console.log('pre操作1');
    next();
})
blogSchema.pre('find', (next) => {
    console.log('pre操作2');
    next();
})
blogSchema.pre('find', (next) => {
    console.log('pre操作3');
    next();
})

// 这里需要调用find()

/*
--pre操作1
--pre操作2
--pre操作3

然后执行find操作
*/` 

`post()`  
post()方法并不是在执行某些操作后再去执行的方法，  
而是在**执行某些操作前最后执行的方法**，post()方法里不可以使用next()

`// 定义数据库模型骨架
let Schema = mongoose.Schema;
blogSchema = new Schema({
    title: String,
    author: String,
    body: String,
    follow: Number,
    comments: [{
        body: String,
        data: Date
    }],
    date: {
        type: Date, default: Date.now
    },
    hidden: Boolean,
    meta: {
        votes: Number,
        favs: Number
    }
});
blogSchema.pre('find', (next) => {
    console.log('pre操作1');
    next();
})
blogSchema.pre('find', (next) => {
    console.log('pre操作2');
    next();
})
blogSchema.post('find', () => {
    console.log('post操作1');
})
blogSchema.pre('find', (next) => {
    console.log('pre操作3');
    next();
})
blogSchema.post('find', () => {
    console.log('post2操作');
})

// 这里需要调用find()

/*
--pre操作1
--pre操作2
--pre操作3
--post操作1
--post操作2

然后执行find操作
*/` 

### 查询后处理

常用的查询后处理的方法如下所示

> sort 排序  
skip 跳过  
limit 限制  
select 显示字段  
exec 执行  
count 计数  
distinct 去重

`sort()`

排序sort的配置；

> asc 升序  
desc 降序  
或者  
1 升序  
-1 降序

`// 作为find方法的参数的写法；
Blog.find(null,null,{sort: {follow: 1}},(err, docs) => {
    console.log(docs);
})
// sort()方法的写法
Blog.find().sort({follow: 1}).then((docs) => {
    console.log(docs);
})
Blog.find().sort({follow: 1}).exec((err, docs) => {
    console.log(docs);
})
// 下面这种写法也可以
Blog.find().sort('-follow').then((docs) => {
    console.log(docs);
})` 

`skip()`

`// 作为find方法的参数的写法；
Blog.find(null,null,{skip: 2},(err, docs) => {
    console.log(docs);
})
// skip()方法的写法
Blog.find().skip(2).then((docs) => {
    console.log(docs);
})
Blog.find().skip(2).exec((err, docs) => {
    console.log(docs);
})` 

`limit()`

`// 作为find方法的参数的写法；
Blog.find(null,null,{limit: 2},(err, docs) => {
    console.log(docs);
})
// skip()方法的写法
Blog.find().limit(2).then((docs) => {
    console.log(docs);
})
Blog.find().limit(2).exec((err, docs) => {
    console.log(docs);
})` 

`select()`

`// 只显示title字段，默认会加上_id
Blog.find().select('title').then((docs) => {
    console.log(docs);
})
// 只显示title字段，不显示_id
Blog.find().select('title -_id').then((docs) => {
    console.log(docs);
})
// 对象作为参数写法
Blog.find().select({title: 1, _id: 0}).then((docs) => {
    console.log(docs);
})` 

将上面的方法结合起来使用

`// 根据follow升序排列，跳过第一个文档，只显示两个文档，只显示title,follow字段
Blog.find().sort({follow: 1})
.skip(1)
.limit(2)
.select({title: 1,follow: 1, _id: 0})
.then((docs) => {
    console.log(docs);
})` 

`count()`  
显示集合Model中的文档数量

`Blog.find().sort({follow: 1}).skip(1).count((err, count) => {
    console.log(count);
})
// 相当于
Blog.find().sort({follow: 1}).skip(1).then((docs) => {
    console.log(docs.length);
})` 

`distinct()`  
返回Model中的相应字段的**不重复**的值

`// ex:Blog: [{follow:1},{follow:1},{follow:2},{follow:3},{follow:3},{follow:5}]
Blog.find().distinct('follow', (err, distinct) => {
    console.log(distinct); // [1,2,3,5]
})` 

### 文档验证

常用验证包括以下几种

> required: 数据必须填写  
default: 默认值  
validate: 自定义匹配  
min: 最小值(只适用于数字)  
max: 最大值(只适用于数字)  
match: 正则匹配(只适用于字符串)  
enum: 枚举匹配(只适用于字符串)

`required`

`let Schema = mongoose.Schema;
valiSchema = new Schema({
    title: { // 这里把title设置为required，在添加文档时必须要有title字段，否则报错
        type: String,
        required: true
    },
    author: String,
    body: String,
    follow: Number

});
// 报错
Vali.create({follow:1}).then((doc) => {
    console.log(doc);
})
// 添加成功
Vali.create({follow:1,title: 'test'}).then((doc) => {
    console.log(doc);
})` 

`default`

`valiSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: String,
    body: String,
    follow: {
        type: Number,
        default:2 // 这里给follow字段设置了默认值，在添加文档时如果没有传，会自动设置为默认值
                  // 在没有设置默认值的情况下，如果没有传该字段，则该字段为空
    }
});` 

`min | max`

`let Schema = mongoose.Schema;
valiSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: String,
    body: String,
    follow: {
        type: Number,
        min:1, // 这里给follow字段设置了最大值和最小值，如果超出这个范围，则会报错
        max:5
    }
});
// 报错
Vali.create({title: 'test2', follow: 6}).then((doc) => {
    console.log(doc);
})
// 正常添加
Vali.create({title: 'test2', follow: 2}).then((doc) => {
    console.log(doc);
})` 

`match`

`let Schema = mongoose.Schema;
valiSchema = new Schema({
    title: {
        type: String,
        required: true,
        match: /blog/ // 这里给title字段设置了match，需要title包含 blog 才能正常添加
    },
    author: String,
    body: String,
    follow: {
        type: Number,
        min:1,
        max:5
    }
});
// 报错
Vali.create({title: 'test2', follow: 2}).then((doc) => {
    console.log(doc);
})
// 正常添加
Vali.create({title: 'blog somelse', follow: 2}).then((doc) => {
    console.log(doc);
})` 

`enum`  
只能在enum枚举的范围内取值，否则爆粗

 `let Schema = mongoose.Schema;
valiSchema = new Schema({
    title: {
        type: String,
        required: true,
        enum:['available1','available2','available3']
        // 只能在这三个值当中取值设置title，否则报错
    },
    author: String,
    body: String,
    follow: {
        type: Number,
        min:1,
        max:5
    }
});
// 报错
Vali.create({title: 'anytext', follow: 2}).then((doc) => {
    console.log(doc);
})
// 正常添加
Vali.create({title: 'available1', follow: 2}).then((doc) => {
    console.log(doc);
})` 

`validate`  
validate实际上是一个函数，函数的参数代表当前字段，  
返回true表示通过验证，返回false表示未通过验证。  
利用validate可以自定义任何条件。

`let Schema = mongoose.Schema;
valiSchema = new Schema({
    title: {
        type: String,
        required: true,
        enum:['available1','available2','available3']
    },
    author: String,
    body: String,
    follow: {
        type: Number,
        validate: (arg) => {
            if(arg > 0 && arg < 5) { // 规定follow值在0到5之间
                return true;
            } else {
                return false;
            }
        }
    }
});
// 报错
Vali.create({title: 'available1', follow: 0}).then((doc) => {
    console.log(doc);
})
// 正常添加
Vali.create({title: 'available1', follow: 2}).then((doc) => {
    console.log(doc);
})
// 不传的话也能正常添加；不确定是不是规则定的不严谨；不传的情况下，arg还无法确定是什么
Vali.create({title: 'available1'}).then((doc) => {
    console.log(doc);
})` 

### 最后

**参考资料：**  
[https://www.cnblogs.com/xiaohuochai/p/7215067.html?utm\_source=itdadao&utm\_medium=referral](https://www.cnblogs.com/xiaohuochai/p/7215067.html?utm_source=itdadao&utm_medium=referral)

[http://mongoosejs.com/docs/guide.html](http://mongoosejs.com/docs/guide.html)
