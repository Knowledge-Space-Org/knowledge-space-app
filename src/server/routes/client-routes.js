const app = require('express');
const router = app.Router();

const elasticsearch = require('elasticsearch')

const esclient = new elasticsearch.Client({
    host: 'https://knowledge-space.org/elasticsearch/',

    // Log: 'trace'
})

router.get('/auto-suggest', function (req, res) {
    esclient.search({
        index: 'scigraph',
        type: 'entities',
        body: req.query.body
    }).then(response => {
        res.send(response)
    })
});


router.get('/find-slug-by-curie', function (req, res) {
    esclient.search({
        index: 'scigraph',
        type: 'entities',
        body: req.query.body
    }).then(response => {
        res.send(response)
    })
});



module.exports = router;