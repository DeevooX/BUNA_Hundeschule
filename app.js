
var mustacheExpress = require('mustache-express');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));  // Ordner für Views
app.set('view engine', 'mustache');  // Setze Mustache als Template-Engine
app.engine('mustache', mustacheExpress());  // Verwende mustache-express als Engine

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
const Pool = require("pg").Pool;

const pool = new Pool({
  user: 'buna_hundeschule_user',
  host: 'dpg-croj0nij1k6c739iaa30-a.frankfurt-postgres.render.com',
  database: 'BUNA Hundeschule',
  password: 'D65WpuK1OkaCN5sDIdbSDef6wFBbYeD4',
  port: 5432,
});

app.use((req, res, next) => {
  req.pool = pool;
  req.login = new Login("users", ["email", "passwort"], pool);
  next();
});

// Mount your router
const routes = require('./routes/index'); // Path to the router file
app.use('/', routes);


module.exports = app;

