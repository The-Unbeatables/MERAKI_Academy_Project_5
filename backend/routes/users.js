const express = require("express");
const { deleteUser, updateUser } = require("../controllers/users");

const usersRouter = express.Router();

usersRouter.delete("/:id", deleteUser);
usersRouter.put("/:id", updateUser)

module.exports = usersRouter;