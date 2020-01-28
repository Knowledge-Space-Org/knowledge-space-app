const app = require('express');
const router = app.Router();

const esUtils = require('../utility/ES-utils');

const esclient = esUtils.getESClient();

// autosuggest
router.get('/auto-suggest', function (req, res) {
    console.debug("In auto suggest");
    esclient.search({
        index: 'scigraph',
        type: 'entities',
        body: req.query.body
    }).then(response => {
        res.send(response)
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
    let esclientToUse = esclient;
    if(req.query.source==="scr_ebrains"){
        esclientToUse = esUtils.getDataSpaceESClient()
    }
    console.debug("esclient to use");
    console.debug(req.query.body);
    console.debug(req.query.source);
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
    esclient.search({
        index: 'pubmed-19',
        type: 'publication',
        body: req.query.body
    }).then(response => {
        res.send(response)
    })
});

module.exports = router;