const express = require("express");
// const { register } = require("../controllers/register");
const { customerLogin, workerLogin } = require("../controllers/login");
const { googleLogin } = require("../controllers/loginWithGoogle");

const loginRouter = express.Router();

loginRouter.post("/customer", customerLogin);
loginRouter.post("/worker", workerLogin);
loginRouter.post("/google",googleLogin)

module.exports = loginRouter;