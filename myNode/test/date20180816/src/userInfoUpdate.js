let formidable = require('formidable');
let checkPhone = require('../lib/db/checkphone');
let updateInfo = require('../lib/db/updateInfo');

const dbName = 'student';
const dbCollection = 'users';
// async function userInfoUpdate(req, res) {
let userInfoUpdate = (req, res) => {

  var form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {
    if (err) {
      throw new Error(err)
    };
    let docs = await checkPhone(fields);
    if (docs.length > 0) {
      res.json({
        msg: '已经存在该号码了',
        resultCode: 201,
        data: {}
      })
    } else {
      //进行修改操作
      let setVal = {
        nickname: fields.nickname,
        hobby: fields.hobby,
        age: fields.age,
        phone: fields.phone
      };
      let result = await updateInfo(dbName, dbCollection, {
        userId: fields
      }, {
        $set: setVal
      });
      console.log(result)
      if (result.result.ok > 0) {
        res.json({
          msg: 'success',
          resultCode: 200,
          data: {}
        });
      } else {
        res.json({
          msg: '修改失败',
          resultCode: 201,
          data: {}
        });
      }
    }

    //先查询号码是不是存在

  });
}

module.exports = userInfoUpdate;