'use strict';
module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define('Payment', {
        bill_id:DataTypes.INTEGER,
        proof_of_payment: DataTypes.STRING,
        status: DataTypes.STRING,
    }, {
        sequelize,
        modelName: "Payment",
    });
    return Payment;
};
