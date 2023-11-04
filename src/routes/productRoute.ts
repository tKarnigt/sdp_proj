import express from 'express';
import * as productController from '../controllers/ProductController';
import upload from '../middleware/ImageConfig';
import { verifyJWT } from '../middleware/verifyJWT';

export const productRouter =  express.Router();

productRouter.get('/product', productController.getAllProduct)
productRouter.post('/product/addcatagory', productController.createProductCatagory)
productRouter.post('/product/addProduct',upload.array('file', 100),productController.createProduct)
productRouter.post('/product/addReview',verifyJWT,productController.addProductReview)