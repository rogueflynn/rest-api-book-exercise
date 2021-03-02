const express = require('express');
const logger = require('morgan');

const bookRouter = require('./routes/book.router');
const { errorHandler } = require('./middlewares');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bookRouter);
app.use(errorHandler)

module.exports = app;
