const {pool} = require('../models/db')

const createNewProducts =(req , res)=>{
    const {title ,price,category ,items_left,image}= req.body
    const values = [title ,price,category ,items_left,image]
    const query = `INSERT INTO products(title ,price,category ,items_left,image) VALUES($1 ,$2, $3 ,$4 ,$5) RETURNING *`;

    pool.query(query , values)
    .then((result)=>{
    res.status(200).json({
        sucess : true,
        message: "Success Operation",
        result : result.rows
    })
    })
    .catch((err)=>{
        res.status(500).json({
            sucess : false,
            message: "Server Error",
            err : err
        })
    })
}

const getAllProducts = (req ,res)=>{
    const query =`select * from products  WHERE is_deleted=0`
    pool.query(query)
    .then((result)=>{
        res.status(200).json({
            sucess : true,
            message: "Success Operation",
            result : result.rows
        })
    })
    .catch((err)=>{
        res.status(500).json({
            sucess : false,
            message: "Server Error",
            err : err
        })
    })
}
module.exports={createNewProducts ,getAllProducts}