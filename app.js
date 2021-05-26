var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');
var session = require('express-session');
 

var loginRouter = require('./routes/login/login');
var registerRouter = require('./routes/login/register');
var indexRouter = require('./routes/index');
var contactRouter = require('./routes/homepage/contact');
var mensRouter = require('./routes/homepage/mens');
var singleRouter = require('./routes/homepage/single');
var womensRouter = require('./routes/homepage/womens');
var managerRouter = require('./routes/admin/manager');
var addRouter = require('./routes/admin/add');
const { Cookie } = require('express-session');

var app = express();
var identityKey = 'skey';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html',ejs.__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("123"));
app.use(session({
  name:identityKey,
  secret:"123",
  saveUninitialized:false,
  resave:false,
  Cookie:{maxAge:60000}
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', loginRouter);
app.use('/register',registerRouter);
app.use('/', indexRouter);
app.use('/contact', contactRouter);
app.use('/mens', mensRouter);
app.use('/single', singleRouter);
app.use('/womens',womensRouter);
app.use('/manager', managerRouter);
app.use('/add', addRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
