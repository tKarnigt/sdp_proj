import * as attractionService from '../services/attractionService';
import {Request, Response} from 'express';

export const getAllAttraction = async (req: Request, res:Response) => {
    const attraction = await attractionService.getAllAttraction();
    if(!attraction){
        return res.status(404).json({
            message: "Product Not Found"
        })
    }
    res.status(200).json(attraction)
}

export const createAttractionCatagory = async (req: Request, res: Response) => {
    const {type} = req.body
    if(!type){
        return res.status(401).json({
            message: "All input required"
        })
    }
    const attraction = await attractionService.getAttractionByType(type);
    if(attraction){
        return res.status(401).json({
            message: "Already have attraction type"
        })
    }
    
    const newAttraction = await attractionService.createAttractionCatagory(type)
    return res.status(200).json({
            message: "Add type succesful"
    })
}

export const getAttractionByType = async (req: Request, res:Response) => {
    const {type} = req.body
    if(!type){
        return res.status(401).json({
            message: "All input required"
        })
    }
    const attraction = await attractionService.getAttractionByType(type);
    res.status(200).json(attraction)
}

export const createAttraction = async (req:Request,res:Response) => {
    const {catagoryId, name, detail, address, location} = req.body
    
    if(!(catagoryId && name && detail && req.files && address && location)){
        return res.status(401).json({
            message: "All input required"
        })
    }

    //@ts-ignore
    const pictures = req.files?.map(item => {
        return {image: item.filename};
    })

    const jsonLocation = JSON.parse(location)
    try {
        const attraction = await attractionService.createAttraction(catagoryId, name, address,detail,jsonLocation,pictures)
        return res.status(200).json({
            message: "add product succesful",
            product: attraction
        })   
    } catch (error) {
        res.send(error)
    }
}


export const addAttractionReview = async (req: Request, res: Response) =>{
    const {attractionId, detail, rating} = req.body;
    if(!(attractionId && detail && rating)){
        return res.status(401).json({
            message: "All input required"
        })
    }
    
    //@ts-ignore
    const oldreview = await attractionService.getAttractionReviewById(req.payload.userId)
    if(oldreview){
        return res.status(401).json({
            message: "Already have Review"
        })
    }
    
    //@ts-ignore
    const review = await attractionService.addAttractionReview(req.payload.userId, attractionId,detail,rating)
    res.status(200).json(review)
}

export const addHotel = async(req: Request, res: Response) => {
    const {attractionId, name, price, rating, countReview, url} = req.body;
    if(!(attractionId && name && price && rating && countReview && url)){
        return res.status(401).json({
            message: "All input required"
        })
    }

    //@ts-ignore
    const hotel = await attractionService.addHotelByAttractionId(attractionId, name, Number(price),Number(rating),Number(countReview),req.file?.filename,url)
    res.status(200).json(hotel)
}