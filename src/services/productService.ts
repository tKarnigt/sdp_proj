import { PrismaClient, PrismaPromise,User } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllProduct = async () => {
    try {
        const product = await prisma.productCatagory.findMany({
            include:{
                products:{
                    select:{
                        id: true,
                        name: true,
                        price: true,
                        detail:true,
                        image:{
                            select:{
                                image:true
                            }
                        },
                        productReview:{
                            select:{
                                user:true,
                                detail:true,
                                rating:true,
                                createdAt:true
                            }
                        },
                    },
                   
                }
            }
        })
        return product;
    } catch (error:any) {
        return error.message
    }
}

export const getProductCatagoryByType = async (_type: string) => {
    try {
        const product = await prisma.productCatagory.findFirst({
            where: {
                type: _type
            }
        })
        return product
    } catch (error:any) {
        return error.message
    }
}

export const createProductCatagory = async (_type:string) => {
    try {
        const productCatagory = await prisma.productCatagory.create({
            data: {
                type: _type,
            }
        })
        return productCatagory
    } catch (error:any) {
        return error.message        
    }
}


export const createProduct = async (_id:string, _name:string, _price:string, _detail:string,_pices:string, _image:any) => {

    try {
        const product = await prisma.product.create({
            include:{
                image:true
            },
            data: {
                productCatagoryId: _id, 
                name: _name,
                price: _price,
                detail: _detail,
                pices: _pices,
                image: {
                    create: _image
                }
            }
        })
        return product
    } catch (error:any) {
        throw(error)
    }
}


export const addProductReview = async (_user_id:string, _product_id:string, _detail:string, _rating:number) => {
    try {
        const review = await prisma.productReview.create({
            data:{
                userId: _user_id,
                productId: _product_id,
                detail: _detail,
                rating: _rating
            }
        })
        return review
    } catch (error) {
        throw error
    }
}