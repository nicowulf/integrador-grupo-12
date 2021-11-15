const createError = require('http-errors');
const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const cors = require('cors');

//Router
const indexRouter = require('./routes/')
const productsRouter = require('./routes/products')
const usersRouter = require('./routes/users')
const adminRouter = require('./routes/admin')

//RouterAPI
const productsAPIRouter = require("./routes/api/products");
const usersAPIRouter = require("./routes/api/users");

const app = express();
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({ secret: 'Mensaje secreto',
  resave: false,
  saveUninitialized: false,
}));

app.use(userLoggedMiddleware);

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))

app.use(cors());

// Router
app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);

// RouterAPI
app.use("/api/products", productsAPIRouter);
app.use("/api/users", usersAPIRouter);


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
