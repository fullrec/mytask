const config = require('./config');

const createError = require('http-errors');
const express = require('express');
const nunjucks  = require('nunjucks');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

app.set('views', path.join(__dirname,'views'));
app.set('view engine','njk'); 
app.use(express.static(path.join(__dirname,'public')))

nunjucks.configure('views', {
  autoescape: true,
  express: app
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res, next) => {
  res.render('index', {title: 'Express'})
})

// 捕获 404
app.use((req, res, next) => {
  next(createError(404));
});

// 错误处理
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

if (!module.parent) {
  app.listen(config.port, () => {
    console.info('Listening on port', config.port);
  });
}

module.exports = app;