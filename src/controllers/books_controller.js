const book = require('../modules/book.cryptomkt');

const controller = {
    getBook: async (req, res) => {
        const result = await book();
        res.status(200).send({
            data: result
        })
    }
}

module.exports = controller;