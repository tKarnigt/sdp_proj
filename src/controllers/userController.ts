import { User } from '@prisma/client';
import {Request, Response} from 'express';
import * as userService from '../services/userService';
import bcrypt from 'bcrypt';

export const getUser = async(req:Request, res: Response) => {
    //@ts-ignore
    const user:User = await userService.getUserById(req.payload.userId)
    if(!user){
        return res.status(404).json({
            message: "User Not Found"
        })
    }

    res.status(200).json({
        data: user
    })
}

export const editUser = async(req:Request, res: Response) => {
    const {firstname, lastname} = req.body;
    if(!(firstname && lastname)){
        return res.status(401).json({
            message: "All input required"
        })        
    }
    // @ts-ignore
    const user:User = await userService.getUserById(req.payload.userId);
    if(!user){
        return res.status(404).json({
            message: "User Not Found"
        })
    }   
    const updateUser = await userService.updateUser(user.id, firstname,lastname)
    return res.status(200).json({
        message: "Update profile succesful",
        data: updateUser
    })
}

export const resetPassword = async (req:Request, res:Response) =>{
    const {password, newPassword,confirmPassword} = req.body
    if(!(password && newPassword && confirmPassword)){
        return res.status(401).json({
            message: "All input required"
        })
    }

    if(newPassword !== confirmPassword){
        return res.status(401).json({
            message: "New Password not same"
        })
    }

    // @ts-ignore
    const user:User = await userService.getUserById(req.payload.userId)
    const isValidatePassword = await bcrypt.compare(password, user.hashPassword)
    if(!isValidatePassword){
        return res.status(403).json({
            message: "Password Invalid"
        })
    }
    const newHashPassword = await bcrypt.hash(newPassword, 10)
    await userService.resetPassword(user.id, newHashPassword)
    res.status(200).json({
        message: "Password Updated"
    })
}