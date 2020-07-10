'use strict';
const Redis = require('ioredis'),
    logger = require('./logger');

const client = new Redis('redis://localhost:6379');

client
    .on('connect', function () {
        logger.info('Redis connected');
    })
    .on('error', function (err) {
        logger.error('Redis error', err);
    });

exports.client = client;