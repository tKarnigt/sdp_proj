import * as basketService from '../services/basketService';
import { Request, Response } from "express"


export const getAllBasket = async (req: Request, res:Response) => {
   const basket = await basketService.getAllBasket()
   res.status(200).json(basket)
}

export const createBasket = async(req: Request, res: Response) => {
    const {address, totalPrice, paymentMethod,product} = req.body

    if(!(address && totalPrice && product)){
        return res.status(401).json({
            message: "All input required"
        })
    }
    //@ts-ignore
    const basket = await basketService.createBasket(req.payload.userId, address, totalPrice, paymentMethod,product)
    return res.status(200).json(basket)
}

export const updatePayment = async (req: Request, res: Response) => {
    const {basketId, isSuccessd} = req.body;

    if(!(basketId && isSuccessd)){
        return res.status(401).json({
            message: "All input required"
        })
    }

    const payment = await basketService.updatePayment(basketId, isSuccessd)
    return res.status(200).json(payment)
}