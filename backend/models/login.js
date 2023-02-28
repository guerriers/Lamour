'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        status : DataTypes.STRING
    }, {
        sequelize,
        modelName: "User",
        scopes: {
            withoutPassword: {
                attributes: {
                    exclude: ["password"],
                },
            },
        },
    });
    return User;
};