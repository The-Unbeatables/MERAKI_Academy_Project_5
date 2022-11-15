const { pool } = require("../models/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


const googleLogin = (req, res) => {


    console.log(req.body);

    const { firstName, lastName, email } = req.body;
  
    const values1 = [email.toLowerCase()];
    const query1 = `SELECT * FROM users WHERE email = $1`;
    pool
      .query(query1, values1)
      .then(async (result) => {
        if (result.rowCount === 1) {
          const payload = {
            userId: result.rows[0].id,
            firstName: result.rows[0].first_name,
            role: 2,
          };
          const options = { expiresIn: "1d" };
          const token = await jwt.sign(payload, process.env.secret, options);
          res.status(201).json({
            userId: result.rows[0].id,
            token,
            role: 2,
          });
        } else {
          const values2 = [firstName, lastName, email.toLowerCase(), 123, 2];
          const query2 = `INSERT INTO users (first_name, last_name, email, password, role_id) VALUES ($1,$2,$3,$4,$5) RETURNING *;`;
          pool
            .query(query2, values2)
            .then(async (result) => {
              const payload = {
                userId: result.rows[0].id,
                firstName: result.rows[0].first_name,
                role: 2
              };
              const options = { expiresIn: "1d" };
              const token = await jwt.sign(payload, process.env.secret, options);
              res.status(201).json({
                userId: result.rows[0].id,
                token,
                role: 2,
              });
            })
            .catch((err) => {
              res.status(500).json({
                success: false,
                message: "Server error",
                err: err.message,
              });
            });
        }
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Server error",
          err: err.message,
        });
      });

    
  };

  module.exports = {googleLogin}