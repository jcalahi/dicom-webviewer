'use strict';
require('angular').module('dicomApp', [require('angular-ui-router')])
    .config(require('./config.js'));

// Controllers
require('../controllers');
