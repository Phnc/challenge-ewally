const getBankSlipInfo = require('../../util/boletoValidation');

module.exports = function (app) {
    app.get("/boleto/:boleto", (req, res) => {
        const digitableLine = req.params.boleto;
        result = getBankSlipInfo(digitableLine);
        if(typeof result == 'string'){
            res.status(400).json(result);
        } else{
            res.status(200).json(result);
        }
    });
}