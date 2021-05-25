let express = require('express');
let router = express.Router();

var mysql =require('mysql');
var connection =mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'123456',
  database:'shop'
});

connection.connect();

router.get('/',function(req,res)  {
    res.render('login');
});

router.post('/',(req,res) => {

var selectSQL = "select name,pass from useraccount where name = ? and pass=? " ;
let a=[req.body.name,req.body.pass]  
connection.query(selectSQL,a, function (err, result, fields) {
    if (err) {
        console.log('err', err);
        return;
    } else {
      if (result == undefined){
        res.send('登录失败');
    }else {
      if (req.body.name =="qilin" && req.body.pass == 000000){

          res.redirect('/manager');
        }else{
      
         res.redirect('/index');    }
    }
  }
});
});

module.exports = router;