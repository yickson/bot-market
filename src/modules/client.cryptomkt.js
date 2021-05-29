const { Client } = require('cryptomarket');
require('dotenv').config({path: __dirname+'/../.env'});


const client = new Client({
    'apiKey': process.env.API_KEY_CRMKT,
    'apiSecret': process.env.API_SECRET_CRMKT,
});

module.exports = client;