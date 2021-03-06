const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const path = require('path');


app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Views
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

require('./routes/routes')(app);

module.exports = app;