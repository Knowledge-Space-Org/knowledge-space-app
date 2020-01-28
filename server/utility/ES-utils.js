let { map, flatten, head } = require('lodash');
const elasticsearch = require('elasticsearch')


const esDataSpaceClient = new elasticsearch.Client({
    host: process.env.REACT_APP_ES_DATASPACE_URL,
    httpAuth: process.env.REACT_APP_ES_DATASPACE_USER + ":" + process.env.REACT_APP_ES_DATASPACE_PASS,
});

const esclient = new elasticsearch.Client({
    host: process.env.REACT_APP_ES_URL,
});

const filterBuilder = filters => {
    return flatten(Object.keys(filters).map(key => {
        return map([...filters[key]], val => {
            return { term: { [key]: val } }
        })
    }))
}

module.exports = {
    getESClient: function () {
        return esclient;
    },
    getDataSpaceESClient: function () {
        return esDataSpaceClient;
    },
    findSlugByCurie: async (curie) => {
        const queryFilters = { curies: [curie] };
        const body = { query: { bool: { filter: filterBuilder(queryFilters) } } };
        return esclient.search({
            index: 'scigraph',
            type: 'entities',
            body
        }).then(response => {
            const hit = head(response.hits.hits);
            return hit._id;
        }).catch(err => {
            console.error("Error in finding slug by curie " + curie);
            console.error(err);
            return null;
        })
    },
    findBySlug: async (slug) => {
        return esclient.get({
            index: 'scigraph',
            type: 'entities',
            id: slug
        }).then(response => {
            return response;
        }).catch(err => {
            console.error("Error in finding entity details by slug  " + slug);
            console.error(err);
            return [];
        })
    },
    getSpecificDetails: (slugDetails, type) => {
        let details = [];
        switch (type) {
            case 'datasets':
                break;
            default:
                details = slugDetails._source ? slugDetails._source.summary : [];
                break;
        }
        return details;
    }

}
