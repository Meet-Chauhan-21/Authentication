const jwt = require("jsonwebtoken")

const validateToken = (req,res,next)=>{
    const auth = req.headers["authorization"];
    if(!auth){
        return res.status(403)
            .json({
                message: "Unauthorized, JWT token is required.!!",
                success: false
            })
    }
    try{
        const decode = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error){
        return res.status(403)
            .json({
                message: "Unauthorized, JWT token is expired or wronge.!!",
                success: false
            })
    }
}

module.exports = validateToken;