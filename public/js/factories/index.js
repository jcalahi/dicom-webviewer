require('angular').module('dicomApp')
    .factory('searchFactory', require('./search-factory.js'))
    .factory('imageFactory', require('./image-factory.js'));
