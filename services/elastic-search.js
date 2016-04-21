var es = require('elasticsearch'),
    config = require('../config/es-config.js');

var client = new es.Client(config);

module.exports = client;