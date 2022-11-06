const { pool } = require('../models/db')

const addProductOrder = (req, res) => {
    const {user_id, product_id} = req.body;
    const values = [user_id, product_id];
    const query = `INSERT INTO product_orders (user_id, product_id) VALUES ($1, $2) RETURNING *`

    pool.query(query, values)
    .then((result) => {
        let successObject = {
            success: true,
            massage: "Order Created Successfully",
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

module.exports = { addProductOrder }