//这个可以管理另外4个界面
var express = require('express');
var router = express.Router();
var users=require('./users');
var product=require('./product');
var order=require('./order')

//判断是否符合条件进入
function permission(req,res,next){
  if(req.session.uid==undefined){
    res.render('./info',{
      title:'尚未登录',
      content:'请登录',
      href:'./login',
  hrefTxt:'返回登录页面'
  
   })
  }else{
    next();
  }
}
/* GET users listing. */
router.get('/',permission, function(req, res, next) {
  res.render('/index')
});
//后台用户管理
router.use('/users',users)
router.use('/product',product)
router.use('/order',order)


module.exports = router;