const jwt = require("jsonwebtoken");

const secret = 'test';

const auth = async (req, res, next) => {
  try {
    const token = req?.headers?.authorization ? req.headers.authorization.split(" ")[1] : null;
    const isCustomAuth = token?.length > 30;
    let decodedData;
    
    if (token && isCustomAuth) {      
      decodedData = jwt.verify(token, secret);
      req.userId = decodedData?.id;
    } 
    else {
      req.userId = token;
    }    

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = auth;