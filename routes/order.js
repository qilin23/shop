var express = require('express');
const { render } = require('../app');
var router = express.Router();
var connection = require("./bean/db");
router.get("/orderAdd",function(req,res,next){
    res.render("orderAdd");
})
router.post("/orderAdd",function(req,res,next){
    var oid = req.body.oid;
    var uid = req.body.uid;
    var pid = req.body.pid;
    var ordertime = req.body.ordertime;    
    var totalprice = req.body.totalprice;   
    var freight = req.body.freight;
    connection.query("insert into order (oid,uid,pid,ordertime,totalprice,freight) values (?,?,?,?,?,?)",
    [oid,uid,pid,ordertime,totalprice,freight],function(err,data){
        if(err){
            console.log(err);
        }
        else{
            res.end("订单添加成功");
        }
    })

})

router.get("/orderList",function(req,res,next){
    res.render("orderList");
    // var pagenum = req.query.page;
    // var start;
    // var end;
    // if(pagenum == undefined){
    //     pagenum = 1;
    //     start = 0;
    //     end = 5;
    // }
    // else{
    //     start = (pagenum - 1)*5;
    //     end = pagenum*5;
    // }
    // var sql = "select *,(select count(*) from orderproduct) as count from orderproduct limit ?";
    // db.query(sql,[start,end],function(err,data){
    //     if(err){
    //         console.log(err);
    //     }
    //     else{
    //         res.render("orderList",{orderList:data,pagenum:pagenum})
    //     }
    // })
})

/*删除部门*/
router.post("/orderUpdate",function(req,res,next){
    var oid = req.body.oid;
    var sql = "delete from orderproduct where oid=?";
    connection.query(sql,oid,function(err,data){
        if(err){
            console.log(err);
        }
        else{
            res.send("删除完成");
        }
    })
})

router.get("/editorder",function(req,res){
    /*req.query 里面存储得是get请求的响应参数*/
    var oid = req.query.oid;
    var sql = "select * from orderproduct where oid=?";
    connection.query(sql,[oid],function(err,data){
        console.log(data);
        if(err){
            console.log(err);
        }
        else{
            res.render("orderView",{order:data});
        }
    })
})

router.get("/getorderList",function(req,res){
    var sql = "select * from orderproduct";
    connection.query(sql,function(err,data){
        if(err){
            console.log(err);
        }
        else{
            res.send(data);
        }
    })
})
router.post("/orderUpdate",function(req,res){
    var oid = req.body.oid;
    var uid = req.body.uid;
    var pid = req.body.pid;
    var ordertime = req.body.ordertime;    
    var totalprice = req.body.totalprice;   
    var freight = req.body.freight;
    connection.query("insert into order (oid,uid,pid,ordertime,totalprice,freight) values (?,?,?,?,?,?)",
    [oid,uid,pid,ordertime,totalprice,freight],function(err,data){
        if(err){
            console.log(err);
        }
        else{
            res.send("修改成功");
        }
    })
})
module.exports = router;