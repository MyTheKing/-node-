var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Joi = require('joi')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const UserRouter = require('./routes/admin/UserRouter');
const NewsRouter = require('./routes/admin/NewsRouter');
const ProductRouter = require('./routes/admin/ProductRouter');
const webNewsRouter = require('./routes/web/NewsRouter');
const webProductRouter = require('./routes/web/ProductRouter');

const JWT = require('./utils/JWT');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);







/*
 /adminapi/* - 后台系统用的
 /webapi/* - 企业官网用的
*/

app.use('/webapi/news',webNewsRouter)
app.use('/webapi/product',webProductRouter)


app.use((req,res,next)=>{
  // 如果token有效 ,next() 
  // 如果token过期了, 返回401错误
  if(req.url==="/adminapi/user/login"){
    next()
    return;
  }

  const token = req.headers["authorization"].split(" ")[1]
  if(token){
    var payload = JWT.verify(token)
    if(payload){
      const newToken = JWT.generate({
        id:payload.id,
        username:payload.username
      },"1d")
      res.header("Authorization",newToken)
      next()
    }else{
      res.status(401).send({errCode:"-1",errorInfo:"token过期"})
    }
  }
})






app.use('/adminapi/user',UserRouter)
app.use('/adminapi/news',NewsRouter)
app.use('/adminapi/product',ProductRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


app.use(function (err, req, res, next) {
  // Joi 参数校验失败
  if (err instanceof Joi.ValidationError) {
    return res.send({
      status: 1,
      message: err.message
    })
  }
  // 4.2 未知错误
  res.send({
    status: 1,
    message: err.message
  })
})


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
