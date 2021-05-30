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
router.post("/",(req,res)=>{
  // res.render("index");
  // res.redirect("/index");
  // res.send("A");
  // res.redirect("/manager");
  var sql="select uid,pass from userdetails where uid=? and pass=?";
  let a=[req.body.uid,req.body.pass];
  connection.query(sql,a,function(err,result,fields){
    if(err){
      console.log(err)
    }else{
      if(result != undefined){
        if(req.body.uid=="023" && req.body.pass==000000){
          res.render("manager");
        }else{
          res.render("index");
        }
      }else{
        res.send("登陆失败");
      }
    }
  })

});

module.exports = router;