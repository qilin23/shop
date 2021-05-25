const mysql = require('mysql');

var mysqlConnect = {};

var pool = mysql.createPool({
    connectLimit:10,
    host: "localhost",
    user: "root",
    password: "123456",
    database: "shop"
});

mysqlConnect.sql=function (query,params,callback) {
    if(!query){
        callback();
        return;
    }
    pool.query(query,params,function (err,rows,fields) {
       if(err){
           callback(err,null);
           return;
       }
       callback(null,rows,fields);
    });
};

module.exports = mysqlConnect;
