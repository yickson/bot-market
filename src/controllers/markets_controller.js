const markets = require('../modules/markets.cryptomkt');

const controller = {
    getMarkets: async (req, res) => {
        const result = await markets();
        console.log(result.data);
        return res.status(200).json({
            data: result.data
        });
    }
}

module.exports = controller;