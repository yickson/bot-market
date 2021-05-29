const client = require('./client.cryptomkt');

const markets = async () => {
    try {
        return await client.getMarkets();
    } catch (e){
        console.error(e);
    }
}

module.exports = markets;