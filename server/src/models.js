/**
 * Define and export all models here, so it could be
 * initialized by database module.
 *
 */

const { DataTypes } = require("sequelize")

function User(sequelize) {
    return sequelize.define('user', {
        uuid: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        su: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    })
}
function Employee(sequelize) {
    return sequelize.define("employee", {
        uuid: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {type: DataTypes.STRING},
        photo: {type: DataTypes.BLOB('long')},
        gender: {type: DataTypes.STRING},
    });
}

module.exports = { User, Employee }