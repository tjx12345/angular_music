'use strict';
const express = require('express');
const session = require('express-session');
let app = express();
let accounts = [{ id: 1, name: 'jack', money: 500 }, { id: 2, name: 'me', money: 500 }];




app.use(session({
    secret: 'bank',
    resave: false, //是否未修改也保存
    saveUninitialized: true, //即时不使用session也分配
}));

//显示大家的余额 
app.get('/', (req, res, next) => {
    res.json(accounts);
});

//转账   2    127.0.0.1/pay?to=2&money=100
app.get('/pay', (req, res, next) => {
    if (!req.session.userid) return res.send('您还未登录');

    let to = req.query.to;
    let from = req.session.userid;
    let money = req.query.money - 0;
    let fromPerson = accounts.find((ele) => {
        return ele.id == from;
    })
    let toPerson = accounts.find((ele) => {
            return ele.id == to;
        })
        //from--  to++
    fromPerson.money -= money;
    toPerson.money += money;
    res.redirect('/');


})

//登录   1
app.get('/login', (req, res, next) => {
    ///login?id=1
    let userid = req.query.id;
    req.session.userid = userid;
    res.send('登录成功')
})

app.listen(80, () => {
    console.log('银行系统已经启动')
})
