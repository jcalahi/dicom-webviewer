var router = require('express').Router(),
    client = require('../services/elastic-search');

router.use(function (req, res, next) {

    client.search({
        index: 'pacs',
        type: 'dicoms',
        q: req.query.q
    }).then(function (data) {

        if (data.hits.total > 0) {
            //res.json(data.hits.hits);
            res.searchResults = data.hits.hits;
            next();
        } else {
            res.status(200).send({
                message: 'No records found'
            });
        }

    }, function (err) {
        console.log(err.message);
    });

});

router.get('/_search', function (req, res) {
    res.json(res.searchResults);
});

module.exports = router;