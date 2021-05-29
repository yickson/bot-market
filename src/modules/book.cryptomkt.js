const client = require('./client.cryptomkt');

const book = async () => {
    try {
        const book = await client.getBook({"market": "ETHCLP", "side": "buy"});
        let data = book.data;
        const newData = [];
        data.map((item) => {
            let dateHuman = new Date(item.timestamp);
            let myObject = {
                price: item.price,
                amount: item.amount,
                timestamp: dateHuman.getDate() + "/" + (dateHuman.getMonth() + 1)+ "/" + dateHuman.getFullYear()
            }
            newData.push(myObject);
        });
        return newData;
    } catch (e) {
        console.error(e);
    }
}

module.exports = book;