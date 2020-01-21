const app = require('express');
const router = app.Router();

const elasticsearch = require('elasticsearch')

const esclient = new elasticsearch.Client({
    host: 'https://knowledge-space.org/elasticsearch/',
    // Log: 'trace'
})

// autosuggest
router.get('/auto-suggest', function (req, res) {
    esclient.search({
        index: 'scigraph',
        type: 'entities',
        body: req.query.body
    }).then(response => {
        res.send(response)
    })
});

// entity-search
router.get('/find-slug-by-curie', function (req, res) {
    esclient.search({
        index: 'scigraph',
        type: 'entities',
        body: req.query.body
    }).then(response => {
        res.send(response)
    })
});


router.get('/find-by-slug', function (req, res) {
    esclient.get({
        index: 'scigraph',
        type: 'entities',
        id: req.query.id
    }).then(response => {
        res.send(response)
    })
});

router.get('/details', function (req, res) {
    esclient.search({
        index: 'scigraph',
        type: 'entities',
        body: req.query.body
    }).then(response => {
        res.send(response)
    })
});

// datasource client
router.get('/all-data-by-entity', function (req, res) {
    esclient.search({
        index: '*',
        type: 'dataSpace',
        body: req.query.body
    }).then(response => {
        res.send(response)
    }).catch(exp => {
        console.error("error occured in all-data-by-entity");
        console.error(req.query.body);
        console.error(exp);
        res.send([]);
    });
    
})
router.get('/source-data-by-entity', function (req, res) {
    esclient.search({
        index: req.query.source,
        type: 'dataSpace',
        body: req.query.body
    }).then(response => {
        res.send(response)
    }).catch(exp => {
        console.error("error occured in source-data-by-entity");
        console.error(req.query.body);
        console.error(exp);
        res.send([]);
    });
    
});


//Literature
router.get('/literature-by-curie-paths', function (req, res) {
    esclient.search({
        index: 'pubmed-19',
        type: 'publication',
        body: req.query.body
    }).then(response => {
        res.send(response)
    })
});

module.exports = router;