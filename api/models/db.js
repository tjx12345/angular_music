'use strict';
const MongoClient = require('mongodb').MongoClient;
const config = require('../config');
const url = `mongodb://${config.host}:${config.port}/${config.database}`;
let Db = function (cName) {
    this.cName = cName;
}



/**
 * 封装自己的增加
 * @param  {[type]}   arr      [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
Db.prototype.insert = function(arr, callback) {
    MongoClient.connect(url, (err, db)=>{
        if (err) throw err;

        //通过db对象获取集合对象
        let userColllection = db.collection(this.cName);

        //使用集合对象增删改查
        userColllection.insertMany(arr, function(err, result) {
            callback(err, result);
            db.close();
        });
    });
}

/**
 * //删除
 * @param  {[type]}   obj      [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
Db.prototype.remove = function(obj, callback) {
    MongoClient.connect(url, (err, db)=> {
        if (err) throw err;

        //通过db对象获取集合对象
        let userColllection = db.collection(this.cName);

        //使用集合对象增删改查
        userColllection.deleteMany(obj, function(err, result) {
            callback(err, result);
            db.close();
        });
    });
}

/**
 * //更新数据
 * @param  {[type]}   filter   [description]
 * @param  {[type]}   obj      [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
Db.prototype.update = function(filter, obj, callback) {
    MongoClient.connect(url, (err, db)=> {
        if (err) throw err;

        //通过db对象获取集合对象
        let userColllection = db.collection(this.cName);

        //使用集合对象增删改查
        userColllection.updateMany(filter, { $set: obj }, function(err, result) {
            callback(err, result);
            db.close();
        });
    });
}

/**
 * //查询数据
 * @param  {[type]}   filter   [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
Db.prototype.find = function(filter, callback) {
//   chuanzhi25qi
//   username" : "chuanzhi25qi
    MongoClient.connect(url, (err, db)=> {

        let userColllection = db.collection(this.cName);

        //使用集合对象增删改查
        userColllection.find(filter).toArray(function(err, docs) {
            callback(err, docs);
            db.close();
        });
    });
}

module.exports = Db;
