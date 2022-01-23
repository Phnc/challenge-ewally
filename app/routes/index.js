const boletoRoute = require('./boleto');

module.exports = function(app){
    boletoRoute(app);
}