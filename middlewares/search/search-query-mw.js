var client = require('../../helpers/elastic-search');

function searchMiddlware(req, res, next) {
    client.search({
        index: 'pacs',
        type: 'dicoms',
        q: req.query.q
    }).then(function(data) {
        
        if (data.hits.total > 0) {
            res.searchResults = data.hits.hits;
            next();
        } else {
            res.status(200).send({ message: 'No records '});
        }
        
    }, function(err) {
        console.log(err.message);
    });
}

module.exports = searchMiddlware;
