/**
 * Created by tujunxiong on 2017/06/12.
 */
"use strict";
const path = require('path');
const process = require('process');
module.exports = {
    uploadDir: path.join(__dirname,'../','web/',process.argv[2]?'dist':'src','files'),
    host: 'localhost',
    port: 27017,
    database: 'itcast',
    myport: 12345,
    crossOrigin: 'http://127.0.0.1:9998'
}
