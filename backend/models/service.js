'use strict';
module.exports = (sequelize, DataTypes) => {
    const Service = sequelize.define('Service', {
        room_id: DataTypes.INTEGER,
        electricity_bill: DataTypes.INTEGER,
        water_bill: DataTypes.INTEGER,
        common_fee: DataTypes.INTEGER,
        total_bill :DataTypes.INTEGER,
        status: DataTypes.STRING,
    }, {
        sequelize,
        modelName: "Service",
    });
    return Service;
};
