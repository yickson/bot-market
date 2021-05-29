const sqlite3 = require('async-sqlite3');

const sql = new sqlite3();

const methods = {

    openDb: async () => {
        await sql.open(__dirname+'/bot.db');
    },

    getMarkets: async function () {
        const query = 'SELECT Name as nombre, Value as valor, d1 as dia1, d7 as dia7 FROM markets';
        return await sql.all(query);
    },

    updateMarkets: async(data, market) => {
        let query = `UPDATE markets SET  ask = ?, bid = ?, value = ?, d1 = ?, d7 = ?, updated_at = date('now') WHERE name = '${market}'`;
        await sql.run(query, data);
    },

    searchOrder: async(externalId) => {
        let query = 'SELECT * FROM trades WHERE externalId = ?';
        let result = await sql.get(query, externalId);
        if (result === undefined) {
            return 0;
        } else {
            return 1;
        }
    },

    createOrder: async (order) => {
        let query = "INSERT INTO trades (market, externalId, amount, crypto, type, price, status, created_at, updated_at) values (?, ?, ?, ?, ?, ?, ?, date('now'), date ('now'))";
        await sql.run(query, order);
    },

    close: async () => {
        await sql.close();
        console.log('Database closed');
    }
}

module.exports = methods;