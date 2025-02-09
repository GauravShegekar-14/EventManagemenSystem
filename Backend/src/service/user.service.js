import { userModel } from "../Model/user.Model.js";

export const createUser = async ({
    firstname,lastname,email, password
}) =>{
    if(!firstname || !email ||  !password){
        throw new Error('All fileds are required')
    }
    const user = userModel.create({
        fullname:{
            firstname, 
            lastname
        },
        email,
        password
    })

    return user;
}

