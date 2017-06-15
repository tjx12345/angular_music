/**
 * Created by tujunxiong on 2017/06/12.
 */
"use strict";
var session = require('express-session');
const express = require('express');

let server =  express();

server.use(session({
   secret: 'keyboard cat',
   resave: false,  //是否未修改也保存
   saveUninitialized: true, //即时不使用session也分配
}))

server.get('/',(req,res,next)=>{
   req.session.vcode = 'abc';
   res.send('ok');
})

server.get('/show',(req,res,next)=>{
   console.log(req.session.vcode);
   res.send('show')
})
server.listen(80)