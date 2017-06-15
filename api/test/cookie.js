/**
 * Created by tujunxiong on 2017/06/12.
 */
"use strict";
var session = require('express-session');
const express = require('express');

let server =  express();

// server.use(session({
//    secret: 'keyboard cat',
//    resave: false,  //是否未修改也保存
//    saveUninitialized: true, //即时不使用session也分配
// }))

server.get('/getCookie',(req,res,next)=>{
   // res.writeHead(200,{
   //    'set-cookie' : 'name=abc;age=123'
   // });
   // res.end();


   // res.cookie('name','jack',{
   //    domain:'127.0.0.1',
   //    path:'/',// 当前域下的所有路径都能使用
   //    maxAge:1000*60, //一分钟的过期时间
   // });
   res.cookie('name','jack',{
      domain:'127.0.0.1',
      path:'/abc',// 当前域下的所有路径都能使用
   })

   res.end();



})

server.get('/show',(req,res,next)=>{
   res.end();
})
server.listen(80)