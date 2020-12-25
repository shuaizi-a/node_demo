var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

// 接收客户端发送过来的数据
io.on('connection', function (socket) {

});

// 向客户端发送信息（测试代码定时向客户端发送信息）
setInterval(function () {
  io.emit("test2", { name: '3002' });
}, 5000);

//开启端口监听socket
server.listen(3002);
