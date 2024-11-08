const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = async(req, res, next) =>{
    try{
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        // const {token} = req.body;
        console.log(token);

    if(!token){
        return res.status(401).json(
            {
                success:false,
                message: "Access denied"
            }
        )
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = decoded;
    next();
    }catch(err){
        console.error(err);
        res.status(401).json(
            {
                success:false,
                message: "Unauthroized Token"
            }
        )
    }
}