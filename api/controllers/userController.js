/**
 * Created by tujunxiong on 2017/06/09.
 */
"use strict";
let obj = {};
const Db = require('../models/db.js');
const path = require('path'); //node中操作路径先关的核心对象
const config = require('../config');//配置文件
var formidable = require('formidable');
//mongo中的id生成器
const ObjectID = require('mongodb').ObjectID;
const captchapng = require('captchapng'); //生成验证码
let db = new Db('users');
let musicDb = new Db('musics');
/**
 * 检查用户名是否存在
 * @param req
 * @param res
 * @param next
 */
obj.checkUsername = (req,res,next)=>{
   //获取数据
   let username = req.body.username;
   db.find({username:username},(err,users)=>{
      if(err) return next(err);
      if(users.length === 0){
         //没有，可以注册
         res.json({
            code:'001',msg:'恭喜，可以注册！'
         });
      }else{
         res.json({
            code:'002',msg:'用户名已经存在！'
         });
      }

   })
};
/**
 * 注册
 * @param req
 * @param res
 * @param next
 */
obj.doRegister = function(req,res,next){
   //获取数据
   let user = req.body;

   //验证验证码输入是否正确
   let vcode = req.session.vcode;//在生成验证码的时候存储的
   let formVcode = req.body.vcode;
   if(vcode != formVcode){
      return res.json({
         code:'002',msg:'验证码不正确！'
      })
   }




   //可以注册,验证邮箱
   //验证
   const emailRegex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
   if(!emailRegex.test(user.email)){
      return res.json({
         code:'003',msg:'邮箱不合法！'
      })
   }
   //验证密码长度
   if(user.password.trim().length > 18 || user.password.trim().length < 6){
      return res.json({
         code:'004',msg:'密码必须在6-18位之间！'
      })
   }

   //判断用户是否存在
   db.find({username:user.username},(err,users)=>{
      if(err) return next(err);
      console.log(users);
      console.log(user.username);
      if(users.length != 0){
         return res.json({
            code:'002',msg:'用户名已经存在！'
         })
      }
      //成功了


      //保存数据
      db.insert([user],(err,result)=>{
            if(err) return next(err);
            return res.json({
               code:'001',
               msg:'恭喜，注册成功！'
            });
      });


   })







}
/**
 * 登录功能
 * @param req
 * @param res
 * @param next
 */
obj.doLogin = function (req,res,next) {
   // 在以往的形式中，早期的数据库中
   //先查询出用户名，如果有该值，也能获取到其密码，再来吧密码和用户名比较
   // sql 注入     用户名 === xxx  并且密码 ===xxx
   //  查询:    密码 == 123 并且 用户名 = xxxx '或者 1=1'
   // if('abc'=== 'x' && '123'==='x' or 1===1)
   let user = req.body;
   //查询用户名或密码匹配的情况
   db.find(user,(err,users)=>{
      //判断是否找到用户名并且密码都相等的数据
      if(users.length === 0){
         return res.json({
            code:'002',
            msg:'用户名或者密码不正确！'
         });
      }

      //储物柜先关事宜


      //1:如果当前users.length不等于0，一定有一个用户
      let user = users[0];
      //1:生成token，为了给用户 Date.now()
      let token = Date.now()+'';
      //2:根据token作为柜子(global)的编号，3:将数据存储起来
      global[token] = user;



      //登录合法
      res.json({
         code:'001',
         msg:'登录成功',
         //交付钥匙token
         token:token,
         //返回用户的权限
         permissions:user.permissions,
      })


   });
}
/**
 * 获取音乐列表
 * @param req
 * @param res
 * @param next
 */
obj.getMusics = function(req,res,next){
   musicDb.find({uid:req.user._id},function(err,musics){
         if(err) return next(err);
         return res.json({
            // musics:musics 以下是简写形式
            musics
         })
   })
}

/**
 * 上传音乐数据
 * @param req
 * @param res
 * @param next
 */
obj.uploadMusic = function (req,res,next) {
   //解析请求 new formidable对象
   var form = new formidable.IncomingForm();
   //设置默认存储路径
   form.uploadDir = config.uploadDir;
   form.parse(req, function(err, fields, files) {
      //获取文件的名称，作为数据库存储的路径
      let insertObj = {};
      insertObj.title = fields.title;
      insertObj.time = fields.time;
      insertObj.singer = fields.singer;

      //获取歌词文件路径
      let filename = path.parse(files.file.path).base;
      //拼接歌词文件路径
      filename = '/files/' + filename;
      insertObj.file = filename;
      //获取歌曲文件路径
      let filenamelrc = path.parse(files.filelrc.path).base;
      //拼接歌词文件路径
      filenamelrc = '/files/' + filenamelrc;
      insertObj.filelrc = filenamelrc;
      //添加uid属性
      insertObj.uid = req.user._id;

      musicDb.insert([insertObj],(err,result)=>{
         if(err) return next(err);
         res.json({
            code:'001',
            msg:'上传成功'
         })

      })

   });
}
/**
 * 通过id获取音乐并显示在编辑页面
 * @param req
 * @param res
 * @param next
 */
obj.getMusic = function(req,res,next,isJsonp){
   //从url中获取请求参数
   let mid = req.params.id;
   let callbackObj;
   try{
      mid = ObjectID(mid)
   }catch(e){
     callbackObj = {
         code:'002',
            msg:'ID歌曲随意输入的方式'
      };
      if(!isJsonp)
      return res.json(callbackObj);
      else{
         return res.jsonp(callbackObj);
      }
   }



   musicDb.find({_id:mid},function(err,musics){
      if(err) return next(err);
      if(musics.length === 0 ){
         callbackObj = {
            code:'002',
            msg:'没有找到歌曲'
         };

         if(!isJsonp)
         return res.json(callbackObj);
         else
            return res.jsonp(callbackObj);
      }
      let music = musics[0];

      callbackObj = {
         code:'001',
         mgs:'成功',
         music
      }
      if(!isJsonp)
      res.json(callbackObj);
      else
         res.jsonp(callbackObj);

   })
}
/**
 *  编辑音乐的保存
 * @param req
 * @param res
 * @param next
 */
obj.updateMusic = function(req,res,next){
   //解析请求获取所有的数据
   //解析请求 new formidable对象
   var form = new formidable.IncomingForm();
   //设置默认存储路径
   form.uploadDir = config.uploadDir;
   form.parse(req, function(err, fields, files) {

      console.log(fields);
      //获取文件的名称，作为数据库存储的路径
      let insertObj = {};
      insertObj.title = fields.title;
      insertObj.time = fields.time;
      insertObj.singer = fields.singer;

      //操作的时候，最好选择歌曲来更新，
      //获取歌词文件路径
      if(files.file){
         let filename = path.parse(files.file.path).base;
         //拼接歌词文件路径
         filename = '/files/' + filename;
         insertObj.file = filename;
      }
      if(files.filelrc){
         //获取歌曲文件路径
         let filenamelrc = path.parse(files.filelrc.path).base;
         //拼接歌词文件路径
         filenamelrc = '/files/' + filenamelrc;
         insertObj.filelrc = filenamelrc;
      }
      let _id;
      try{
         _id = ObjectID(fields._id);
      }catch(e){
         return res.json({
            code:'002',
            msg:'胡乱的传递音乐ID'
         })
      }




      //修改后的对象是insertObj
      musicDb.update({_id},insertObj,(err,result)=>{
            if(err) return next(err);
            if(result.modifiedCount === 0){
               return res.json({
                  code:'002',
                  msg:'没有发生更改'
               })
            }else{
               return res.json({
                  code:'001',
                  msg:'操作成功'
               })
            }
      })

   });
}

obj.deleteMusic = function(req,res,next){
   //删除谁
   let _id = req.query.id;
   try{
      _id = ObjectID(_id);
   }catch(e){
      return res.json({
         code:'002',
         msg:'无效的音乐编号！'
      })
   }


   //进行删除
   musicDb.remove({_id},(err,result)=>{
         if(err) return next(err);
         if(result.deletedCount === 0){
            //没有删除到歌曲
            return res.json({
               code:'002',
               msg:'您要删除的歌曲不存在！'
            })

         }

      res.json({
         code:'001',msg:'删除成功'
      })

   })

}


obj.getPicture = function(req,res,next){
   var num = parseInt(Math.random() * 9000 + 1000);
var p = new captchapng(80, 30, num); // width,height,numeric captcha
p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha)
p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

var img = p.getBase64();
var imgbase64 = new Buffer(img, 'base64');
res.writeHead(200, {
   'Content-Type': 'image/png'
});

   //挂载答案到session中
   req.session.vcode = num;
   res.end(imgbase64);

}



module.exports = obj;