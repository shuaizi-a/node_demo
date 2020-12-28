let { MongoClient, url } = require('./index');

/** 
* @function 修改单条数据 
* @param  data {object}
* @return [{}]
* @author 张帅 2020/12/28
*/

function update(data) {
  /* 
  * @param  data.Database  "string" 要连接的数据库
  * @param  data.Table  "string" 要查询的表明
  * @param  data.whereStr {object}  查询数据的名称
  * @param  data.updateStr {object}  更新的数据信息
  */
  console.log(data)
  return new Promise((resolve, reject) => {
    try {
      MongoClient.connect(url, function (err, db) {
        if (err) return reject(err);
        var dbo = db.db(data.Database);
        dbo.collection(data.Table).updateOne(data.whereStr, { $set: data.updateStr }, function (err, res) {
          if (err) reject(err);
          resolve(res)
          db.close();
        });
      });
    } catch (error) {
      reject(error)
    }
  })
}


/** 
* @function 修改多条数据
* @param  data {object}
* @return [{}]
* @author 张帅 2020/12/28
*/
function updateMany(data) {
  /* 
  * @param  data.Database  "string" 要连接的数据库
  * @param  data.Table  "string" 要查询的表明
  * @param  data.whereStr {object}  查询多条数据共同点信息
  * @param  data.updateStr {object}  更新的数据信息
  */
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db(data.Database);

      // var whereStr = {"type":'en'};  // 查询条件
      // var updateStr = {$set: { "url" : "https://www.runoob.com" }};

      dbo.collection(data.Table).updateMany(whereStr, { $set: data.updateStr }, function (err, res) {
        if (err) throw err;
        console.log(res.result.nModified + " 条文档被更新");
        db.close();
      });
    });
  })
}

module.exports = {
  update,
  updateMany
}