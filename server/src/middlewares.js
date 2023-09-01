/**
 *  Contain middlewares that could be used by the app.
 *  Make sure to export the middleware by wrapping it at the module object.
 *
 */

const jwt = require("jsonwebtoken")

/**
 * Verify authorization token for all routes except '/login'
 *
 * @param req
 * @param res
 * @param next
 * @constructor
 */
function VerifyToken(req, res, next) {
    const paths = req.path.split("/")
    const path = paths[paths.length - 1]
    if (path === "login") {
        next()
        return
    }

    const auth = req.get("Authorization")
    if (!auth) {
        res.status(401).json({msg: "Please provide authorization header", data: null})
        return
    }

    const token = auth.split(" ")[1]
    const decoded = jwt.verify(token, "secret", function(err, decoded) {
        if (err) {
            res.status(401).json({msg: "Unable to verify: "+err.message, data: null})
            return
        }

        return decoded
    })

    if(decoded.role !== "su") {
        res.status(401).json({msg: "Invalid role", data: null})
        return
    }

    next()
}

module.exports = { VerifyToken }