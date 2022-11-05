const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { pool } = require("../models/db");

const customerLogin = async function(req, res){
  const {email, password} = req.body;
  const values = [email];
  const query = `SELECT * FROM users WHERE email= $1;`
  pool.query(query, values)

  .then(async function(result){
    if(result.rows.length === 0){
      let failedEmailObject = {
        success: false,
        massage: "email not found"
      }
      res.status(404).json(failedEmailObject)
    }
    
    else{
      const checkValue = await bcrypt.compare(password, result.rows[0].password);
      if(!checkValue){
        let failedPasswordObject = {
          success: false,
          massage: "The password you’ve entered is incorrect"
        }
        res.status(403).json(failedPasswordObject)
      }else{
        const payload = {
          userId: result.rows[0].id,
          first_name: result.rows[0].first_name,
          role: 2
        }
        const secret = process.env.secret

        const options = {
          expiresIn: "1h",
        }
        const token = await jwt.sign(payload, secret, options)
        let theRoleId = 2
        let theUserId = result.rows[0].id
        const values = [theRoleId, theUserId]
        const query = 'UPDATE users SET role_id = $1 WHERE id=$2 RETURNING *;'
        pool.query(query, values)
        .then((result) => {
            let successObject = {
                success: true,
                message: "login successfull",
                token: token,
                result: result.rows,
              }
              res.status(200).json(successObject)
        })
          

      }
      
    }
  })
  .catch((err) => {
    let failObject = {
      success: false,
      massage: "Server error",
      err: err.message
    }

    res.status(404).json(failObject)
  })
};

const workerLogin = async function(req, res){
  const {email, password} = req.body;
  const values = [email];
  const query = `SELECT * FROM users WHERE email= $1;`
  pool.query(query, values)

  .then(async function(result){
    if(result.rows.length === 0){
      let failedEmailObject = {
        success: false,
        massage: "email not found"
      }
      res.status(404).json(failedEmailObject)
    }
    
    else{
      const checkValue = await bcrypt.compare(password, result.rows[0].password);
      if(!checkValue){
        let failedPasswordObject = {
          success: false,
          massage: "The password you’ve entered is incorrect"
        }
        res.status(403).json(failedPasswordObject)
      }else{

        const idUser = result.rows[0].id;
        const data = [idUser];
        const query_2 = `SELECT * FROM workers WHERE user_id = $1`
        pool.query(query_2, data)
        .then((result) => {
          if((result.rows).length === 0){
            const data = [idUser];
            const query = `INSERT INTO workers (user_id) VALUES ($1) RETURNING *`
            pool.query(query, data)
            .then((result) => {
              console.log(result.rows);
            })
          }
        })
        .catch((err) => {
          let failObject = {
            success: false,
            massage: "Server error",
            err: err.message
          }
      
          res.status(404).json(failObject)
        })

        const payload = {
          userId: result.rows[0].id,
          first_name: result.rows[0].first_name,
          role: 3
        }
        const secret = process.env.secret

        const options = {
          expiresIn: "1h",
        }
        const token = await jwt.sign(payload, secret, options)
        let theRoleId = 3
        let theUserId = result.rows[0].id
        const values = [theRoleId, theUserId]
        const query = 'UPDATE users SET role_id = $1 WHERE id=$2 RETURNING *;'
        pool.query(query, values)
        .then((result) => {
            let successObject = {
                success: true,
                message: "login successfull",
                token: token,
                result: result.rows,
              }
              res.status(200).json(successObject)
        })
          

      }
      
    }
  })
  .catch((err) => {
    let failObject = {
      success: false,
      massage: "Server error",
      err: err.message
    }

    res.status(404).json(failObject)
  })
};

module.exports = {customerLogin, workerLogin}