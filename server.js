var dotenv = require('dotenv');
dotenv()._loadEnv()

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
var db = require('./config/connection.js')


mongoose.connect(db.db).catch((reason) => {
    console.log('could not connect to database for ' + reason);
}).then((connection) => {
    console.log(connection.connectionOptions);
});

console.log(db.db_dev);

var port = process.env.PORT || 6969;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(static('./client/public'));
// routes
require('./server/routs')(app);

app.use(express.static(path.resolve(__dirname, './client/build')));
app.get('*', function (req, res) {
  console.log('loading page');
  res.sendFile(path.resolve(__dirname, '/client/build/index.html'));
  res.end();
});
app.listen(port, (e) => {
    if(e) throw e;
    console.log('server listening on port:' + port);
});