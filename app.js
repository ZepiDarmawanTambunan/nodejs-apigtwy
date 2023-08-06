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
const ordersPaymentsRouter = require('./routes/orderPayments');
const usersRouter = require('./routes/users');
const refreshTokensRouter = require('./routes/refreshTokens');
const mentorsRouter = require('./routes/mentors');
const chaptersRouter = require('./routes/chapters');
const lessonsRouter = require('./routes/lessons');
const imageCoursesRouter = require('./routes/imageCourses');
const myCoursesRouter = require('./routes/myCourses');
const reviewsRouter = require('./routes/reviews');
const webhookRouter = require('./routes/webhook');

// MIDDLEWARE
const verifyToken = require('./middlewares/verifyToken');
const can = require('./middlewares/permission');
app.use(logger('dev'));
app.use(express.json({limit: '50mb'})); //limit krn base64 string yg panjang
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// DEFINE ROUTE & MIDDLEWARE 
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/courses', coursesRouter);
app.use('/media', verifyToken, can('admin', 'student'), mediaRouter);
app.use('/orders', verifyToken, can('admin', 'student'), ordersPaymentsRouter);
app.use('/refresh-tokens', refreshTokensRouter);
app.use('/mentors', verifyToken, can('admin'), mentorsRouter);
app.use('/chapters', verifyToken, can('admin'), chaptersRouter);
app.use('/lessons', verifyToken, can('admin'), lessonsRouter);
app.use('/image-courses', verifyToken, can('admin', 'student'), imageCoursesRouter);
app.use('/my-courses', verifyToken, can('admin'), myCoursesRouter);
app.use('/reviews', verifyToken, can('admin', 'student'), reviewsRouter);
app.use('/webhook', webhookRouter);

module.exports = app;