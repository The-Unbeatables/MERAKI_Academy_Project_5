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

module.exports = { addRole }