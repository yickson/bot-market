const client = require('./client.cryptomkt');

const ticker = {

    getTicker: async(market) => {
        const ticker = await client.getTicker(market);
        return ticker.response;
    },

    tickers: async() => {
        const ticker = await client.getTicker();
        return ticker.response;
    }
}

module.exports = ticker;