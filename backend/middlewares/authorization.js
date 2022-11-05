const { pool } = require("../models/db");

const authorization = (string) => {
  return function (req, res, next) {

    const roleId = req.token.role;
    const values = [roleId]
    const query = `SELECT * FROM role_permission INNER JOIN permissions ON role_permission.permission_id = permissions.id WHERE role_id = $1;`
    pool.query(query,values)
    .then((result) => {
      let testVar = false;
      console.log(result.rows);
      for(let i=0; i<(result.rows).length; i++){
        if((result.rows)[i].permission === string){
          testVar = true;
        }
      }
      if(!testVar){
        return res.status(403).json({
          success: false,
          message: `Unauthorized`,
        });
      }else{
        next()
      }
    })
    .catch((err) => {
      let failObject = {
        success: false,
        massage: "Server error"
      }
  
      res.status(409).json(failObject)
    })

  };
};

module.exports = authorization;