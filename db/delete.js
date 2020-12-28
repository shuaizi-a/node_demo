let { MongoClient, url } = require('./index');

function ondelete(data) {
  return new Promise((resolve, reject) => {
    try {
      MongoClient.connect(url, function (err, db) {
        if (err) return reject(err);
        var dbo = db.db(data.Database);
        dbo.collection(data.Table).deleteOne(data.whereStr, function (err, obj) {
          if (err) return reject(err);
          resolve(obj)
          db.close();
        });

        // 删除多条信息
        dbo.collection(data.Table).deleteMany(data.whereStr, function (err, obj) {
          if (err) return reject(err);
          resolve(obj.result.n)
          db.close();
        });

      });
    } catch (error) {
      reject(error);
    }
  })
}

function deleteMany(data) {
  Object.assign
  return new Promise((resolve, reject) => {
    try {
      MongoClient.connect(url, function (err, db) {
        if (err) return reject(err);
        var dbo = db.db(data.Database);
        // 删除多条信息
        dbo.collection(data.Table).deleteMany(data.whereStr, function (err, obj) {
          if (err) return reject(err);
          resolve(obj.result.n)
          db.close();
        });
      });
    } catch (error) {
      reject(error);
    }
  })
}

module.exports = {
  ondelete,
  deleteMany
}
