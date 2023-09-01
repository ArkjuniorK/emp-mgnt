/**
 * Contain routes for entire app.
 *
 */

const express = require("express")
const handlers = require("./handlers")
const router = express.Router()

// authentication based routes
const auth = express.Router()
{
   auth.post("/login", handlers.Login)
}

// user based routes
const user = express.Router()
{
   user.route("/")
       .get(handlers.ListUser)
       .post(handlers.AddUser);

   user.route("/:user_id")
       .get(handlers.GetUser)
       .put(handlers.UpdateUser)
       .delete(handlers.DeleteUser);
}

// employee based routes
const employee = express.Router()
{
   employee.route("/")
       .get(handlers.ListEmployee)
       .post(handlers.AddEmployee)

   employee.route("/:employee_id")
       .get(handlers.GetEmployee)
       .put(handlers.UpdateEmployee)
       .delete(handlers.DeleteEmployee);
}


router.use("/auth", auth)
router.use("/user", user)
router.use("/employee", employee)

module.exports = router