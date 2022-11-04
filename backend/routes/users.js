const express = require("express");
const { deleteUser } = require("../controllers/users");

const usersRouter = express.Router();

usersRouter.delete("/:id", deleteUser);

module.exports = usersRouter;