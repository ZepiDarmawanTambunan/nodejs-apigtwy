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
const mentorsRouter = require('./routes/mentors');
const chaptersRouter = require('./routes/chapters');
const lessonsRouter = require('./routes/lessons');
const imageCoursesRouter = require('./routes/imageCourses');
const myCoursesRouter = require('./routes/myCourses');
const reviewsRouter = require('./routes/reviews');

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
app.use('/courses', coursesRouter);
app.use('/media', mediaRouter);
app.use('/orders', ordersRouter);
app.use('/payments', paymentsRouter);
app.use('/refresh-tokens', refreshTokensRouter);
app.use('/mentors', mentorsRouter);
app.use('/chapters', chaptersRouter);
app.use('/lessons', lessonsRouter);
app.use('/image-courses', imageCoursesRouter);
app.use('/my-courses', myCoursesRouter);
app.use('/reviews', reviewsRouter);

module.exports = app;