const app = require('express');
const router = app.Router();

const Neode = require('neode');

const instance = new Neode('bolt+routing://7374876f.databases.neo4j.io',
    'neo4j', 'l_-P6kF1rP5ozx96-t-nDLL0AsDseHF_n6ssJefQRoY');

// for more information about neode visit
// https://medium.com/neo4j/interacting-with-neo4j-in-nodejs-using-the-neode-object-mapper-3d99cb324546

// run a cypher
instance.cypher(
    'MATCH (p:ns4__prefixIRI {rdfs__label: {name}}) RETURN p', { name: "notochord" })
    .then(res => {
        console.log("check record")
        console.log(res.records.length);
    })

module.exports = router;