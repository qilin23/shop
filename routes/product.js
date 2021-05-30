var express = require('express');
var router = express.Router();
var db = require("./bean/db");
router.get("/productAdd",function(req,res,next){
    res.render("productAdd");
})

router.post("/addproduct",function(req,res,next){
    console.log(req.body);
    var  pid = req.body.pid;
    var  pname = req.body. pname;
    var  shopprice = req.body.shopprice;
    var  costprice = req.body.costprice;
    var  limit = req.body.limit;
    var sql = "insert into productsinfo (pid,pname,shopprice,costprice,limit) values(?,?,?,?,?)";
    db.query(sql,[pid,pname,shopprice,costprice,limit],function(err,data){
        if(err){
            console.log(err);
        }
        else{
            res.end("商品组添加成功");
        }
    })
})


router.get("/productList",function(req,res){
    var sql = "select * from productsinfo";
    db.query(sql,function(err,data){
        if(err){
            console.log(err);
        }
        else{
            res.render("productList",{productList: data});
        }
    })
})

router.get("/allproductList",function(req,res){
    var sql = "select * from productsinfo";
    db.query(sql,function(err,data){
        if(err){
            console.log(err);
        }
        else{
            res.send(data);
        }
    })
})

module.exports = router;