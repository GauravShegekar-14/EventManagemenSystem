import { userModel } from "../Model/user.Model.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { BlacklistToken } from "../Model/blacklistToken.model.js";


const authUser = async (req,res,next)=>{
   const token = req.cookies.token || req.headers.authorization?.split(' ')[[1]];

   const isBlacklisted = await BlacklistToken.findOne({token:token});

   if(isBlacklisted){
    return res.status(401).json({message:'Unauthorized'})
   }

   try {
     const decoded = jwt.verify(token,process.env.JWT_SECRET);
    //  console.log('Decoded token:', decoded);
     const user = await userModel.findById(decoded._id);
    //  if (!user) {
    //   console.log('User not found with ID:', decoded._id); // Log the user ID
    // }
     req.user = user;
    //  console.log('User:', user); // Add this line

     return next();

   } catch (err) {
    return res.status(401).json({message:'Unauthorized'})
   }
}



export {authUser}