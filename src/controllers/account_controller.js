const account = require('../modules/account.cryptomkt');

const controller = {
    getAccount: async (req, res) => {
        const myAccount = await account();
        res.status(200).send({
            data: myAccount
        })
    }
}

module.exports = controller;