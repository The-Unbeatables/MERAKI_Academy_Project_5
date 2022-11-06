const { pool } = require('../models/db');

// TODO: Create addToCart Function
const addToCart = (req,res) => {
    const user_id = req.token.userId;
    const { product_id } = req.body;
    const data = [product_id, user_id]
    const query = `INSERT INTO shopping_carts (product_id, user_id) VALUES ($1,$2)`;

    pool.query(query,data)
    .then((result) => {
        console.log(result);
        res.status(201).json({
            succsess: true,
            message: `Add To Cart`,
            result: result.rows
        })
    })
    .catch((err) => {
        res.status(500).json({
            succsess: false,
            message: `Failed Add To Cart`,
            error: message.err
        })
    })
};

// TODO: Create showCart Function
const showCart = (req,res) => {
    const user_id = req.token.userId
    const data = [user_id]

    const query = `SELECT * FROM products INER JOIN shopping_carts ON products.id = shopping_carts.product_id WHERE shopping_carts.is_deleted = 0 AND user_id = $1`;

    pool.query(query,data)
    .then((result) => {
        res.status(201).json({
            succsess: true,
            message: `Show The Cart`,
            result: result.rows
        })
    })
    .catch((err) => {
        res.status(500).json({
            succsess: false,
            message: `Failed Show The Cart`,
            error: message.err
        })
    })
};

// TODO: Crate deleteCart Function
const deleteCart = (req,res) => {
    const cartId = req.params.id;
    const data = [cartId]
    const query = `UPDATE shopping_carts SET is_deleted=1 WHERE id = $1`;

    pool.query(query,data)
    .then((result) => {
        res.status(201).json({
            succsess: true,
            message: `Delete From The Cart`,
            result: result.rows
        })
    })
    .catch((err) => {
        res.status(500).json({
            succsess: false,
            error: message.err
        })
    })
};

// TODO: Create showCartById Function
const showCartById = (req,res) => {
    const cartId = req.params.id;
    const data = [cartId]
    
    const query = `SELECT * FROM products INER JOIN shopping_carts ON products.id = shopping_carts.product_id WHERE id = $1`;

    pool.query(query,data)
    .then((result) => {
        res.status(201).json({
            succsess: true,
            message: `Show The Cart BY Id Done`,
            result: result.rows
        })
    })
    .catch((err) => {
        res.status(500).json({
            succsess: false,
            error: message.err
        })
    })
};

// TODO: Create deleteCartByUserId Function
const deleteCartByUserId = (req,res) => {
    const userId = req.params.id;
    const data = [userId]

    const query = `UPDATE shopping_carts SET is_deleted = 1 WHERE user_id = $1`;

    pool.query(query,data)
    .then((result) => {
        res.status(201).json({
            succsess: true,
            message: `Delete The Cart By Id Done`,
            result: result.rows
        })
    })
    .catch((err) => {
        res.status(500).json({
            succsess: false,
            error: message.err
        })
    })
};

module.exports = { addToCart, showCart, deleteCart, showCartById, deleteCartByUserId }

