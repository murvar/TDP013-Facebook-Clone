var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const corsMiddleware = require('./cors');
app.options('*', corsMiddleware);
app.use(corsMiddleware);

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


// catch 404 and forward to error handler //använd inte!
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });


const {MongoClient} = require('mongodb');
let url = "mongodb://localhost:27017/";


function startServer(port) {
  let server = app.listen(8888, () => {
    let host = server.address().address
    let port = server.address().port
    console.log(`Lyssnar på http://${host}:${port}`)
   })
  return(server)
}

function clearDatabase() {
  MongoClient.dropDatabase();
}

// let server = app.listen(8888, () => {
//   let host = server.address().address
//   let port = server.address().port
//   console.log(`Lyssnar på http://${host}:${port}`)
//  })

 startServer()

 module.exports = startServer;