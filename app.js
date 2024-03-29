var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var coolRouter = require('./routes/coolRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('12345-67890-09876-54321'));


function auth(req, res, next) {
  console.log(req.signedCookies);

  if (!req.signedCookies.user) {

    var authHeader = req.headers.authorization;
    if (!authHeader){
      var err = new Error('You are not authenticated');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      return next(err);
    }
    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    var username = auth[0];
    var password = auth[1];

    if (username === 'admin' && password === 'password') {
      res.cookie('user', 'admin', {signed:true});
      next(); // this allows to pass through further
    }
    else {
      var err = new Error('You are not authenticated');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      return next(err);    
    }  
  }
  else {
    if (req.signedCookies.user === 'admin')  {
      next();
    }
    else {
      var err = new Error('You are not authenticated');
      err.status = 401;
      return next(err);       
    }
  }
}

app.use(auth); //authentication BEFORE client gets an access further below


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cool', coolRouter);

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
