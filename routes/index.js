var express = require('express');
var router = express.Router();
var { find } = require('../db/find')
var { insertOne } = require('../db/insertOne')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send({ title: 'Express' });
});

// 注册
router.post('/Registered', async function (req, res, next) {
  try {

    let name = await find({
      Database: 'test',
      Table: 'user',
      whereStr: {
        name: req.body.name
      }
    });

    if (name.length != 0) {
      return res.send({
        code: '300',
        success: false,
        massge: '用户已存在'
      });
    }

    await insertOne({
      Database: 'test',
      Table: 'user',
      myobj: {
        name: req.body.name,
        password: req.body.password
      }
    });

    res.send({
      code: '200',
      success: true,
      massge: '用户注册成功'
    });
  } catch (error) {
    res.send({
      code: '404',
      success: false,
      massge: '用户注册模块出错，请联系管理员'
    });
  }
});

// 登陆接口
router.post('/log', async function (req, res, next) {
  try {
    let data = await find({
      Database: 'test',
      Table: 'user'
    });

    // 设置cookie
    res.cookie('code', data[0]._id, {
      maxAge: 60 * 60 * 48
    });

    res.send({
      code: '200',
      success: true,
      data
    })
  } catch (error) {
    res.send({
      code: '404',
      success: false
    });
  }
});

router.get('/op', function (req, res, next) {
  res.send({
    url: 'http://192.168.1.103:3000/img/op.png'
  });
})

module.exports = router;

// console.log(req.cookie.code)

// express获取参数有三种方法：官网实例：
// Checks route params(req.params), ex: /user/: id
// Checks query string params(req.query), ex: ?id = 12
// Checks urlencoded body params(req.body), ex: id =