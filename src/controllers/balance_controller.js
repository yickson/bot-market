const balance = require('../modules/balance.cryptomkt');

const controller = {

    get: async (req, res) => {
        const myBalance = await balance();
        res.status(200).send({
            data: myBalance.data
        })
    }

}

module.exports = controller;