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
const deleteProductOrder = (req, res) => {
    const  orderId  = req.params.id;
    const values = [orderId];
    const query = `UPDATE product_orders SET is_deleted = 1 WHERE id = $1 RETURNING *;`

    pool.query(query, values)
    .then((result) => {
        let successObject = {
            success: true,
            massage: "Order deleted Successfully",
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

module.exports = { addProductOrder, deleteProductOrder }