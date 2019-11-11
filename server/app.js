var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var initDatabase = require('./config/initDatabase.js')
var models = require('./models');

var dd = require('./utils/dingding.js');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var departmentRouter = require('./routes/department');
var restRoute = require('./routes/restRoute');

var app = express();

app.$dd = dd

app.$dc = function() {
  return dd.dc.apply(dd, arguments)
}

models.sequelize.sync({ alter: true }).then(() => {
  console.log('sequelize init success')
  initDatabase(models)
})

app.$db = models;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/department', departmentRouter);
app.use('/', restRoute)

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
  console.log(err)
  res.json(err);
});

module.exports = app;
