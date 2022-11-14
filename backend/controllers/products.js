const {pool} = require('../models/db')

const createNewProducts =(req , res)=>{
    const {title,description ,price,category ,items_left,image}= req.body
    const values = [title, description ,price,category ,items_left,image]
    const query = `INSERT INTO products(title, description ,price,category ,items_left,image) VALUES($1 ,$2, $3 ,$4 ,$5, $6) RETURNING *`;

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
    const query =`select * from products   is_deleted=0`
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
    const {title,description ,price,category ,items_left,image}=req.body
    const values = [title || null, description || null , price || null ,category || null ,items_left || null ,image || null]
    const query = `UPDATE products
     SET 
     title= COALESCE($1 , title),
     description = COALESCE($2 , description),
     price= COALESCE($3 , price),
     category= COALESCE($4 , category),
     items_left= COALESCE($5 ,items_left),
     image= COALESCE($6 , image)
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
            err : err.message,
     })
    })
}

const deleteProductsById = (req , res)=>{
  const id = req.params.id;
  const data = [id]
    const query=`UPDATE products SET is_deleted=1 WHERE id=$1`
    pool.query(query,data)
    .then((result)=>{
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

const searchProductsByTitle = (req , res)=>{
     //REGEXP
    
    
   const query=`SELECT * FROM products WHERE title LIKE '%${req.query.title}%' AND is_deleted=0`
   
   pool.query(query)
   .then((result)=>{
     if (result.rowCount === 0) {
        res.status(404).json({
          success: false,
          massage: `The Products is not Found`,
        });
      } else {
        res.status(200).json({
          success: true,
          massage: `Product find successfully`,
          result: result.rows
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

const getAllProductsbyCategory= (req , res)=>{
  const category=req.params.category;
  values=[category]
  const query = `SELECT * FROM products WHERE category=$1 AND is_deleted=0;`
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

const filterProduct=(req , res)=>{
 const{ max}= req.body
 const values=[max]
 const query = `SELECT * FROM products WHERE price>0 AND price<$1;`
 pool.query(query , values)
 .then((result)=>{
  res.status(200).json({
    result : result
  })
 })
 .catch((err)=>{
  res.status(500).json({
    err:err
  })
 })
};

const paginationProduct = (req,res) => {
  const id = req.params.id;
  const data = [id * 10]
  const query = `SELECT * FROM products WHERE is_deleted=0  LIMIT 10  OFFSET $1 ` // offset
  pool.query(query,data)
  .then((result) => {
    if (result.rows.length == 0) {
      res.status(500).json({
        success: false,
        message: 'No Products'
      })
    } else {
      res.status(201).json({
        success: true,
        result: result.rows
      })
    }
  })
  .catch((err) => {
    res.status(500).json({
      success: false,
      message: err.message
    })
  })
}

module.exports={createNewProducts ,getAllProducts,updateProductsById,deleteProductsById,searchProductsByTitle,getAllProductsbyCategory,filterProduct,paginationProduct}