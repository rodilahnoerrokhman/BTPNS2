var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//import flash
const flash = require("connect-flash");
//import session
const session = require("express-session");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//mengambil fungsi yang route ke user
var userRouter = require('./routes/user.routes');
//mengambil fungsi yang route ke transaksi
var transactionRouter = require('./routes/transaction.routes');
//mengambil fungsi yang route ke merchant
var merchantRouter = require('./routes/merchant.routes');
//mengambil fungsi yang route ke item
var itemRouter = require('./routes/item.routes');
//mengambil fungsi yang route ke session
var sessionRouter = require('./routes/session.routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//menggunakan session
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);
//menggunakan flash
app.use(flash());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//menggunakan routes user
app.use('/user', userRouter);
//menggunakan routes transaction
app.use('/transaction', transactionRouter);
//menggunakan routes merchant
app.use('/merchant', merchantRouter);
//menggunakan routes item
app.use('/item', itemRouter);
//menggunakan routes session
app.use('/session', sessionRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log("Request: ", req);
  console.log("Response: ", res);
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
