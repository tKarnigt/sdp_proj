import * as productService from '../services/productService';
import {Request, Response} from 'express';

export const getAllProduct = async (req: Request, res:Response) => {
    const product = await productService.getAllProduct();
    if(!product){
        return res.status(404).json({
            message: "Product Not Found"
        })
    }
    res.status(200).json({
        product
    })
}

export const createProductCatagory = async (req: Request, res: Response) => {
    const {type} = req.body
    if(!type){
        return res.status(401).json({
            message: "All input required"
        })
    }
    const product = await productService.getProductCatagoryByType(type);
    if(product){
        return res.status(401).json({
            message: "Already have product type"
        })
    }
    
    const newProduct = await productService.createProductCatagory(type)
    return res.status(200).json({
            message: "Add type succesful"
    })
}

export const createProduct = async (req:Request,res:Response) => {
    const {catagoryId, name, price, detail, pices} = req.body
    
    if(!(catagoryId && name && price && detail && req.files && pices)){
        return res.status(401).json({
            message: "All input required"
        })
    }

    //@ts-ignore
    const image = req.files?.map(item => {
        return {image: item.filename};
    })


    try {
        const product = await productService.createProduct(catagoryId, name, price, detail, pices,image)
        return res.status(200).json({
            message: "add product succesful",
            product: product
        })   
    } catch (error) {
        res.send('error !')
    }
}


export const addProductReview = async (req: Request, res: Response) =>{
    const {productId, detail, rating} = req.body;
    if(!(productId && detail && rating)){
        return res.status(401).json({
            message: "All input required"
        })
    }

    //@ts-ignore
    const review = await productService.addProductReview(req.payload.userId, productId,detail,rating)
    res.status(200).json({
        review    
    })
}


