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

const updateProductsById=(req ,res)=>{
    const {title ,price,category ,items_left,image}=req.body
    const values = [title || null , price || null ,category || null ,items_left || null ,image || null]
    const query = `UPDATE products
     SET 
     title= COALESCE($1 , title),
     price= COALESCE($2 , price),
     category= COALESCE($3 , category),
     items_left= COALESCE($4 ,items_left),
     image= COALESCE($5 , image)
     WHERE id =${req.params.id} 
     AND
     is_deleted = 0  RETURNING *;
     `
     pool.query(query , values)
     .then((result)=>{
        if (result.rows.length === 0) {
             res.status(404).json({
              success: false,
              massage: `The Products:${req.params.id} is not Found`,
            });
          } else {
            res.status(200).json({
              success: true,
              massage: `Updated successfully`,
              result: result.rows[0],
            });
          }
     })
     .catch((err)=>{
        res.status(500).json({
            success: false,
            massage: `Server Error`,
            err : err,
     })
    })
}

const deleteProductsById = (req , res)=>{
    const query=`UPDATE products SET is_deleted=1 WHERE id=${req.params.id} ;`
    pool.query(query)
    .then((result)=>{
        console.log(result);
        if (result.rowCount === 0) {
            res.status(404).json({
              success: false,
              massage: `The Products is not Found`,
            });
          } else {
            res.status(200).json({
              success: true,
              massage: `Product Deleted successfully`,
            });
          }
    })
    .catch((err)=>{
        res.status(500).json({
            success: false,
            massage: `Server Error`,
            err : err,
     })
    })
}

module.exports={createNewProducts ,getAllProducts,updateProductsById,deleteProductsById}