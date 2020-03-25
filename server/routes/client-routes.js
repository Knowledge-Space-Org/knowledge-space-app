const app = require('express');
const router = app.Router();

const esUtils = require('../utility/ES-utils');

const esDataSpaceClient = esUtils.getDataSpaceESClient();

// autosuggest
router.get('/auto-suggest', function (req, res) {
    esDataSpaceClient.search({
        index: 'scigraph',
        type: '_doc',
        body: req.query.body
    }).then(response => {
        res.send(response)
    }).catch(err => {
        console.error("Error occured in auto suggest");
        console.error(req.query.body);
        console.error(err);
        res.send([]);
    })
});

// entity-search
router.get('/find-slug-by-curie', async function (req, res) {
    const slug = await esUtils.findSlugByCurie(req.query.curie);
    res.send(slug);
});


router.get('/find-by-slug', async function (req, res) {
    const slugDetails = await esUtils.findBySlug(req.query.id);
    res.send(slugDetails);
});

router.get('/details', function (req, res) {
    esDataSpaceClient.search({
        index: 'scigraph',
        type: '_doc',
        body: req.query.body
    }).then(response => {
        res.send(response)
    })
});

// datasource client
router.get('/all-data-by-entity', async function (req, res) {
    const response = await esUtils.queryAllDataSpaceByEntity(req.query.labels);
    res.send(response);

})
router.get('/source-data-by-entity', function (req, res) {
    let esclientToUse = esDataSpaceClient;
    esclientToUse.search({
        index: req.query.source,
        body: req.query.body,
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
    esDataSpaceClient.search({
        index: 'pubmed-19',
        type: '_doc', // 'publication',
        body: req.query.body
    }).then(response => {
        res.send(response)
    })
});

module.exports = router;