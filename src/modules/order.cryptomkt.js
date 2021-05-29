const client = require('./client.cryptomkt');

const order = {
    // {"amount": 1, "market": "XLMCLP", "price": 50.5, "type": "limit", "side": "sell"}
    create: async (myOrder) => {
        try {
            const newOrder = await client.createOrder(myOrder);
            return newOrder.response;
        } catch (e) {
            console.error('Hubo un error', e);
        }

    },
    // {"id":"O000004"}
    cancel: async (id) => {
        try {
            const cancelOrder = await client.cancelOrder(id);
            console.log(cancelOrder);
            return cancelOrder.response;
        } catch (e) {
            console.error('Hubo un error', e);
        }
    },
    // {"market":"XLMCLP"}
    get: async (market) => {
        const orders = await client.getActiveOrders(market);
        console.log(orders);
        return orders.response;
    },
    // {"market":"XLMCLP"}
    getExecute: async (market) => {
        const orderExec = await client.getExecutedOrders(market);
        return orderExec.response;
    },
    //{"id":"O000005"}
    getStatus: async (id) => {
        const orderStatus = await client.getOrderStatus(id);
        return orderStatus.response;
    },
    // {"amount": 5000, "market":"XLMCLP", "type": "market", "side": "buy"}
    makeInstant: async (myOrder) => {
        try {
            const newOrder = await client.createOrder(myOrder);
            return newOrder.response;
        } catch (e) {
            console.error('Hubo un error', e);
        }
    }
}

module.exports = order;