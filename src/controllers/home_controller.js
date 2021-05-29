const client = require('../modules/client.cryptomkt');
const tickerEnum = require('../enum/enum.ticker');
const operator = require('../modules/socket.cryptomkt');

const controller = {
    index: async (req, res) => {
        res.render("index", { titulo: "Inicio de Bot", currencies: tickerEnum });
    },

    getIndicators: async (req, res) => {
        const response = await operator.ticker();
        res.send({data: response});
    }
}

module.exports = controller;