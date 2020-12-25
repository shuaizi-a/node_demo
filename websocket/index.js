var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

// 接收客户端发送过来的数据
io.on('connection', function (socket) {

  // 接收客户端传过来的数据
  socket.on("typing", function (data) {
    console.log(data);

    // 触发广播事件 除了自己其他人都能收到
    socket.broadcast.emit('Broadcasting', data);
  });
});

// 向客户端发送信息（测试代码定时向客户端发送信息）
setInterval(function () {
  io.emit("test1", { name: '3001' });
}, 5000);

//开启端口监听socket
server.listen(3001);
