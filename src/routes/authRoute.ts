import express from 'express';
import * as authController from '../controllers/authController';
import {verifyJWT} from '../middleware/verifyJWT'

export const authRouter =  express.Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.get('/logout',verifyJWT,authController.logout);
