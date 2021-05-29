const client = require('./client.cryptomkt');

const account = async () => {
    try {
        const account = await client.getAccount();
        const response = account.response.data;
        return {
            name: response.name,
            email: response.email,
            rate: response.rate,
            funds: response.deposit_debts
        };
    } catch (e) {
        console.error(e);
    }
}

module.exports = account;