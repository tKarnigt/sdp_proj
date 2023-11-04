import express from 'express';
import * as userController from '../controllers/userController';
import {verifyJWT} from '../middleware/verifyJWT'

export const userRouter =  express.Router();

userRouter.get('/user/getUser', verifyJWT, userController.getUser);
userRouter.post('/user/editProfile', verifyJWT, userController.editUser)
userRouter.post('/user/resetPassword', verifyJWT, userController.resetPassword)
