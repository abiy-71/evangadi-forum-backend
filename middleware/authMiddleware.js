const jwt = require('jsonwebtoken');

const authenticateUser = (req,res,next) => {
    const authHeader = req.headers.authorization;


    if(!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({
          error: "Unauthorized",
          message: "Authentication invalid",
        });
    }

    const token = authHeader.split(' ')[1];
    
    try {
         const {username,userid} = jwt.verify(token, process.env.JWT_SECRET);
         req.user = { username, userid };
         next();
    } catch (error) {
        return res.status(401).json({
          error: "Unauthorized",
          message: "Authentication invalid",
        });
    }
}

module.exports = authenticateUser;