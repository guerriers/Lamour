'use strict';
module.exports = (sequelize, DataTypes) => {
    const Resident = sequelize.define('Resident', {
        room_id: DataTypes.INTEGER,
        floor: DataTypes.STRING,
        size: DataTypes.STRING,
        direction: DataTypes.STRING,
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        phone: DataTypes.STRING,
        car_registration: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        date: DataTypes.DATEONLY,
    }, {
        sequelize,
        modelName: "Resident",
    });
    return Resident;
};
