const { Pool } = require('pg')
const {pool} = require('../models/db')

const addServiceOrder=(req , res)=>{
 const {service_title,service_description,user_id,worker_id}=req.body
 const values = [service_title,service_description,user_id,worker_id]
 const query=`INSERT INTO service_orders (service_title,service_description,user_id,worker_id) VALUES($1,$2,$3,$4) RETURNING *`
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
    const values = [status || null, service_title || null ,service_description || null,user_id || null,worker_id || null]
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
            err : err.message,
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
            err : err.message,
     })
    })
}

const getAllServiceOrders=(req ,res)=>{
    const query=`SELECT * FROM service_orders
    INNER JOIN users on service_orders.user_id = users.id
    INNER JOIN workers on service_orders.worker_id = workers.id 
   where service_orders.is_deleted =0;
   SELECT * FROM workers INNER JOIN users ON workers.user_id = users.id `
    pool.query(query)
    .then((result)=>{
        res.status(200).json({
            sucess : true,
            message: "Success Operation",
            result : result
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

const getWorkerServiceOrders=(req , res)=>{

 const workerId = req.params.id
 console.log(workerId);
 const values=[workerId]
  const query=`select service_orders.id,status,service_title,service_description,first_name,last_name,email from service_orders 
  inner join workers on service_orders.worker_id=workers.id 
  inner join users on service_orders.user_id=users.id 
  where service_orders.worker_id=$1 and service_orders.is_deleted=0;
  `
  pool.query(query , values)
  .then((result)=>{
    res.status(200).json({
        sucess : true,
        message: "Success Operation",
        result : result.rows
    })
})
.catch((err)=>{
    console.log(err);
    res.status(500).json({
        sucess : false,
        message: "Server Error",
        err : err
    })
})
}
const getUserServiceOrders=(req , res)=>{
    
    const userId = req.params.id
    const values=[userId]
     const query=`SELECT service_orders.created_at, service_orders.id, service_title, service_description, first_name, last_name, status FROM workers INNER JOIN service_orders ON workers.id = service_orders.worker_id INNER JOIN users ON workers.user_id = users.id WHERE service_orders.user_id = $1 AND service_orders.is_deleted = 0 `
     pool.query(query , values)
     .then((result)=>{
       res.status(200).json({
           sucess : true,
           message: "Success Operation",
           result : result.rows
       })
   })
   .catch((err)=>{
       console.log(err);
       res.status(500).json({
           sucess : false,
           message: "Server Error",
           err : err.message
       })
   })
   }


module.exports={addServiceOrder,updateServiceOrder,deleteServiceOrder,
    getAllServiceOrders,getWorkerServiceOrders, getUserServiceOrders}