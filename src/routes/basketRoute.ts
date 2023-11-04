import express from 'express';
import * as basketConstroller from '../controllers/basketController';
import { verifyJWT } from '../middleware/verifyJWT';

export const basketRouter =  express.Router();

basketRouter.get('/basket', basketConstroller.getAllBasket)
basketRouter.post('/basket/addbasket', verifyJWT,basketConstroller.createBasket)
basketRouter.post('/basket/updatePayment', basketConstroller.updatePayment)