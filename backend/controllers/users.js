const { pool } = require('../models/db')
const bcrypt = require("bcrypt");

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

const updateUser = async function(req, res){
    const user_id = req.params.id;
    let {first_name, last_name, email, password, gender, role_id} = req.body;
    if(password){
        password = await bcrypt.hash(password, 10);
    }

    const values = [user_id, first_name || null, last_name || null, email || null, password || null, gender || null, role_id || null];
    const query = `UPDATE users SET first_name = COALESCE($2, first_name), last_name = COALESCE($3, last_name), email = COALESCE($4, email), password = COALESCE($5, password), gender = COALESCE($6, gender), role_id = COALESCE($7, role_id) WHERE id = $1 RETURNING *;`
    
    pool.query(query, values)
    .then((result) => {
        let successObject = {
            success: true,
            message: "User Updated Successfully",
            result: result.rows
          }
      
          res.status(201).json(successObject)
    })
    .catch((err) => {
        let failObject = {
            success: false,
            message: "Server error",
            err: err.message
          }
      
          res.status(409).json(failObject)
    })
}

const getAllUsers = (req, res) =>{
    const query = `SELECT * FROM users ORDER BY created_at DESC;`
    pool.query(query)
    .then((result) => {
        let successObject = {
            success: true,
            message: "All users",
            result: result.rows
          }
      
          res.status(200).json(successObject)
    })
    .catch((err) => {
        let failObject = {
            success: false,
            message: "Server error",
            err: err.message
          }
      
          res.status(409).json(failObject)
    })
    
}

const getEverything = (req, res) => {
    const query = `SELECT first_name, last_name, email, role, created_at FROM users 
    INNER JOIN roles ON users.role_id = roles.id
    ORDER BY created_at DESC
    LIMIT 5;`
    pool.query(query)
    .then((result) => {
        let successObject = {
            success: true,
            message: "All users",
            result: result.rows
          }
          res.status(200).json(successObject)
    })
    .catch((err) => {
        let failObject = {
            success: false,
            message: "Server error",
            err: err.message
          }
      
          res.status(409).json(failObject)
    })
} 


module.exports = { deleteUser, updateUser, getAllUsers, getEverything }

