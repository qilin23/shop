let express = require ('express');
let router = express.Router();

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "shop"
});
connection.connect();

// router.get('/', function (req, res) {
//     res.render('add');
// });

router.get('/', function (req, res) {
    var selectSQL = "select * from productsinfo " 
      connection.query(selectSQL, function (err, results, fields){
        console.log(err);
        console.log(results);
        console.log(fields);
        res.render('add',{detail:results} );
      
        });
  });

router.post('/', (req, res) => {

    var insertSql = 'insert intoproductsinfo(pid,pname,shopprice,costprice,limit) values(?,?,?,?,?)';
    connection.query(insertSql, [req.body.pid,req.body.pname,req.body.shopprice,req.body.costprice,req.body.limit], function (err, result, fields) {
    
        if (err) {
            console.log('err', err);
            return;
        } else {
           
            res.redirect('/manager');
        }
    });
    });

module.exports = router;