"use strict";

const express = require('express');
const router = express.Router();
//引入userController
let userConrtoller = require('./controllers/userController');

router.post('/api/check/username',(req,res,next)=>{ //调用userController操作用户是否存在的事宜
   userConrtoller.checkUsername(req,res,next);
})
   .post('/api/register',(req,res,next)=>{ //注册
      userConrtoller.doRegister(req,res,next);
   })
   .post('/api/login',(req,res,next)=>{//登录
      userConrtoller.doLogin(req,res,next);
   })
   .get('/api/music/list',(req,res,next)=>{//音乐列表
      userConrtoller.getMusics(req,res,next);
   })
   .post('/api/music/upload',(req,res,next)=>{//上传音乐
      userConrtoller.uploadMusic(req,res,next);
   })
   .get('/api/music/:id',(req,res,next)=>{ //获取编辑ID
      userConrtoller.getMusic(req,res,next,false);
   })
   .put('/api/music/update',(req,res,next)=>{ //更新音乐
      userConrtoller.updateMusic(req,res,next);
   })
   .delete('/api/music/delete',(req,res,next)=>{ //删除音乐
      userConrtoller.deleteMusic(req,res,next);
   })
   .get('/public/getPic',(req,res,next)=>{//生成验证码
      userConrtoller.getPicture(req,res,next);
   })
   .get('/myjsonp/music/:id',(req,res,next)=>{//处理编辑音乐ID
      userConrtoller.getMusic(req,res,next,true);
   });


module.exports = router;