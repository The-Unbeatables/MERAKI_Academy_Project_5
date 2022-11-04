const { pool } = require('../models/db')

const deleteUser = (req, res) => {
    const user_id = req.params.id;
    const isDeletedNew = 1;
    const values = [user_id, isDeletedNew];
    const query = `UPDATE users SET is_deleted = $2 WHERE id = $1 RETURNING *;`
    
    pool.query(query, values)
    .then((result) => {
        let successObject = {
            success: true,
            message: "User Deleted Successfully",
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

module.exports = { deleteUser }