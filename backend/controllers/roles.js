const { pool } = require('../models/db')

const addRole = (req, res) => {
    const {role} = req.body;
    const values = [role];
    const query = `INSERT INTO roles (role) VALUES ($1) RETURNING *`

    pool.query(query, values)
    .then((result) => {
        let successObject = {
            success: true,
            massage: "Role Created Successfully",
            result: result.rows
          }
      
          res.status(201).json(successObject)
    })
    .catch((err) => {
        let failObject = {
            success: false,
            massage: "Server error",
            err: err.message
          }
      
          res.status(409).json(failObject)
    })
}

const addPermission = (req, res) => {
    const {permission} = req.body;
    const values = [permission];
    const query = `INSERT INTO permissions (permission) VALUES ($1) RETURNING *`

    pool.query(query, values)
    .then((result) => {
        let successObject = {
            success: true,
            massage: "permission Created Successfully",
            result: result.rows
          }
      
          res.status(201).json(successObject)
    })
    .catch((err) => {
        let failObject = {
            success: false,
            massage: "Server error",
            err: err.message
          }
      
          res.status(409).json(failObject)
    })
}

const addRolePermission = (req, res) => {
    const {role_id, permission_id} = req.body;
    const values = [role_id, permission_id];
    const query = `INSERT INTO role_permission (role_id, permission_id) VALUES ($1, $2) RETURNING *`

    pool.query(query, values)
    .then((result) => {
        let successObject = {
            success: true,
            massage: "role_permission Created Successfully",
            result: result.rows
          }
      
          res.status(201).json(successObject)
    })
    .catch((err) => {
        let failObject = {
            success: false,
            massage: "Server error",
            err: err.message
          }
      
          res.status(409).json(failObject)
    })
}

module.exports = { addRole, addPermission, addRolePermission }

