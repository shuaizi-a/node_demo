let { MongoClient, url } = require('./index');

/** 
* @function 查询 | 条件查询 
* @return [{}]
* @author 张帅 2020/12/25
*/

function find(data) {
  /* 
  * @param  data.Database  "string" 要连接的数据库
  * @param  name  {string} 要查询的表明
  * @param  whereStr  {object} 查询条件 | 不写查询表全部数据
  */
  return new Promise((resolve, reject) => {
    try {
      MongoClient.connect(url, function (err, db) {
        if (err) reject(err);
        var dbo = db.db(data.Database);
        dbo.collection(data.Table).find(data.whereStr).toArray(function (err, result) { // 返回集合中所有数据
          if (err) return reject(err);
          resolve(result);
          db.close();
        });
      });
    } catch (error) {
      reject(err)
    }
  })
}

module.exports = {
  find
}
