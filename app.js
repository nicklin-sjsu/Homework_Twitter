'use strict';
var debug = require('debug')('my express app');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

const { TwitterApi } = require('twitter-api-v2');

const client = new TwitterApi({
    appKey: 'v7jx7psZeaTOmWOYTlwW1XxgL',
    appSecret: 'M2xQ2nfOHxcNGCCk2SukrSuqRZi3TklKhXPYMQf4ebqnunRqiq',
    accessToken: '1161949396449153024-vsFu92oeyExOlgoCEjLhwb2LjZ4mYZ',
    accessSecret: 'AuNQMeVhxONRXfIl5wXTpXjzKHMpDMJYDF6VppprklQIv',
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create a tweet
app.get('/create', (req, res) => {
    let message = req.query.message;
    console.log(message);
    client.v2.tweet(message).then((val) => {
        console.log(val);
        console.log("success");
        res.send(200, { 'message': 'Tweet created successfully'} );
    }).catch((err) => {
        console.log(err);
        res.send(400, { 'message': err });
    });
});

// Retrieve a tweet
app.get('/retrieve', (req, res) => {
    const tweetId = req.query.tweetId;
    client.v2.singleTweet(tweetId, {
        'tweet.fields': [
            'public_metrics',
        ],
    }).then((val) => {
        const tweetBody = val.data.text;
        console.log(val);
        res.send(200, { 'message': tweetBody });
    }).catch((err) => {
        console.log(err);
        res.send(400, { 'message': err });
    });
});

// Delete a tweet
app.get('/delete', (req, res) => {
    const tweetId = req.query.tweetId;
    client.v2.tweet(tweetId).then((val) => {
        console.log(val);
        console.log('Tweet has been deleted');
        res.send(200, { 'message': 'Tweet has been deleted' });
    }).catch((err) => {
        console.log(err);
        res.send(400, { 'message': err });
    });

    
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
