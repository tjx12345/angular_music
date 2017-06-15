'use strict';
const express = require('express');
//解析post请求体数据
const bodyParser = require('body-parser');

//session中间件
var session = require('express-session');
const cinfig = require('./config');

let server = express();

//路由对象
let router = require('./web_router.js');

//解析post请求体数据
server.use(bodyParser.urlencoded({ extended: false })); //挂载req.body的值

//使用中间件处理跨域
server.use('/api',(req,res,next)=>{
    //允许所有域访问我
    res.setHeader('Access-Control-Allow-Origin',cinfig.crossOrigin );
    //允许相关的请求方式访问我
    res.setHeader('Access-Control-Allow-Methods', 'POST,DELETE,PUT,OPTIONS,GET');
    // 当跨域和post + application/json同时出现，也会自动携带一个头content-type
    res.setHeader('Access-Control-Allow-Headers', 'content-type,mytoken');
   //服务器允许携带证书
   res.setHeader('Access-Control-Allow-Credentials', 'true');
    //如果不next()就会一直卡住
    next();
});
//配置路由规则


//session
server.use(session({
   secret: 'keyboard cat',
   resave: false,  //是否未修改也保存
   saveUninitialized: true, //即时不使用session也分配
}));


//先给req.挂载user属性
server.use(function(req,res,next){
   //1：判断当前请求是否携带头信息mytoken
   if(req.headers.mytoken){
      //2：如果ok，将mytoken的值-> 毫秒值  作为key从global中取对象
      let currentUser = global[req.headers.mytoken];
      //3:给req.user 赋值以上对象
      req.user = currentUser;
   }
      next();//放行到路由中间件运行
});

//加入路由功能到中间件队列中
server.use(router);

//加入错误处理中间件
server.use(function (err,req,res,next) {
   console.log('出错啦',err.stack);
   next();//不要卡住
});


server.listen(cinfig.myport, () => {
    console.log('服务器启动了')
});
