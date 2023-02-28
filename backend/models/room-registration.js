'use strict';
module.exports = (sequelize, DataTypes) => {
    const roomRegistration = sequelize.define('roomRegistration', {
        room_id: DataTypes.INTEGER,
        floor: DataTypes.STRING,
        size: DataTypes.STRING,
        direction: DataTypes.STRING,
        price: DataTypes.INTEGER,
        detail: DataTypes.STRING,
        status: DataTypes.STRING,
        date: DataTypes.DATEONLY,
    }, {
        sequelize,
        modelName: "roomRegistration",
    });
    return roomRegistration;
};
