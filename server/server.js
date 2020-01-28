const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();

// to be able to read environment variables 
// const dotenv = require('dotenv');
const dotenv =require('dotenv');
dotenv.config();

// allow cross domain access
var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}
app.use(allowCrossDomain);


app.use(express.static(path.resolve(__dirname, '../build')));

// document.write("Hi! welcome");
// api routes
const custom = require('./routes/other-routes.js');
const client_routes = require('./routes/client-routes.js');

app.use('/graph/', custom);
app.use('/entity/', client_routes);


// eveything else will be served to the client
app.get('/*', function (req, res) {
  console.debug("request check");
  console.debug(req);
  
  res.sendFile(path.join(path.resolve(__dirname, '../build'), 'index.html'));
});


app.listen(5000, (req) => {
  // console.debug(app.address());
  console.debug("listerning")

});

// var privateKey = fs.readFileSync('/etc/letsencrypt/live/knowledge-space.org/privkey.pem');
// var certificate = fs.readFileSync('/etc/letsencrypt/live/knowledge-space.org/fullchain.pem');

// https.createServer({
//   key: privateKey,
//   cert: certificate
// }, app).listen(8081, () => {
//   console.debug("listening")
// });