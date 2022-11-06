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

const deleteAllUserProductOrders = (req, res) => {
    const  userId  = req.params.id;
    const values = [userId];
    const query = `UPDATE product_orders SET is_deleted = 1 WHERE userId = $1 RETURNING *;`

    pool.query(query, values)
    .then((result) => {
        let successObject = {
            success: true,
            massage: "Orders deleted Successfully",
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

const getAllProductOrders = (req, res) => {

    const query = `SELECT * FROM product_orders INNER JOIN users ON product_orders.user_id= users.id;`

    pool.query(query)
    .then((result) => {
        let successObject = {
            success: true,
            massage: "All orders",
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

const getUserProductOrders = (req, res) => {
    const userId = req.params.id;
    const values = [userId]
    const query = `SELECT * FROM product_orders INNER JOIN users ON product_orders.user_id= users.id WHERE user_id = $1;`

    pool.query(query, values)
    .then((result) => {
        let successObject = {
            success: true,
            massage: `All orders for ${result.rows[0].first_name}`,
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

const updateProductOrder = (req, res) => {
    const orderId = req.params.id;
    const {user_id, quantity, product_id} = req.body;

    const values = [orderId, user_id || null, quantity || null, product_id || null];
    const query = `UPDATE product_orders SET user_id = COALESCE($2, user_id), quantity = COALESCE($3, quantity), product_id = COALESCE($4, product_id) WHERE id = $1 RETURNING *;`

    pool.query(query, values)
    .then((result) => {
        let successObject = {
            success: true,
            massage: `order updated successfully`,
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

module.exports = { addProductOrder, deleteProductOrder, deleteAllUserProductOrders, getAllProductOrders, getUserProductOrders, updateProductOrder }