/**
 * @author ArkjuniorK
 * @copyright 2023
 *
 * This is the entrypoint of employee-app api server,
 * execute this file to run the api.
 *
 */

console.info("Initializing server, please wait...")

// external dependencies
const express = require("express")
const bodyParser = require("body-parser");
const compression = require("compression")
const morgan = require("morgan")
const cors = require("cors")

// load local dependencies
require("./database")
const router = require("./routes")
const middlewares = require("./middlewares")

// initiate the server and port
const server = express()
const host = "0.0.0.0"
const port= 8081

// setup api routes and middlewares
server.use(cors())
server.use(morgan('tiny'))
server.use(bodyParser.json({limit: '1mb'}))
server.use(compression())
server.use(middlewares.VerifyToken)
server.use("/api", router)

// run the server at given port
server.listen(port, host)
console.info("Server running at", host+":"+port)
