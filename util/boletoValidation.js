const banks = require('../data/banks.json');

function getBankSlipInfo(digitableLine) {
    if(!digitableLine.match(/^\d+$/)){
        return "A linha digitavel so deve conter numeros";
    }

    if (digitableLine.length != 47) {
        return "Linha Digitável Incorreta";
    }

    if (digitableLine.substr(3, 1) != '9') {
        return "Moeda Inválida";
    }

    if (!checkIsValidBank(digitableLine)) {
        return "Banco Inválido";
    }

    barPt1 = digitableLine.substr(0, 4); // igual aos 4 primeiros digitos do campo 1 (banco + moeda)
    barPt2 = digitableLine.substr(32, 15); // campos 4 e 5 da linha digitavel
    barPt3 = digitableLine.substr(4, 5); // restante do campo 1 (excluindo banco e moeda)
    barPt4 = digitableLine.substr(10, 10); // campo 2 exluindo o DV
    barPt5 = digitableLine.substr(21, 10); // campo 3 excluindo o DV

    barCode = `${barPt1}${barPt2}${barPt3}${barPt4}${barPt5}`;


    daysFactor = Number(barCode.substr(5, 4));

    initialDate = new Date(1997, 9, 7, 0, 0, 0, 0);

    expirationDate = addDays(initialDate, daysFactor);

    expirationDateStr = expirationDate.toISOString().substr(0, 10)

    value1 = barCode.substr(9, 8);
    value2 = barCode.substr(17, 2);
    value = `${Number(`${value1}.${value2}`).toFixed(2)}`;

    return {
        "barcode": barCode,
        "amount": value,
        "expirationDate": expirationDateStr
    }
}

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function checkIsValidBank(digitableLine) {
    const bankCode = digitableLine.substr(0, 3);

    if (typeof banks.find(bank => bank.value == bankCode) == 'undefined') {
        return false;
    }

    return true;
}

module.exports = getBankSlipInfo;