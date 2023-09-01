/**
 * This file contain all the handlers for each respective routes.
 * Each handler should be exported by wrapping it at the module object.
 *
 */

// external packages
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// local packages
const db = require("./database")
const helper = require("./helpers")


/////////////////////////// Auth //////////////////////////////
/**
 * Login handle authentication of user
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 * @constructor
 */
async function Login(req, res) {
    const body = req.body;

    const user = await db.users.findOne({ where: { username: body.username } })
    if (!user) {
        res.status(404).json({msg: "User not found!", data: null})
        return
    }

    const result = bcrypt.compareSync(body.password, user.password)
    if (!result) {
        res.status(400).json({msg: "Data did not match!", data: null})
        return
    }

    const claims = { role: "su" }
    const token = jwt.sign(claims, 'secret', {expiresIn: '2h'});
    res.json({msg: "Success login", data: {token: token, username: user.username}})
}




/////////////////////////// Employee //////////////////////////////
/**
 * List all user from database
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 * @constructor
 */
async function ListUser(req, res) {
    const users = await db.users.findAll({attributes: ["uuid", "username", "su"]})
    if (!users) {
        res.status(404).json({msg: "No users", data: null })
        return
    }

    res.json({msg: "Success", data: { result: users }})
}


/**
 * Add new user to database
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 * @constructor
 */
async function AddUser(req, res) {
    const body = req.body
    const user = await db.users.create({
        username: body.username,
        password: helper.HashPassword(body.password),
        su: body.su
    })

    if (!user) {
        res.status(500).json({msg: "Unable to add user", data: null})
        return
    }

    res.json({msg: "Success", data: {result: user}})
}


/**
 * Get single user from database based on given id
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 * @constructor
 */
async function GetUser(req, res) {
    const userId = req.params["user_id"]
    const user = await db.users.findByPk(userId, {attributes: ["username", "uuid", "su"]})
    if (!user) {
        res.status(404).json({ msg: "User not found", data: null })
        return
    }

    res.json({ msg: "Success", data: {result: user } })
}


/**
 * Update current user that match given id
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 * @constructor
 */
async function UpdateUser(req, res) {

    const userId = req.params["user_id"]
    const body = req.body

    const user = await db.users.findByPk(userId)
    if (!user) {
        res.status(404).json({msg: "User not found", data: null})
        return
    }

    user.username = body.username
    user.su = body.su
    if (body.password.length !== 0) user.password = helper.HashPassword(body.password)

    await user.save()

    res.json({msg: "Success", data: null})
}


/**
 * Delete single user from database based on given id
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 * @constructor
 */
async function DeleteUser(req, res) {
    const userId = req.params["user_id"]
    const row = await db.users.destroy({where: {uuid: userId}})
    if (row === 0) {
        res.status(404).json({msg: "No user found, unable to delete", data: null})
        return
    }

    res.json({msg: "Success", data: null})
}


/////////////////////////// Employee //////////////////////////////
/**
 * List all employee from database
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 * @constructor
 */
async function ListEmployee(req, res) {
    const employees = await db.employees.findAll({attributes: ["uuid", "name", "email", "gender"]})
    if (!employees) {
        res.status(404).json({msg: "No employees", data: null })
        return
    }

    res.json({msg: "Success", data: { result: employees }})
}


/**
 * Add new employee to database
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 * @constructor
 */
async function AddEmployee(req, res) {
    const body = req.body

    const employee = await db.employees.create({
        name    : body.name,
        email   : body.email,
        photo   : body.photo, // photo is send as blob from client
        gender  : body.gender,
    })

    if (!employee) {
        res.status(500).json({ msg: "Unable to add employee", data: null })
        return
    }

    res.json({ msg: "Success", data: { result: employee } })
}


/**
 * Get single employee from database based on given id
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 * @constructor
 */
async function GetEmployee(req, res) {
    const employeeId = req.params["employee_id"]
    const employee = await db.employees.findByPk(employeeId, { attributes: ["uuid", "name", "email", "gender", "photo"] })
    if (!employee) {
        res.status(404).json({ msg: "Employee not found", data: null })
        return
    }

    res.json({ msg: "Success", data: { result: employee } })
}


/**
 * Update current employee that match given id
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 * @constructor
 */
async function UpdateEmployee(req, res) {

    const employeeId    = req.params["employee_id"]
    const body          = req.body

    const employee= await db.employees.findByPk(employeeId)
    if (!employee) {
        res.status(404).json({msg: "Employee not found", data: null})
        return
    }

    employee.name       = body.name
    employee.email      = body.email
    employee.photo      = body.photo
    employee.gender     = body.gender


    await employee.save()
    res.json({ msg: "Success", data: null })
}


/**
 * Delete single employee from database based on given id
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 * @constructor
 */
async function DeleteEmployee(req, res) {
    const employeeId = req.params["employee_id"]
    const row = await db.employees.destroy({ where: { uuid: employeeId } })
    if (row === 0) {
        res.status(404).json({ msg: "No user found, unable to delete", data: null })
        return
    }

    res.json({ msg: "Success", data: null })
}


module.exports = {
    Login,

    AddUser,
    GetUser,
    ListUser,
    UpdateUser,
    DeleteUser,

    GetEmployee,
    AddEmployee,
    ListEmployee,
    UpdateEmployee,
    DeleteEmployee,
}