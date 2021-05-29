const order = require('../modules/order.cryptomkt');

const controller = {

    create: async (req, res) => {
        const myOrder = req.body;
        const createOrder = await order.create(myOrder);
        console.log(createOrder);
        res.status(200).send({
            data: createOrder
        })
    },

    cancel: async (req, res) => {
        const id = req.body;
        const cancelOrder = await order.cancel(id);
        console.log(cancelOrder);
        res.status(200).send({
            data: cancelOrder
        });
    },

    get: async (req, res) => {
        const { market } = req.body;
        const getOrder = await order.get(market);
        console.log(getOrder);
        res.status(200).send({
            data: getOrder
        })
    },

    getExec: async (req, res) => {
        const market = req.body;
        const getExec = await order.getExecute(market);
        res.status(200).send({
            data: getExec
        })
    },

    getStatus: async (req, res) => {
        const id = req.body;
        const orderStatus = await order.getStatus(id);
        res.status(200).send({
            data: orderStatus
        })
    }

}

module.exports = controller;