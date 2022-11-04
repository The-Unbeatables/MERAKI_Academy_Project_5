const express = require("express");
// const { register } = require("../controllers/register");
const { customerLogin, workerLogin } = require("../controllers/login")

const loginRouter = express.Router();

loginRouter.post("/customer", customerLogin);
loginRouter.post("/worker", workerLogin);

module.exports = loginRouter;