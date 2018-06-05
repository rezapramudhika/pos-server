const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors')
const dbURL = 'mongodb://rezapramudhika:lXmCsLlPFuKsQH8m@rezapramudhika-shard-00-00-cik85.mongodb.net:27017,rezapramudhika-shard-00-01-cik85.mongodb.net:27017,rezapramudhika-shard-00-02-cik85.mongodb.net:27017/pos?ssl=true&replicaSet=rezapramudhika-shard-0&authSource=admin';
const db = mongoose.connection;

const index = require('./routes/index');

mongoose.connect(dbURL, err => {
    if (!err)
        console.log('Connected to database');
    else
        console.log('Error Connect to database');
});

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
