const express = require('express');
const { addRole, addPermission } = require('../controllers/roles')

const rolesRouter = express.Router();
rolesRouter.post('/', addRole);
rolesRouter.post('/permission', addPermission)

module.exports = rolesRouter;