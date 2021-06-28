var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 1. imports indexRouter and othr routers here 
// var used from before ES6 is ok but can be changed 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const campsiteRouter = require('./routes/campsiteRouter'); // import router request 
const promotionRouter = require('./routes/promotionRouter'); // import router request 
const partnerRouter = require('./routes/partnerRouter'); // import router request 
//////// added mongoos via https://learn.nucamp.co/mod/book/view.php?id=3590&chapterid=4069
const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/nucampsite';
const connect = mongoose.connect(url, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

connect.then(() => console.log('Connected correctly to server'), 
    err => console.log(err)
);
//////////////////////////////////
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Implement Rest API https://learn.nucamp.co/mod/book/view.php?id=3576&chapterid=4051
// 2. calling app.use for the newly added routers 
app.use('/campsites', campsiteRouter); // use models
app.use('/promotions', promotionRouter);
app.use('/partners', partnerRouter);
// 3. added aboutus.html and index.html 
// 3. Now the server is set up to run as a rest API server and will 
// 3. support all rest api endpoints from week one 
// now send a few requests through postman 

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
