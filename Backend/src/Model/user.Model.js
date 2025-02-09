import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
const userSchema = new mongoose.Schema({
    fullname:{
       firstname:{
        type:String,
        required:true,
        minlength:[3,'first name must be at least 3 characters long'] 
       },
        lastname:{
            type:String,
            minlength:[3,'last name must be at least 3 characters long']  
        }
    },
   
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[5,'last name must be at least 3 characters long']  
    },
    password:{
        type:String,  
        select:false,
        required:true
    },
    socketId:{
        type:String
    }
})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'});
    return token;
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password,this.password);
}

userSchema.statics.hashpassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

export const userModel = mongoose.model("User", userSchema);

