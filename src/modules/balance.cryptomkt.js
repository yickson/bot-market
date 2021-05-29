const client = require('./client.cryptomkt');

const balance = async () => {
    const myBalance = await client.getBalance();
    return myBalance.response;
}

module.exports = balance;