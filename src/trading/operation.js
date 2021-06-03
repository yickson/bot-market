const cron = require('node-cron');
const client = require('../modules/client.cryptomkt');
const order = require('../modules/order.cryptomkt');
const ticker = require('../modules/ticker.cryptomkt');
const tickerEnum = require('../enum/enum.ticker');
const tickersocketEnum = require('../enum/enum.tickersocket');
const telegram = require('../modules/telegram.bot');
const methods = require('../database/db');
require('dotenv').config({path: __dirname+'/../.env'});

const operationTrading = async () => {
    const { data } = await ticker.tickers();
    return data;
}

let socket;
let balancesS;
let openOrdersS;
let begins = true;

(async () => {
    socket = await client.socket.connect();
    await methods.openDb();
    // Chequea indicadores de los mercados
    const myTickers = {};
    socket.on('ticker', (data) => {
        for (const ticker in tickerEnum) {
            if (ticker in data) {
                myTickers[ticker] = data[ticker];
            }
        }
    });
    // Chequea balance
    socket.on('balance', async (balance) => {
        let myBalance = {};
        for (const tickersocket of tickersocketEnum) {
            let balanceCrypto = (await toFixedNotation(balance[tickersocket].available)).toString();
            if (tickersocket !== 'CLP') {
                myBalance[tickersocket] = balanceCrypto.slice(0, 6);
            } else {
                myBalance[tickersocket] = parseInt(balanceCrypto).toString();
            }
        }
        balancesS = myBalance;
    });
    // Chequea ordenes abiertas
    socket.on('open-orders', async (data) => {
        openOrdersS = data;
        await checkOrders(data);
    });

    // Reloj recurrente que ejecuta la operación cada cierto tiempo
    cron.schedule(`*/${process.env.CRON_MINUTES} * * * *`, async () => {
        console.log('Ejecutando operación');
        // Obtiene los porcentajes
        let marketDB = await getIndicatorMarkets();
        // Comienzo no compara para que solo haga la actualización de los mercados
        if (!begins) {
            await comparativePrice(myTickers, marketDB);
        } else {
            begins = false;
        }
        // Actualiza la tabla markets con los nuevos indicadores
        await theMarkets(myTickers);
    }, {
        scheduled: true
    });

})();

/**
 * Actualiza tabla markets
 * @param markets
 * @returns {Promise<void>}
 */
const theMarkets = async (markets) => {
    for (const ticker in tickerEnum) {
        let {ASK, BID, delta1d, delta7d} = markets[ticker];
        let value = (parseInt(ASK) + parseInt(BID)) / 2;
        await methods.updateMarkets([parseInt(ASK), parseInt(BID), value, delta1d, delta7d], ticker);
    }
}

/**
 * Obtiene los datos de los mercados en la DB
 * @returns {Promise<any>}
 */
const getIndicatorMarkets = async () => {
    return await methods.getMarkets();
}

/**
 * Compara las variaciones de precios
 * @param mytickers
 * @param tickerdb
 * @returns {Promise<void>}
 */
const comparativePrice = async (mytickers, tickerdb) => {
    for (const item of tickerdb) {
        let {nombre, dia1} = item;
        let { delta1d } = mytickers[nombre];
        if (delta1d > dia1) {
            console.log('El porcentaje ha aumentado', delta1d, nombre);
            let variation = parseFloat(process.env.CHANGE_IN_PRICE);
            if ((dia1 + variation) < delta1d) {
                console.log('Ejecutando compra de', nombre);
                let id = await generateOrder(nombre);
                console.log(id);
                // Si el ID es 0 no tenemos saldo
                if (id !== 0) {
                    telegram.setting(process.env.TOKEN, process.env.USERID);
                    await telegram.send(`Realizando orden de compra ${nombre} por un monto de ${process.env.AMOUNT_BY_OPERATION}`);
                    await delay(10000);
                    console.log('Retraso de 10 segundos');
                    let orderSell = await generateOrderSell(id);
                    await telegram.send(`Realizando orden de venta ${nombre} por un monto de ${orderSell.price}`);
                }

            } else {
                console.log('No cumple condición de compra');
            }
        } else {
            console.log('El porcentaje no ha aumentado, no realizo la compra', delta1d, dia1);
        }
    }
}

/**
 * Chequea la ordenes en base al socker de open-orders
 * @param orders
 * @returns {Promise<void>}
 */
const checkOrders = async (orders) => {
    for (const myOrder of orders) {
        let search = await methods.searchOrder([myOrder.tradeId]);
        if (search === 0) {
            console.log('Generando orden en base de datos');
            const {stockId, tradeId, amount, side, price} = myOrder;
            let amountTotal = price * amount;
            let type = side === 1 ? 'buy' : 'sell';
            await methods.createOrder([stockId, tradeId, amountTotal, amount, type, price, 'queued']);
        }
    }
}

/**
 * Genera la orden de compra y venta correspondiente
 * @param myMarket
 * @returns {Promise<void>}
 */
const generateOrder = async (myMarket) => {
    const myOrder = {
        amount: parseInt(process.env.AMOUNT_BY_OPERATION),
        market: myMarket,
        type: 'market',
        side: 'buy'
    };
    let balanceCLP = balancesS.CLP;
    if (parseInt(balanceCLP) >= parseInt(process.env.AMOUNT_BY_OPERATION)) {
        let orderExec = await order.create(myOrder);
        let { id } = orderExec.data;
        return id;
    } else {
        console.log('No tienes suficiente saldo para la compra');
        return 0;
    }
}

/**
 * Crea la orden de venta con el porcentaje definido 
 * @param id
 * @returns {Promise<*>}
 */
const generateOrderSell = async (id) => {
    console.log('Id de orden para generar la venta', id);
    // Buscamos la orden para saber las condiciones de compra
    let orderQuery = await order.getStatus({id: id});
    let { market, amount, avg_execution_price, side } = orderQuery.data;
    // Obtenemos criptomonedas que efectivamente si tenemos
    let amountSell = parseFloat(amount.original) - parseFloat(amount.original) * 0.006
    console.log('Monto de venta', amountSell);
    // Creamos la orden en la base de datos
    await methods.createOrder([market, id, parseInt(process.env.AMOUNT_BY_OPERATION), amountSell, side, avg_execution_price, 'queued']);
    //Generamos una orden de venta
    let priceSell = parseFloat(avg_execution_price) * (parseFloat(process.env.PERCENTAGE_PROFIT) / 100) + parseFloat(avg_execution_price);
    const myOrderSell = {
        amount: amountSell.toString(),
        market: market,
        price: priceSell.toString(),
        type: "limit",
        side: "sell"
    }
    console.log('Data para generar venta', myOrderSell);
    // Crea orden de venta
    let orderExecSell = await order.create(myOrderSell);
    console.log('Orden de venta', orderExecSell.data);
    return orderExecSell.data;
}

/**
 * Devuelve un número ya que hay fondos con notación cientifíca
 * @param x
 * @returns {Promise<*>}
 */
const toFixedNotation = async(x) => {
    let e;
    if (Math.abs(x) < 1.0) {
        e = parseInt(x.toString().split('e-')[1]);
        if (e) {
            x *= Math.pow(10,e-1);
            x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
        }
    } else {
        e = parseInt(x.toString().split('+')[1]);
        if (e > 20) {
            e -= 20;
            x /= Math.pow(10,e);
            x += (new Array(e+1)).join('0');
        }
    }
    return x;
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))



