let express = require('express');
let router = express.Router();
let User = require('../admin/bean/user');

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "shop"
});

connection.connect();


router.get('/',(req,res) => {
    res.render('register');
});

router.post('/', (req, res) => {
    var insertSql = "insert into userdetails values(?,?,?,?,?,?,?)";
    let cat = [req.body.uid,req.body.pass,req.body.mobile,req.body.email,req.body.age,req.body.idcard,req.body.address]
    connection.query(insertSql, cat,function (err, result, fields) {
        if (err) {
            console.log('err', err);
            return;
        } else {
            res.redirect('/login');
        }
    });
});


module.exports = router;