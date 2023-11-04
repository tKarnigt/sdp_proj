import express from 'express';
import * as attractionController from '../controllers/attractionController';
import upload from '../middleware/ImageConfig';
import { verifyJWT } from '../middleware/verifyJWT';

export const attractionRouter =  express.Router();

attractionRouter.get('/attraction', attractionController.getAllAttraction)
attractionRouter.post('/attraction/addcatagory', attractionController.createAttractionCatagory)
attractionRouter.post('/attraction/catagory', attractionController.getAttractionByType)
attractionRouter.post('/attraction/addAttraction',upload.array('file', 100),attractionController.createAttraction)
attractionRouter.post('/attraction/addReview',verifyJWT,attractionController.addAttractionReview)
attractionRouter.post('/attraction/addHotel', upload.single('file'), attractionController.addHotel)