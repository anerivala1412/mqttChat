'use strict';

const express = require('express');
const mqtt = require('mqtt');
var client = mqtt.connect('mqtt://127.0.0.1:1885'),
    path = require('path'),
    favicon = require('serve-favicon'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    redis = require('./lib/tools/redis').client,
    logger = require('./lib/tools/logger'),
    redisUtil = require('./lib/utils/redisUtil'),
    mqttBroker = require('./mqtt-broker');

const app = express();

redis.on('connect', () => {
    redis.del(redisUtil.USERNAME);
    redis.del(redisUtil.ACTIVE_CHAT);
});

client.on('connect', function () {
    client.subscribe('test11');
    client.publish('test11', 'Hello mqtt');
  })
  
  client.on('message', function (topic, message) {
    // message is Buffer
    console.log(topic);
    console.log(message.toString());
    client.end();
  });
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send({error: err});
});

module.exports = app;