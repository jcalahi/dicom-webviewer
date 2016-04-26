'use strict'; // jshint ignore:line

require('angular').module('dicomApp', [require('angular-ui-router')])
    .config(require('./config.js'));
// Shared
require('../shared/values.js');
// Controllers
require('../controllers');
require('../factories');