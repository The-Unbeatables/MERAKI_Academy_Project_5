const express = require('express');
const { addRole } = require('../controllers/roles')

const rolesRouter = express.Router();
rolesRouter.post('/', addRole)

module.exports = rolesRouter;