/** 
* @function 请求拦截
* @param  Array  {Array} 不需要拦截的路由数组
* @author 张帅 2020/12/25
*/
function Intercept(Array) {
  return function (req, res, next) {
    // 对比是否是不拦截的路由和cookie是否存在和是否是静态资源
    if (Array.indexOf(req.url) != -1 || req.cookies.code || /.png|.jpg/gi.test(req.url)) {
      next();
    } else {
      res.send({
        code: '404',
        success: false,
        massge: '没有登录'
      })
    }
  }
}

module.exports = Intercept