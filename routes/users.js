var express = require('express');
var router = express.Router();
var connection = require("./bean/db");
/* GET users listing. */

router.get('/userAdd', function(req, res, next) {
  res.render("userAdd");
});
router.post("/userUpdate",function(req,res,next){
    var uid = req.body.uid;
    var sql = "delete from userdetails where uid=?";
    connection.query(sql,uid,function(err,data){
        if(err){
            console.log(err);
        }
        else{
            res.send("删除完成");
        }
    })
})
router.get("/userList",function(req,res,next){
  var pagenum = req.query.page;
  var start;
  var end;
  if(pagenum == undefined){
    pagenum = 1;
    start = 0;
    end = 5;
  }
  else{
    start = (pagenum-1)*5;
    end = pagenum*5;
  }
  var sql = "select * ,(select count(*) from userdetails) as count from userdetails limit ?,?";
  connection.query(sql,[start,end],function(err,data){
    if(err){
      console.log(err);
    }
    else{
      res.render("userList",{userList:data,pagenum:pagenum});
    }
  })

})

router.post("/insertuser",function(req,res){
  var uid = req.body.uid;
  var pass = req.body.pass;
  var mobile = req.body.mobile;
  var email = req.body.email;
  var age = req.body.age;
  var idcard = req.body.idcard;
  var address = req.body.address;
  var sql = "insert into userdetails (uid,pass,mobile,email,age,idcard,address) values (?,?,?,?,?,?,?)";
  db.query(sql,[uid,pass,mobile,email,age,idcard,address],function(err,data){
    if(err){
      console.log(err);
    }
    else{
      res.end("添加成功");
    }
  })
})
router.get('/getuser',function(req,res,next){
    var userId = req.query.userId;
    var sql = "select * from userdetails where uid=?";
    db.query(sql,[uid],function(error,data){
        if(error){
            console.log(error);
        }
        else{
            res.send(data);
        }
    })
})
router.post("/userUpdate",function(req,res){
  var userIdArr = req.body.userIdArr;
  userIdArr = userIdArr.split(",");
  for(var i = 0; i < userIdArr.length; i++){
    var uid = userIdArr[i];
    var sql = "delete from userdetails where uid=?";
    db.query(sql,[uid],function(err,data){
      if(err){
        console.log(err);
      }
    })
  }
  res.send("数据删除成功!");
})
//修改用户
router.get('/userView',function(req,res,next){
    var uid = req.query.uid;
    res.render('userView',{uid:uid});
})
module.exports = router;