'use strict';
const obj = {};
//引入DB对象
const db = require('../models/db.js');





obj.test = function(req, res, next) {
    //随便查询一个数据
    db.find({ name: /小/ }, function(err, users) {
        // if (err) throw err; //通过next传递给express统一处理
        if (err) return next(err);

        //将数据通过模板渲染到页面
        res.render('test.html', {
            users: users
        });
    });
}






module.exports = obj;
