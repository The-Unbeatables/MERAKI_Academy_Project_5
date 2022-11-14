const {pool} =require('../models/db')

const updateWorkers =(req , res)=>{
    const {profession,YOE ,bio, image,user_id}=req.body
   
    const values=[profession || null, YOE || null, bio || null, image || null,user_id || null ]
    const query=`UPDATE workers
    SET
    profession=COALESCE($1 ,profession),
    YOE=COALESCE($2 ,YOE),
    bio=COALESCE($3 ,bio),
    image=COALESCE($4 ,image),
    user_id=COALESCE($5 ,user_id)
    WHERE id=${req.params.id}
    AND
    is_deleted = 0 
      RETURNING *;`
    pool.query(query,values)
    .then((result)=>{
            if (result.rows.length === 0) {
              res.status(404).json({
               success: false,
               massage: `The Workers:${req.params.id} is not Found`,
             });
           } else {
             res.status(200).json({
               success: true,
               massage: `Updated successfully`,
               result: result.rows,
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

const deleteWorkers=(req ,res)=>{
    const query=`UPDATE workers SET is_deleted=1 WHERE id=${req.params.id}`
    pool.query(query)
    .then((result)=>{
        if (result.rowCount === 0) {
            res.status(404).json({
              success: false,
              massage: `The worker  is not Found`,
            });
          } else {
            res.status(200).json({
              success: true,
              massage: `worker  Deleted successfully`,
            });
          }
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json({
            success: false,
            massage: `Server Error`,
            err: err,
          });
        });
    
}

const getWorkers=(req ,res)=>{
    const query=`SELECT * FROM workers WHERE is_deleted=0`
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

const getWorkersByProffesion = (req, res) => {
  const { profession } = req.body;
  const values = [profession]
  const query=`  SELECT workers.id, profession, bio, workers.image, user_id, yoe, first_name, last_name, email, gender FROM workers INNER JOIN users ON workers.user_id = users.id WHERE profession = $1 AND workers.is_deleted=0`
  pool.query(query, values)
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
          err : err.message
      })
  })
}

const getWorkerByUserId = (req , res) => {
  const userId = req.params.id
  const values = [userId ]
  const query = `SELECT * FROM workers WHERE user_id = $1`
  pool.query(query , values)
  .then((result)=>{
  res.status(200).json({
    result: result
  })
  })
  .catch((err)=>{
    res.status(500).json({
      err:err
    })
  })
  }
  

module.exports={updateWorkers ,deleteWorkers,getWorkers, getWorkersByProffesion,getWorkerByUserId}
