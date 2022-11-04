const express = require("express");
// const { register } = require("../controllers/register");
const { CustomerLogin } = require("../controllers/login")

const loginRouter = express.Router();

loginRouter.post("/customer", CustomerLogin);

module.exports = loginRouter;