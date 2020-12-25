/** 
* @function CORS跨域
* @author 张帅 2020/12/25
*/
function cors(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://192.168.1.103:8082');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
}

module.exports = cors
