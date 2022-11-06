const { Pool } = require('pg')
const {pool} = require('../models/db')

const addServiceOrder=(req , res)=>{
 const {status , service_title,service_description,user_id,worker_id}=req.body
 const values = [status , service_title,service_description,user_id,worker_id]
 const query=`INSERT INTO service_orders (status , service_title,service_description,user_id,worker_id) VALUES($1,$2,$3,$4,$5)`
 pool.query(query,values)
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

const updateServiceOrder=(req , res)=>{
    const {status , service_title,service_description,user_id,worker_id}=req.body
    const values = [status , service_title,service_description,user_id,worker_id]
    const query=`UPDATE service_orders SET
    status=COALESCE($1 ,status),
    service_title=COALESCE($2 ,service_title),
    service_description=COALESCE($3 ,service_description),
    user_id=COALESCE($4 ,user_id),
    worker_id=COALESCE($5 ,worker_id)
    WHERE id =${req.params.id} 
    AND
    is_deleted = 0  RETURNING *;
    `
    pool.query(query , values)
    .then((result)=>{
        if (result.rows.length === 0) {
            res.status(404).json({
             success: false,
             massage: `The Service Orders:${req.params.id} is not Found`,
           });
         } else {
           res.status(200).json({
             success: true,
             massage:`Updated successfully`,
             result: result.rows[0],
           });
         }
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json({
            success: false,
            massage: `Server Error`,
            err : err,
     })
    })
}

const deleteServiceOrder=(req , res)=>{
    const query=`UPDATE service_orders SET is_deleted = 1 WHERE id=${req.params.id}`
    pool.query(query)
    .then((result)=>{
        if (result.rowCount === 0) {
            res.status(404).json({
              success: false,
              massage: `The Service Orders is not Found`,
            });
          } else {
            res.status(200).json({
              success: true,
              massage: `Service Orders Deleted successfully`,
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

const getAllServiceOrders=(req ,res)=>{
    const query=`SELECT * FROM service_orders WHERE  is_deleted = 0 `
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




module.exports={addServiceOrder,updateServiceOrder,deleteServiceOrder,getAllServiceOrders}

/*CREATE TABLE service_orders(
  id SERIAL NOT NULL,
  status VARCHAR(255),
  service_title VARCHAR(255),
  service_description VARCHAR(255),
  is_deleted SMALLINT DEFAULT 0,
  user_id INT,
  worker_id INT,
  FOREIGN KEY (user_id ) REFERENCES users (id),
  FOREIGN KEY (worker_id ) REFERENCES workers(id),
  PRIMARY KEY (id) 
); */