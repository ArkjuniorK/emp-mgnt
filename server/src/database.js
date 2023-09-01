/**
 * This file contain database configuration. Import this file
 * so, it could be initialized.
 *
 */

const { Sequelize } = require("sequelize")
const bcrypt = require("bcrypt")
const models = require("./models")
const helpers = require("./helpers")
const sequelize = new Sequelize("employee", "root", "root123", {
    host    : "0.0.0.0",
    port    : "3306",
    dialect : "mysql"
})

const db    = {}
db.sequelize    = sequelize
db.users        = models.User(sequelize)
db.employees    = models.Employee(sequelize)

db.sequelize.sync()
    .then(function(){ console.info("Database synced!") })
    .catch(function(err) { console.error("Failed to sync database:", err.message)})

// seed the user table with default data
// db.users.create({
//     username: "admin",
//     password: helpers.HashPassword("admin123"),
//     su: true
// }).then(r => (console.info("Default user added", r)))

 module.exports = db;