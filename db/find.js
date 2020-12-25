let { MongoClient, url } = require('./index');

/** 
* @function 查询 | 条件查询 
* @param  name  {string} 要查询的表明
* @param  whereStr  {object} 查询条件 / 可以不写
* @return [{}]
* @author 张帅 2020/12/25
*/

function find(data) {
  return new Promise((resolve, reject) => {
    try {
      MongoClient.connect(url, function (err, db) {
        if (err) reject(err);
        var dbo = db.db(data.Database); // 数据库名

        // 表名
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
