const app = require('express');
const router = app.Router();

const Neode = require('neode');


// for more information about neode visit
// https://medium.com/neo4j/interacting-with-neo4j-in-nodejs-using-the-neode-object-mapper-3d99cb324546

// run a cypher
async function queryNeo4j(query, database) {
  let instance = ""
  if (database == "UBERON"){
    instance = new Neode('bolt+routing://7374876f.databases.neo4j.io',
      'neo4j', 'l_-P6kF1rP5ozx96-t-nDLL0AsDseHF_n6ssJefQRoY');
    }
    if (database == "NIFSTD"){
      instance = new Neode('bolt+routing://55766727.databases.neo4j.io',
        'neo4j', '4wgAduNgJewbKCVxMHZoeBvRc_46Q_KOqdVF1PIvUXw');
      }

    let result = [];
    await instance.cypher(query).then(async res => {
            console.log("Neo4j results")
            console.log(res.records);
            result = res.records;
        })
    return result;
}

router.get('/get-brain-region-relations', async function (req, res) {
    console.debug("Get root paths for a term");
    console.debug(req.query);
    cypher_query =  'WITH ' + req.query.term + ' as term '+
                    'MATCH (n)-[:rdfs__subClassOf]->(p)-[:rdfs__subClassOf]->(q) '+
                    'where p.rdfs__label = term '+
                    'and n.rdfs__label is not null '+
                    'and q.rdfs__label is not null '+
                    'RETURN distinct { child: {label:n.rdfs__label, id:n.skos__notation}, term: {label:p.rdfs__label, id:p.skos__notation}, parent:{label: q.rdfs__label,id:q.skos__notation } }'
    const data = await queryNeo4j(cypher_query, "UBERON");
    console.log("Returned data");
    console.log(data);
    res.send(data);
});

router.get('/get-paths', async function (req, res) {
    console.debug("Get root paths for a term");
    console.debug(req.query);
    cypher_query =  '<<TODO>>'
    const data = await queryNeo4j(cypher_query);
    console.log("Returned data");
    console.log(data);
    res.send(data);
});


router.get('/get-by-reference-id', async function (req, res) {
    console.debug("Get CURIE from any reference id like MBA:xxx");
    console.debug(req.query);
    cypher_query =  'MATCH (n:owl__Class)-[:rdfs__subClassOf]->(p:owl__Class)'+
                    'where  n.ns3__hasDbXref =  '+ req.query.external_id +
                    ' return n.skos__notation as curie, n.ns3__hasDbXref as search_id'
    const data = await queryNeo4j(cypher_query, "NIFSTD");
    console.log("Returned data");
    console.log(data);
    res.send(data);
});

module.exports = router;
