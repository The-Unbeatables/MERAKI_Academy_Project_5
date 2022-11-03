const { pool } = require('../models/db')

const bcrypt = require("bcrypt");

const register = async function(req, res){
  const {first_name, last_name, email, password, gender} = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const values = [first_name, last_name, email, hashedPassword, gender];
  const query = `INSERT INTO users (first_name, last_name, email, password, gender) VALUES ($1,$2,$3,$4,$5) RETURNING *;`
  pool.query(query, values)
  .then((result) => {
    let successObject = {
      success: true,
      massage: "Account Created Successfully",
    }

    res.status(201).json(successObject)
  })
  .catch((err) => {
    let failObject = {
      success: false,
      massage: "The email already exists",
      err: err.message
    }
    if(!email){
        failObject.massage = "Email field is required"
    }
    else if(!password){
        failObject.massage = "Password field is required"
    }
    else if(!first_name){
        failObject.massage = "First name field is required"
    }
    else if(!last_name){
        failObject.massage = "Last name field is required"
    }
    res.status(409).json(failObject)
  })
};

module.exports = {
    register,
};