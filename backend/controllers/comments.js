const { pool } = require('../models/db');

// TODO: Create createNewComment Function
const createNewComment = (req,res) => {
    const product_id = req.params.id;
    const commenter_id = req.token.userId;
    const { comment } = req.body;
    const data = [comment,commenter_id,product_id]

    const query = `INSERT INTO product_comments (comment,commenter_id,product_id) VALUES ()`;

    pool.query(query,data)
    .then((result) => {
        res.status(201).json({
            success: true,
            message: 'Comment Created',
            result: result
        })
    })
    .catch((err) => {
        res.status(500).json({
            success: false,
            message: 'error',
            result: err.message
        })
    })
};

// TODO: Create getAllComments Function
const getAllComments = (req,res) => {
    const id = req.params.id;
    const data = [id]

    const query = `SELECT * FROM users INER JOIN product_comments ON product_comments.commenter_id = users.id WHERE product_id = $1 ORDER BY product_comments.id DESC`;

    pool.query(query,data)
    .then((result) => {
        res.status(201).json({
            success: true,
            message: 'Get All Comments',
            result: result
        })
    })
    .catch((err) => {
        res.status(500).json({
            success: false,
            message: 'error',
            result: err.message
        })
    })
};

// TODO: Create updateComment Function
const updateComment = (req,res) => {
    const { comment, commenter_id, product_id} = req.body;
    const id = req.params.id;
    const data = [comment || null, commenter_id || null, product_id || null]

    const query = `UPDATE product_comments SET comment = COALESCE($1 , comment), commenter_id = COALESCE($2 , commenter_id), product_id = COALESCE($2 , product_id) WHERE id = ${id}`;

    pool.query(query,data)
    .then((result) => {
        res.status(201).json({
            success: true,
            message: 'Update Comment',
            result: result
        })
    })
    .catch((err) => {
        res.status(500).json({
            success: false,
            message: 'error',
            result: err.message
        })
    })
};

// TODO: Create deleteComment Function
const deleteComment = (req,res) => {
    const id = req.params.id;
    const data = [id]

    const query = `UPDATE product_comments SET is_deleted = 1 WHERE id = $1`;

    pool.query(query,data)
    .then((result) => {
        res.status(201).json({
            success: true,
            message: 'Delete Comment',
            result: result
        })
    })
    .catch((err) => {
        res.status(500).json({
            success: false,
            message: 'error',
            result: err.message
        })
    })
};

module.exports = { createNewComment, getAllComments, updateComment, deleteComment }

