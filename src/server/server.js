const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();


// allow cross domain access
var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}
app.use(allowCrossDomain);


app.use(express.static(path.join(__dirname, 'build')));


// api routes
const custom = require('./routes/other-routes.js');
const client_routes = require('./routes/client-routes.js');
app.use('/custom/', custom);
app.use('/api/', client_routes);


// eveything else will be served to the client
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8081, () => {
  console.debug("listerning")
});