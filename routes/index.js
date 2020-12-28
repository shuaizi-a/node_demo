const { json } = require('body-parser');
var express = require('express');
var router = express.Router();
var { find } = require('../db/find');
var { insertOne } = require('../db/insertOne');
var { update } = require('../db/update');
var { ondelete, deleteMany } = require('../db/delete')

/* GET home page. */
router.get('/', function (req, res) {
  res.send({ title: 'Express' });
});

// 注册
router.post('/Registered', async function (req, res) {
  console.log(req.body)
  if (req.body.name && req.body.password) {
    return res.send({
      code: '302',
      success: false,
      massge: '用户名和密码不能为空'
    });
  }

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
router.post('/log', async function (req, res) {
  try {
    let data = await find({
      Database: 'test',
      Table: 'user',
      whereStr: {
        name: req.body.name
      }
    });

    console.log(data)

    if (data.length == 0) return res.send({ code: '302', success: false, meassge: '该用户未注册' })

    if (data[0].name == req.body.name && data[0].password == req.body.password) {
      // 设置cookie
      res.cookie('code', data[0]._id, {
        maxAge: 60 * 60 * 48
      });

      res.send({
        code: '200',
        success: true,
        data
      })
    } else {
      res.send({
        code: '302',
        success: false,
        meassge: '密码错误'
      })
    }
  } catch (error) {
    res.send({
      code: '404',
      success: false,
      meassge: '登陆模块异常，请联系管理员',
      error
    });
  }
});

router.get('/op', function (req, res) {
  res.send({
    url: 'http://192.168.1.103:3000/img/op.png'
  });
})

// 修改
router.put('/update', async function (req, res) {
  console.log(req.body)
  try {
    let data = await update({
      Database: 'test',
      Table: 'user',
      whereStr: {
        name: req.body.name
      },
      updateStr: {
        name: req.body.nametow,
        password: req.body.password
      }
    });

    console.log(data)

    res.send({
      code: '200',
      success: true,
      data
    });
  } catch (error) {
    res.send({
      code: '404',
      success: false,
      meassge: '修改模块出错，请联系管理员',
      error
    });
  }
})

router.delete('/delete', async function (req, res) {
  try {
    let data = await deleteMany({
      Database: 'test',
      Table: 'user',
      whereStr: {
        password: req.body.password
      }
    })

    res.send({
      code: '200',
      success: true,
      meassge: '删除成功'
    });
  } catch (error) {
    res.send({
      code: '404',
      success: false,
      meassge: '删除模块出错，请联系管理员',
      error
    });
  }
})

module.exports = router;

// console.log(req.cookie.code)

// express获取参数有三种方法：官网实例：
// Checks route params(req.params), ex: /user/: id
// Checks query string params(req.query), ex: ?id = 12
// Checks urlencoded body params(req.body), ex: id =