let { MongoClient, url } = require('./index');

/** 
* @function 添加 | 添加多条 
* @param  data {object}
* @return [{}]
* @author 张帅 2020/12/25
*/
function insertOne(data) {
  /* 
  * @param  data.Database  "string" 要连接的数据库
  * @param  data.Table  "string" 要查询的表明
  * @param  data.myobj  {object} 单条添加 | [{},{}] 多条添加
  */
  return new Promise((resolve, reject) => {
    try {
      MongoClient.connect(url, function (err, db) {
        if (err) return reject(err);
        var dbo = db.db(data.Database);
        dbo.collection(data.Table).insertOne(data.myobj, function (err, res) {
          if (err) reject(err);
          resolve(res);
          db.close();
        });
      });
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  insertOne
}
