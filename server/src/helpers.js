/**
 * Contain helper functions for entire app. Make sure to export the helper
 * by wrapping it at the module object.
 *
 */

const bcrypt = require("bcrypt")
const rounds = 10

/**
 * Hashed the password using bcrypt sync
 *
 * @param {String} password
 * @returns {String}
 * @constructor
 */
function HashPassword(password) {
    return bcrypt.hashSync(password, rounds)
}

module.exports = { HashPassword }