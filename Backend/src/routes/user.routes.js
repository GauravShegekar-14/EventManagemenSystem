import express from "express";
import { body } from "express-validator";
import { registerUser,loginUser,getUserProfile,logoutUser } from "../controllers/user.controller.js";
import {authUser} from "../Middleware/auth.middleware.js"
const userRouter = express.Router();

userRouter.post(
  '/register',
  [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname')
      .isLength({ min: 3 })
      .withMessage('First name must be at least 3 characters long'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long')
  ],
  registerUser
);


userRouter.post('/login',[
  body('email').isEmail().withMessage('invalid Email'),
  body('password').isLength({min:6}).withMessage('Invalid Passowrd')
],
loginUser
)

userRouter.get('/profile',authUser,getUserProfile)
userRouter.get('/logout',authUser,logoutUser)

export { userRouter };
