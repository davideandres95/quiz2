var crypto = require('crypto');

// Definición de la clase User:

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('User',
        {   username: {
                type: DataTypes.STRING,
                unique: true,
                validate: { notEmpty : { msg: "Falta username"  }}
        },
            password: {
                type: DataTypes.STRING,
                validate: { notEmpty: {msg: "Falta password"}},
                set: function (password) {
                    //String aleatorio usado como salt.
                    this.salt = Math.round((new Date().valueOf() * Math.random())) + ' ';
                    this.setDataValue('password', encryptPassword(password, this.salt()));
                    }
                },
                salt: {
                    type: DataTypes.STRING
                },
                isAdmin: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false
                }
    });
};