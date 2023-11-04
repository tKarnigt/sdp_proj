import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const getAllBasket = async () => {
    try {
        const basket = await prisma.basket.findMany({
            include:{
                payment:true,
                products:true
            }
        })
        return basket;
        
    } catch (error) {
        throw error
    }
}

export const createBasket = async (_user_id:string, _address:string,_totalPrice:number, _payment_method:string,_product:any,) => {
    try {
        const basket = await prisma.basket.create({
            include: {
                products:true,
                payment:true,
            },
            data:{
                userId: _user_id,
                address: _address,
                totalPrice: _totalPrice,
                products: {
                    create: _product
                },
                payment:{
                    create:{
                        method: _payment_method,
                        isSuccessd:false
                    }
                }
            }
        })
        return basket
    } catch (error) {
        throw error
    }
}

export const updatePayment = async (_basket_id:string, _isSuccess:boolean) => {
    try {
        const payment = await prisma.payment.update({
            where:{
                basketId: _basket_id
            },
            data:{
                isSuccessd: _isSuccess
            }
        })
        return payment
    } catch (error) {
        
    }
} 