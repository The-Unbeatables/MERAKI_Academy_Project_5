const express = require("express");
const { deleteUser, updateUser, getAllUsers, getEverything } = require("../controllers/users");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization")
const usersRouter = express.Router();

usersRouter.delete("/:id", authentication, authorization("DELETE_USER"), deleteUser);
usersRouter.put("/:id", authentication, authorization("UPDATE_USER"), updateUser);
usersRouter.get('/', getAllUsers)
usersRouter.get('/all/users/role', getEverything)


module.exports = usersRouter;

