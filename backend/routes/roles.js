const express = require('express');
const { addRole, addPermission, addRolePermission } = require('../controllers/roles')

const rolesRouter = express.Router();
rolesRouter.post('/', addRole);
rolesRouter.post('/permission', addPermission)
rolesRouter.post('/role/permission', addRolePermission)

module.exports = rolesRouter;