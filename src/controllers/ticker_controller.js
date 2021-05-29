const ticker = require('../modules/ticker.cryptomkt');

const controller = {

    ticker: async (req, res) => {
        const market = req.body;
        const getTicker = await ticker.getTicker(market);
        res.status(200).send({
            data: getTicker
        });
    },

    all: async (req, res) => {
        const getTickers = await ticker.tickers();
        res.status(200).send({
            data: getTickers
        });
    }

}

module.exports = controller;