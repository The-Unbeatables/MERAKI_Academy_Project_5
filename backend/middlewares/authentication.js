const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const providedToken = req.headers.authorization.split(" ")[1];
  const secret = process.env.secret;
  jwt.verify(providedToken, secret, (err, res) => {
    if(err){
      res.status(400).json('forbidden')
    }
    else{
      req.token = res;
      next();
    }
  })
};

module.exports = authentication;