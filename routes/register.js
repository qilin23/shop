let express = require('express');
let router = express.Router();
let User = require('./bean/user');

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "shop"
});

connection.connect();


router.get('/login',(req,res) => {
    res.render('register');
});

router.post('/login', (req, res) => {

    var insertSql = 'insert into userdetails(name,pass,mail,sex,hobby,class) values(?,?,?,?,?,?)';
    connection.query(insertSql, [req.body.name,req.body.pass,req.body.mail,req.body.sex,req.body.hobby,req.body.class], function (err, result, fields) {
    
        if (err) {
            console.log('err', err);
            return;
        } else {
           
            res.redirect('/');
        }
    });
});


module.exports = router;