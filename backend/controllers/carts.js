const { pool } = require('../models/db');

// TODO: Create addToCart Function
const addToCart = (req,res) => {
    const user_id = req.token.user_id;
    const { product_id } = req.body;
    const data = [product_id, user_id]
    const query = `INSERT INTO shopping_carts (product_id, user_id) VALUES ($1,$2)`;

    pool.query(query,data)
    .then((result) => {
        console.log(result);
        res.status(201).json({
            succsess: true,
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



