import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
   try {
    const token=req.cookies.token;
    console.log("token from cookie ::: ", token)
    
    if(!token){
        return res.status(400).json({message:"Unauthorized"})
    }
    const verifyToken= jwt.verify(token,process.env.JWT_SECRET)
    console.log("verify token ::: ", verifyToken)
    if(!verifyToken){
        return res.status(400).json({message:"Unauthorized"})
    }
    console.log("verify token ::: ", verifyToken)
    req.userId=verifyToken.id
    next()
   } catch (error) {
    return res.status(500).json({message:`isAuth middleware error: ${error.message}`})
   }
};