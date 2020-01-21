const app = require('express');
const router = app.Router();

const Neode = require('neode');

const instance = new Neode('bolt+routing://7374876f.databases.neo4j.io',
    'neo4j', 'l_-P6kF1rP5ozx96-t-nDLL0AsDseHF_n6ssJefQRoY');

// for more information about neode visit
// https://medium.com/neo4j/interacting-with-neo4j-in-nodejs-using-the-neode-object-mapper-3d99cb324546


// run a cypher

async function queryNeo4j(search_term) {
    let result = [];
    await instance.cypher(
        "MATCH (n)-[:rdfs__subClassOf]->(p)-[:rdfs__subClassOf]->(q) where p.rdfs__label = '" + search_term +"'"+
        " and n.rdfs__label is not null " +
        " and q.rdfs__label is not null " +
        " RETURN distinct n.rdfs__label as child, p.rdfs__label as term, q.rdfs__label as parent"
    ).then(async res => {
        console.log("check record")
        console.log(res.records);
        result = res.records;
    })
    return result;
}


router.get('/get-brain-region-relations', async function (req, res) {
    console.debug("check query2");
    console.debug(req.query);
    if (req.query.term) {
        const data = await queryNeo4j(req.query.term.toString());
        console.log("returend data");
        console.log(data);
        res.send(data);
    } else {
        res.send([]);
    }
});

module.exports = router;
