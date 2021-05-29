const client = require('../modules/client.cryptomkt');

let sockets;

const socketMethod = {
    connection: async() => {
        sockets = await client.socket.connect()
    },

    orders: async () => {
        return new Promise((resolve, reject) => {
            sockets.on('open-orders', (data) => {
                resolve(data);
            });
        })
    },

    balances: async () => {
        return new Promise((resolve, reject) => {
            sockets.on('balance', (balance) => {
                resolve(balance);
            });
        });
    },

    ticker: async () => {
        return new Promise(resolve => {
            sockets.on('ticker', (data) => {
                resolve(data);
            });
        });
    }
}

module.exports = socketMethod;