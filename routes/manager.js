const { json } = require('express');
var express = require('express');
var router = express.Router();
var path = require('path');
let data = new Array();

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "shop"
});
connection.connect();

router.get('/',(req,res) => {
   let newData = data;
    res.render('manager',{
      detail:newData
    });
});

router.get('/addpage',(req,res) =>{
  res.render('add',{obj:{},id:""});
});
module.exports = router;
