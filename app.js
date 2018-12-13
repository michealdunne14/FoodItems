var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const foodList = require("./routes/foodList");
const user = require("./routes/user");
const cors = require("cors");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

//Gets
app.get('/foodList', foodList.findAll);
app.get('/user',user.findAll);
app.get('/foodList/votes', foodList.findTotalVotes);
app.get('/foodList/Course/:coursedinner', foodList.findCourse);
app.get('/foodList/Id/:id', foodList.findOne);
app.get('/user/name/:authName',user.findUser);
app.get('/foodList/fuzzy/:fooditem',foodList.fuzzySearch);
app.get('/user/login/:authName',user.login)

//Posts
app.post('/foodList',foodList.addFood);
app.post('/user',user.addUser);

//Puts
app.put('/foodList/:id/upvote', foodList.incrementUpvotes);
app.put('/foodList/:id/downvote', foodList.incrementDownvotes);
app.put('/foodList/:id',foodList.changeName);

//Deletes
app.delete('/foodList/Id/:id', foodList.deleteFood);
app.delete('/user/Id/:id', user.deleteUser);

app.use('/', indexRouter);

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
