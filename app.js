const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require('fs');
const path = require('path');
const bodyParser = require("body-parser"); // 解析post传参
const Intercept = require('./util/Intercept')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger('short', { stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' }) }));
app.use(bodyParser.json());// 解析 application/json
app.use(bodyParser.urlencoded());// 解析 application/x-www-form-urlencoded

//设置允许跨域访问该服务 设置CORS
app.use(require('./util/cors'));

// 拦截请求url查看是否携带cookie（参数为不拦截请求）
app.use(Intercept(['/', '/log', '/Registered']))

// 访问静态文件
app.use(express.static('public'));

// websocket
require('./websocket/index');
require('./websocket/ske')

// 路由
app.use('/', require('./routes/index'));

module.exports = app;
