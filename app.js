// INITIALIZE
require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();

// ROUTE
const coursesRouter = require('./routes/courses');
const indexRouter = require('./routes/index');
const mediaRouter = require('./routes/media');
const ordersRouter = require('./routes/orders');
const paymentsRouter = require('./routes/payments');
const usersRouter = require('./routes/users');
const refreshTokensRouter = require('./routes/refreshTokens');

// MIDDLEWARE
const verifyToken = require('./middlewares/verifyToken');
app.use(logger('dev'));
app.use(express.json({limit: '50mb'})); //limit krn base64 string yg panjang
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// DEFINE ROUTE & MIDDLEWARE 
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/courses', verifyToken, coursesRouter);
app.use('/media', mediaRouter);
app.use('/orders', ordersRouter);
app.use('/payments', paymentsRouter);
app.use('/refresh-tokens', refreshTokensRouter);

module.exports = app;