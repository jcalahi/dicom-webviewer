var router = require('express').Router();

// Search Query
router.use('/_search', require('../middlewares/search/search-query-mw.js'));
router.get('/_search', require('./search/search-query.js'));


module.exports = router;