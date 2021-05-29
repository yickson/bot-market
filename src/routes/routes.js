module.exports = (app) => {
    app.use('/', require('./home_routes'));
    app.use('/health', require('./health_routes'));
    app.use('/markets', require('./markets_routes'));
    app.use('/book', require('./book_routes'));
    app.use('/account', require('./account_routes'));
    app.use('/order', require('./order_routes'));
    app.use('/ticker', require('./ticker_routes'));
    app.use('/balance', require('./balance_routes'));
}